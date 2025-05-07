import router from '@ohos.router';

@Entry
@Component
struct LoginPage {
  @State phoneNumber: string = ''
  @State password: string = ''
  @State isPhoneValid: boolean = true
  @State isPasswordValid: boolean = true

  validatePhone(phone: string) {
    const phoneRegex = /^1[3-9]\d{9}$/
    this.isPhoneValid = phoneRegex.test(phone)
  }

  aboutToAppear() {
    // 页面加载时的初始化
  }

  build() {
    Column() {
      // 品牌区域
      Image ($r('app.media.avatar'))
        .width(150)
        .height(150)
        .borderRadius(50)
        .margin({ top: 80 })

      Text('Botaniverse')
        .fontSize(28)
        .fontWeight(FontWeight.Bold)
        .fontColor('#166534')
        .margin({ top: 16, bottom: 60 })

      // 登录表单
      Column() {
        // 手机号输入
        TextInput({ placeholder: '请输入手机号' })
          .width('85%')
          .height(45)
          .backgroundColor('rgba(220, 252, 231, 0.6)')
          .borderRadius(8)
          .margin({ bottom: 8 })
          .onChange((value: string) => {
            this.phoneNumber = value
            this.validatePhone(value)
          })

        if (!this.isPhoneValid) {
          Text('请输入正确的手机号')
            .fontSize(12)
            .fontColor('#dc2626')
            .margin({ bottom: 8 })
        }

        // 密码输入
        TextInput({ placeholder: '请输入密码' })
          .width('85%')
          .height(45)
          .backgroundColor('rgba(220, 252, 231, 0.6)')
          .borderRadius(8)
          .type(InputType.Password)
          .margin({ bottom: 40 })
          .onChange((value: string) => {
            this.password = value
          })

        // 登录按钮
        Button('登 录')
          .width('85%')
          .height(45)
          .backgroundColor('#16a34a')
          .borderRadius(8)
          .opacity(0.9)
          .onClick(() => {
            if (this.isPhoneValid && this.password.length >= 6) {
              try {
                router.pushUrl({
                  url: 'pages/zhuye',  // 修改为实际的页面路径
                }).catch((err: Error) => {
                  console.error(`跳转失败: ${err.message}`);
                });
              } catch (error) {
                console.error(`发生错误: ${error}`);
              }
            }
          })

        Row() {
          Text('注册账号')
            .fontColor('#16a34a')
            .onClick(() => {
              try {
                router.pushUrl({
                  url: 'pages/zhuce'
                })
              } catch (error) {
                console.error(`跳转失败: ${error}`);
              }
            })
          Text('忘记密码')
            .fontColor('#16a34a')
        }
        .width('85%')
        .justifyContent(FlexAlign.SpaceBetween)
        .margin({ top: 20 })
      }
      .width('100%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#ffffff')
  }
}
