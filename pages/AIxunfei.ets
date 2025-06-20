import { http } from '@kit.NetworkKit';
import util from '@ohos.util';

// base64Encode 函数必须放在 import 之后
function base64Encode(str: string): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let encoded = '';
  let c1: number, c2: number, c3: number;
  let i = 0;
  while (i < str.length) {
    c1 = str.charCodeAt(i++) & 0xff;
    if (i == str.length) {
      encoded += chars.charAt(c1 >> 2);
      encoded += chars.charAt((c1 & 0x3) << 4);
      encoded += '==';
      break;
    }
    c2 = str.charCodeAt(i++);
    if (i == str.length) {
      encoded += chars.charAt(c1 >> 2);
      encoded += chars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
      encoded += chars.charAt((c2 & 0xF) << 2);
      encoded += '=';
      break;
    }
    c3 = str.charCodeAt(i++);
    encoded += chars.charAt(c1 >> 2);
    encoded += chars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
    encoded += chars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
    encoded += chars.charAt(c3 & 0x3F);
  }
  return encoded;
}


// 聊天消息类型
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// 讯飞星火API响应类型
interface XunfeiMessage {
  role: string;
  content: string;
}
interface XunfeiChoice {
  message: XunfeiMessage;
}
interface XunfeiResponse {
  choices: XunfeiChoice[];
}

// 请求头类型
interface HttpHeaders {
  'Content-Type': string;
  'Authorization': string;
}

// http请求参数类型
interface HttpRequestOptions {
  method: http.RequestMethod;
  header: HttpHeaders;
  extraData: string;
}

// 讯飞星火API请求体类型
interface XunfeiRequestBody {
  model: string;
  messages: XunfeiMessage[];
  temperature: number;
  max_tokens: number;
}

interface ErrorWithMessage {
  message?: string;
}

@Entry
@Component
struct ChatWindow {
  @State userInput: string = '';
  @State chatHistory: ChatMessage[] = [];
  @State isLoading: boolean = false;
  @State errorMessage: string = '';

  // 讯飞星火API配置
  private readonly API_PASSWORD: string = 'WQqZwuZLPmEVrnWSDRLt:oOWpKcByfsLFRhNODaHi';
  private readonly API_URL: string = 'https://spark-api-open.xf-yun.com/v2/chat/completions';

  // 生成Basic Auth
  private getBasicAuth(): string {
    const base64: string = base64Encode(this.API_PASSWORD);
    return `Basic ${base64}`;
  }

  // 发送消息到讯飞星火
  private async sendToXunfei() {
    if (!this.userInput.trim() || this.isLoading) return;
    this.errorMessage = '';

    try {
      this.isLoading = true;
      const userMessage: ChatMessage = {
        role: 'user',
        content: this.userInput
      };

      // 添加用户消息到历史记录
      this.chatHistory = [...this.chatHistory, userMessage];
      this.userInput = '';

      // 构造请求体
      const messages: XunfeiMessage[] = this.chatHistory.map((msg: ChatMessage): XunfeiMessage => {
        return {
          role: msg.role,
          content: msg.content
        };
      });

      const requestData: XunfeiRequestBody = {
        model: "spark-x1",
        messages: messages,
        temperature: 0.7,
        max_tokens: 2048
      };

      const headers: HttpHeaders = {
        'Content-Type': 'application/json',
        'Authorization': this.getBasicAuth()
      };

      const options: HttpRequestOptions = {
        method: http.RequestMethod.POST,
        header: headers,
        extraData: JSON.stringify(requestData)
      };

      const httpRequest = http.createHttp();
      const response = await httpRequest.request(this.API_URL, options);

      if (response.responseCode === 200) {
        const result: XunfeiResponse = JSON.parse(response.result.toString());
        if (result.choices && result.choices.length > 0) {
          const aiMessage: ChatMessage = {
            role: 'assistant',
            content: result.choices[0].message.content
          };
          this.chatHistory = [...this.chatHistory, aiMessage];
        } else {
          this.errorMessage = `讯飞星火API响应异常`;
        }
      } else {
        this.errorMessage = `请求失败: ${response.responseCode}`;
      }
    } catch (error) {
      let msg = '';
      if (typeof error === 'object' && error !== null) {
        msg = (error as ErrorWithMessage).message ?? String(error);
      } else {
        msg = String(error);
      }
      this.errorMessage = `发生错误: ${msg}`;
    } finally {
      this.isLoading = false;
    }
  }

  build() {
    Column() {
      // 顶部标题栏
      Text('种植知识AI智能问答')
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 16, bottom: 12 })
        .width('100%')
        .textAlign(TextAlign.Center)

      // 聊天历史显示区域
      List() {
        ForEach(this.chatHistory, (message: ChatMessage) => {
          ListItem() {
            Row() {
              Column() {
                Text(message.role === 'user' ? '用户' : '科大讯飞AI')
                  .fontSize(14)
                  .fontColor('#666')
                  .margin({ bottom: 4 })
                Text(message.content)
                  .fontSize(16)
              }
              .padding(12)
              .borderRadius(12)
              .backgroundColor(message.role === 'user' ? '#dcfce7' : '#f0fdf4')
              .overlay(() => {
                if (message.role === 'user') {
                  return Triangle()
                    .width(10)
                    .height(10)
                    .backgroundColor('#e6f7ff')
                    .position({ x: '100%', y: '50%' })
                    .margin({ right: -5 })
                    .rotate({ angle: 45 })
                } else {
                  return Triangle()
                    .width(10)
                    .height(10)
                    .backgroundColor('#f5f5f5')
                    .position({ x: -5, y: '50%' })
                    .margin({ left: -5 })
                    .rotate({ angle: 45 })
                }
              })

              if (message.role === 'user') {
                // 请确保 resources/base/media 目录下有 avatar_default.png
                Image($r('app.media.avatar_default'))
                  .width(40)
                  .height(40)
                  .margin({ left: 10 })
                  .borderRadius(20)
              }
            }
            .width('100%')
            .justifyContent(message.role === 'user' ? FlexAlign.End : FlexAlign.Start)
          }
          .width('100%')
          .margin({ top: 8, bottom: 8 })
        })
      }
      .width('100%')
      .height('85%')
      .margin({ top: 10, bottom: 10 })

      // 错误消息显示
      if (this.errorMessage) {
        Text(this.errorMessage)
          .fontSize(14)
          .fontColor('#f5222d')
          .width('100%')
          .textAlign(TextAlign.Center)
          .margin({ bottom: 10 })
      }

      // 加载指示器
      if (this.isLoading) {
        LoadingProgress()
          .color('#1890ff')
          .width(30)
          .height(30)
          .margin({ bottom: 10 })
      }

      // 输入区域
      Row() {
        TextInput()
          .type(InputType.Normal)
          .width('80%')
          .height(40)
          .margin({ right: 10 })
          .borderRadius(20)
          .backgroundColor('#f5f5f5')
          .padding({ left: 15 })
          .onChange((value: string) => {
            this.userInput = value;
          })

        Button('发送')
          .width('20%')
          .height(40)
          .onClick((): Promise<void> => this.sendToXunfei())
          .backgroundColor('#16a34a')
          .fontColor('#ffffff')
          .borderRadius(20)
      }
      .width('90%')
      .margin({ bottom: 10 })
    }
    .width('100%')
    .height('100%')
    .padding(15)
  }
}

// 三角形组件
@Component
struct Triangle {
  build() {
    Polygon()
      .width(10)
      .height(10)
      .points([[0, 0], [10, 0], [0, 10]])
  }
}