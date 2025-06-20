import router from '@ohos.router'

interface ChatMessage {
  content: string
  isUser: boolean
  timestamp: string
}

interface AIResponse {
  key: string
  response: string
  relatedQuestions?: string[]
}

@Entry
@Component
struct KeFuPage {
  @State inputMessage: string = ''
  @State chatMessages: ChatMessage[] = []
  scroller: Scroller = new Scroller()

  // AI回复内容库
  readonly responses: AIResponse[] = [
    {
      key: '浇水',
      response: '以下是植物浇水的关键建议：\n\n1. 根据植物种类调整浇水量\n- 多肉植物：干透再浇\n- 观叶植物：保持土壤微湿\n- 兰花类：见干见湿\n\n2. 浇水时间选择\n- 建议在早晨或傍晚\n- 避免正午强光下浇水\n\n3. 注意事项\n- 使用常温水\n- 水量要适中\n- 避免积水',
      relatedQuestions: ['如何判断是否需要浇水？', '浇水时应该注意什么？', '不同季节浇水有什么区别？']
    },
    {
      key: '修剪',
      response: '专业的修剪技巧指南：\n\n1. 修剪工具准备\n- 消毒剪刀\n- 干净手套\n- 酒精棉片\n\n2. 修剪要点\n- 斜切45度角\n- 从节点处下刀\n- 保持工具清洁\n\n3. 修剪时机\n- 春季是最佳时期\n- 避免正午修剪\n- 雨天不宜修剪',
      relatedQuestions: ['修剪的最佳时间是什么时候？', '如何给观叶植物修剪？', '修剪后的护理方法？']
    },
    {
      key: '施肥',
      response: '科学施肥指导：\n\n1. 基础肥料选择\n- 氮肥：促进生长\n- 磷肥：利于开花\n- 钾肥：增强抗性\n\n2. 施肥原则\n- 薄肥多次\n- 避免烧根\n- 定期更换\n\n3. 施肥时间\n- 生长期施肥\n- 休眠期少肥\n- 早晚施肥',
      relatedQuestions: ['什么时候需要施肥？', '如何选择合适的肥料？', '施肥后要注意什么？']
    },
    {
      key: '病虫害',
      response: '常见病虫害防治方案：\n\n1. 预防措施\n- 定期检查叶片\n- 保持通风干燥\n- 适时消毒\n\n2. 常见问题处理\n- 叶斑病：减少浇水\n- 蚜虫：喷洒皂液\n- 白粉病：增加通风\n\n3. 隔离防护\n- 及时隔离病株\n- 更换土壤\n- 消毒工具',
      relatedQuestions: ['如何预防病虫害？', '发现病虫害后如何处理？', '需要使用农药吗？']
    }
  ]

  aboutToAppear() {
    // 添加欢迎消息
    this.chatMessages.push({
      content: '您好！我是 Botaniverse 的智能助手，很高兴为您服务。\n\n我可以回答以下问题：\n- 植物浇水\n- 修剪技巧\n- 施肥方法\n- 病虫害防治\n\n请问有什么可以帮您？',
      isUser: false,
      timestamp: new Date().toLocaleTimeString()
    })
  }

  // 获取AI回复
  getAIResponse(userInput: string): string {
    // 将用户输入转换为小写，去除空格
    const normalizedInput = userInput.toLowerCase().trim()

    // 查找匹配的回复
    const matchedResponse = this.responses.find(item =>
    normalizedInput.includes(item.key.toLowerCase()) ||
    item.key.toLowerCase().includes(normalizedInput)
    )

    if (matchedResponse) {
      return matchedResponse.response + '\n\n您可能还想了解：\n' +
      matchedResponse.relatedQuestions?.join('\n')
    }

    // 默认回复
    return '抱歉，我理解的不够清楚。您可以问问这些问题：\n\n- 植物浇水注意事项\n- 修剪技巧有哪些\n- 如何正确施肥\n- 病虫害防治方法'
  }

  sendMessage() {
    if (this.inputMessage.trim() === '') return

    // 添加用户消息
    this.chatMessages.push({
      content: this.inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    })

    // 获取并添加AI回复
    setTimeout(() => {
      this.chatMessages.push({
        content: this.getAIResponse(this.inputMessage),
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      })
      // 滚动到底部
      this.scroller.scrollToIndex(this.chatMessages.length - 1)
    }, 500)

    this.inputMessage = ''
  }

  build() {
    Column() {
      // 标题栏
      Row() {
        Image($r('app.media.back'))
          .width(24)
          .height(24)
          .margin({ left: 16 })
          .onClick(() => {
            router.back()
          })
        Text('智能客服')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .margin({ left: 16 })
      }
      .width('100%')
      .height(56)
      .backgroundColor('#FFFFFF')
      .alignItems(VerticalAlign.Center)

      // 聊天区域
      List({ scroller: this.scroller }) {
        ForEach(this.chatMessages, (message: ChatMessage) => {
          ListItem() {
            Row() {
              if (message.isUser) {
                Blank()
                Column() {
                  Text(message.content)
                    .fontSize(16)
                    .fontColor('#FFFFFF')
                    .padding(12)
                    .backgroundColor('#16A34A')
                    .borderRadius(12)
                  Text(message.timestamp)
                    .fontSize(12)
                    .fontColor('#999999')
                    .margin({ top: 4 })
                }
                .alignItems(HorizontalAlign.End)
                .margin({ left: '20%' })
              } else {
                Column() {
                  Text(message.content)
                    .fontSize(16)
                    .padding(12)
                    .backgroundColor('#F3F4F6')
                    .borderRadius(12)
                  Text(message.timestamp)
                    .fontSize(12)
                    .fontColor('#999999')
                    .margin({ top: 4 })
                }
                .alignItems(HorizontalAlign.Start)
                .margin({ right: '20%' })
                Blank()
              }
            }
            .width('100%')
            .padding({ left: 16, right: 16, top: 8, bottom: 8 })
          }
        })
      }
      .layoutWeight(1)
      .width('100%')

      // 输入区域
      Row() {
        TextInput({ placeholder: '请输入您的问题...', text: this.inputMessage })
          .width('80%')
          .height(40)
          .backgroundColor('#F3F4F6')
          .borderRadius(20)
          .padding({ left: 16, right: 16 })
          .onChange((value: string) => {
            this.inputMessage = value
          })
          .onSubmit(() => {
            this.sendMessage()
          })

        Button('发送')
          .width(60)
          .height(40)
          .fontSize(16)
          .fontColor('#FFFFFF')
          .backgroundColor('#16A34A')
          .borderRadius(20)
          .margin({ left: 8 })
          .onClick(() => {
            this.sendMessage()
          })
      }
      .width('100%')
      .padding(12)
      .backgroundColor('#FFFFFF')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F8FAFC')
  }
}