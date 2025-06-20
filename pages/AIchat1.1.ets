import { http } from '@kit.NetworkKit';
import router from '@ohos.router';

// 1. 首先明确定义所有类型
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface MessageContent {
  content: string;
}

interface Choice {
  message: MessageContent;
}

interface DeepSeekResponse {
  choices: Choice[];
}

interface RequestBody {
  model: string;
  messages: ChatMessage[];
  temperature: number;
}

interface HttpHeaders {
  'Content-Type': string;
  'Authorization': string;
}

interface HttpRequestOptions {
  method: http.RequestMethod;
  header: HttpHeaders;
  extraData: string;
}

@Entry
@Component
struct ChatWindow {
  @State userInput: string = '';
  @State chatHistory: ChatMessage[] = [];
  @State isLoading: boolean = false;
  @State errorMessage: string = '';
  private readonly API_KEY: string = 'sk-9d923239595c4fb7976e2f21b9643235';
  private readonly API_URL: string = 'https://api.deepseek.com/v1/chat/completions';

  private async sendToDeepSeek() {
    if (!this.userInput.trim() || this.isLoading) return;
    this.errorMessage = '';

    try {
      this.isLoading = true;
      const userMessage: ChatMessage = {
        role: 'user',
        content: this.userInput
      };

      this.chatHistory = [...this.chatHistory, userMessage];
      this.userInput = '';

      // 2. 使用预定义的类型
      const requestData: RequestBody = {
        model: "deepseek-chat",
        messages: this.chatHistory,
        temperature: 0.7
      };

      const headers: HttpHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.API_KEY}`
      };

      const options: HttpRequestOptions = {
        method: http.RequestMethod.POST,
        header: headers,
        extraData: JSON.stringify(requestData)
      };

      const httpRequest = http.createHttp();
      const response = await httpRequest.request(this.API_URL, options);

      if (response.responseCode === 200) {
        const result: DeepSeekResponse = JSON.parse(response.result.toString());
        const aiMessage: ChatMessage = {
          role: 'assistant',
          content: result.choices[0].message.content
        };
        this.chatHistory = [...this.chatHistory, aiMessage];
      } else {
        this.errorMessage = `API请求失败: ${response.responseCode}`;
      }
    } catch (error) {
      console.error('发生错误:', error);
      this.errorMessage = `发生错误: ${error.message}`;
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
            // 根据角色选择布局方向
            Row() {
              // AI头像在左，用户头像在右
              if (message.role === 'assistant') {
                Image($r('app.media.avatar')) // 请准备AI头像图片
                  .width(40)
                  .height(40)
                  .margin({ right: 10 })
                  .borderRadius(20)
              }

              // 消息内容部分
              Column() {
                Text(message.role === 'user' ? '用户' : 'AI')
                  .fontSize(14)
                  .fontColor('#666')
                  .margin({ bottom: 4 })
                Text(message.content)
                  .fontSize(16)
              }
              .padding(12)
              .borderRadius(12)
              .backgroundColor(message.role === 'user' ? '#dcfce7' : '#f0fdf4')
              .overlay(() => { // 使用箭头函数包裹三角形组件
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
                Image($r('app.media.avatar_default')) // 请准备用户头像图片
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
          .type(InputType.Normal) // 关键：默认支持中文输入，自动唤起键盘
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
          .onClick((): Promise<void> => this.sendToDeepSeek())
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

// 添加三角形组件（在结构体外部）
@Component
struct Triangle {
  build() {
    Polygon()
      .width(10)
      .height(10)
      .points([[0, 0], [10, 0], [0, 10]])
  }
}