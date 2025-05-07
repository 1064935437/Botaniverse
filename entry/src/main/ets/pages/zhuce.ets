import router from '@ohos.router';

@Entry
@Component
struct RegisterPage {
  @State phoneNumber: string = ''
  @State password: string = ''
  @State confirmPassword: string = ''
  @State isPhoneValid: boolean = true
  @State isPasswordValid: boolean = true
  @State isPasswordMatch: boolean = true

  validatePhone(phone: string) {
    const phoneRegex = /^1[3-9]\d{9}$/
    this.isPhoneValid = phoneRegex.test(phone)
  }

  validatePassword() {
    this.isPasswordValid = this.password.length >= 6
    this.isPasswordMatch = this.password === this.confirmPassword
  }

  build() {
    Column() {
      // 返回按钮
      Row() {
        // 使用简单的返回文本替代图片
        Text('< 返回')
          .fontSize(16)
          .fontColor('#16a34a')
          .margin({ left: 16 })
          .onClick(() => {
            router.back()
          })
      }
      .width('100%')
      .justifyContent(FlexAlign.Start)
      .margin({ top: 20 })

      // 标题
      Text('注册账号')
        .fontSize(28)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 40, bottom: 60 })

      // 注册表单
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
        TextInput({ placeholder: '请输入密码（至少6位）' })
          .width('85%')
          .height(45)
          .backgroundColor('rgba(220, 252, 231, 0.6)')
          .borderRadius(8)
          .type(InputType.Password)
          .margin({ bottom: 8 })
          .onChange((value: string) => {
            this.password = value
            this.validatePassword()
          })

        // 确认密码
        TextInput({ placeholder: '请确认密码' })
          .width('85%')
          .height(45)
          .backgroundColor('rgba(220, 252, 231, 0.6)')
          .borderRadius(8)
          .type(InputType.Password)
          .margin({ bottom: 8 })
          .onChange((value: string) => {
            this.confirmPassword = value
            this.validatePassword()
          })

        if (!this.isPasswordMatch) {
          Text('两次输入的密码不一致')
            .fontSize(12)
            .fontColor('#dc2626')
            .margin({ bottom: 8 })
        }

        // 注册按钮
        Button('注 册')
          .width('85%')
          .height(45)
          .backgroundColor('#16a34a')
          .borderRadius(8)
          .opacity(0.9)
          .margin({ top: 32 })
          .onClick(() => {
            if (this.isPhoneValid && this.isPasswordValid && this.isPasswordMatch) {
              try {
                // 这里可以添加注册逻辑
                router.back() // 注册成功后返回登录页
              } catch (error) {
                console.error(`注册失败: ${error}`)
              }
            }
          })
      }
      .width('100%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#ffffff')
  }
}
