import router from '@ohos.router';

@Entry
@Component
struct CustomerServicePage {
  @State inputText: string = ''
  @State commonQuestions: string[] = [
    '如何修改个人信息？',
    '怎么更换头像？',
    '如何解绑手机号？',
    '忘记密码怎么办？',
    '如何注销账号？'
  ]

  build() {
    Column() {
      // 标题栏
      Row() {
        Image($r('app.media.back'))
          .width(24)
          .height(24)
          .onClick(() => {
            router.back()
          })
        Text('在线客服')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .margin({ left: 16 })
      }
      .width('100%')
      .height(56)
      .padding({ left: 16 })
      .backgroundColor('#FFFFFF')
      .alignItems(VerticalAlign.Center)

      // 聊天区域
      Scroll() {
        Column() {
          // 欢迎消息
          Row() {
            Image($r('app.media.customer_service'))
              .width(40)
              .height(40)
              .margin({ right: 12 })
            Column() {
              Text('您好，我是智能客服小助手，请问有什么可以帮您？')
                .fontSize(16)
                .fontColor('#333333')
                .backgroundColor('#F0F0F0')
                .padding(12)
                .borderRadius(8)
            }
          }
          .width('100%')
          .padding(16)
          .alignItems(VerticalAlign.Top)

          // 常见问题推荐
          Column() {
            Text('常见问题')
              .fontSize(16)
              .fontWeight(FontWeight.Medium)
              .margin({ bottom: 12 })

            ForEach(this.commonQuestions, (question: string) => {
              Button(question)
                .width('100%')
                .height(44)
                .fontSize(14)
                .fontColor('#333333')
                .backgroundColor('#F5F5F5')
                .margin({ bottom: 8 })
                .borderRadius(22)
                .onClick(() => {
                  this.inputText = question
                })
            })
          }
          .width('100%')
          .padding(16)
          .backgroundColor('#FFFFFF')
          .borderRadius(12)
          .margin(16)
        }
      }
      .layoutWeight(1)
      .backgroundColor('#F5F7FA')

      // 底部输入框
      Row() {
        TextInput({ placeholder: '请输入您的问题', text: this.inputText })
          .width('80%')
          .height(40)
          .backgroundColor('#F5F5F5')
          .borderRadius(20)
          .padding({ left: 16, right: 16 })
          .onChange((value: string) => {
            this.inputText = value
          })

        Button('发送')
          .width(72)
          .height(40)
          .fontSize(16)
          .fontColor('#FFFFFF')
          .backgroundColor('#16A34A')
          .borderRadius(20)
          .margin({ left: 8 })
          .onClick(() => {
            if (this.inputText.trim() !== '') {
              console.info('发送消息:', this.inputText)
              this.inputText = ''
            }
          })
      }
      .width('100%')
      .padding(16)
      .backgroundColor('#FFFFFF')
    }
    .width('100%')
    .height('100%')
  }
}