import router from '@ohos.router'
import accountService from './test11'

@Entry
@Component
struct RegisterPage {
  @State username: string = ''
  @State password: string = ''
  @State confirmPassword: string = ''
  @State email: string = ''
  @State notes: string = ''
  @State errorMessage: string = ''
  @State loading: boolean = false

  build() {
    Column() {
      Text('账号注册')
        .fontSize(28)
        .fontWeight(FontWeight.Bold)
        .margin({ top: 50, bottom: 30 })

      Column() {
        // 用户名输入
        TextInput({ placeholder: '请输入用户名', text: this.username })
          .type(InputType.Normal)
          .onChange((value: string) => { this.username = value })
          .width('90%')
          .margin({ bottom: 20 })
          .padding(10)
          .backgroundColor('rgba(220, 252, 231, 0.6)')
          .borderRadius(8)

        // 密码输入
        TextInput({ placeholder: '请输入密码', text: this.password })
          .type(InputType.Password)
          .onChange((value: string) => { this.password = value })
          .width('90%')
          .margin({ bottom: 20 })
          .padding(10)
          .backgroundColor('rgba(220, 252, 231, 0.6)')
          .borderRadius(8)

        // 确认密码输入
        TextInput({ placeholder: '请再次输入密码', text: this.confirmPassword })
          .type(InputType.Password)
          .onChange((value: string) => { this.confirmPassword = value })
          .width('90%')
          .margin({ bottom: 20 })
          .padding(10)
          .backgroundColor('rgba(220, 252, 231, 0.6)')
          .borderRadius(8)

        // 邮箱输入
        TextInput({ placeholder: '请输入邮箱', text: this.email })
          .type(InputType.Email)
          .onChange((value: string) => { this.email = value })
          .width('90%')
          .margin({ bottom: 20 })
          .padding(10)
          .backgroundColor('rgba(220, 252, 231, 0.6)')
          .borderRadius(8)

        // 备注输入
        TextInput({ placeholder: '备注信息（选填）', text: this.notes })
          .type(InputType.Normal)
          .onChange((value: string) => { this.notes = value })
          .width('90%')
          .height(100)
          .margin({ bottom: 30 })
          .padding(10)
          .backgroundColor('rgba(220, 252, 231, 0.6)')
          .borderRadius(8)

        // 错误提示
        if (this.errorMessage) {
          Text(this.errorMessage)
            .fontSize(14)
            .fontColor('#FF0000')
            .margin({ bottom: 20 })
        }

        // 注册按钮
        Button(this.loading ? '注册中...' : '注册')
          .width('90%')
          .height(50)
          .backgroundColor('#16a34a')
          .fontColor('#FFFFFF')
          .fontSize(18)
          .onClick(() => this.handleRegister())
          .enabled(!this.loading)

        // 已有账号，去登录
        Row() {
          Text('已有账号？')
            .fontSize(14)
            .fontColor('#666666')

          Text('去登录')
            .fontSize(14)
            .fontColor('#16a34a')
            .onClick(() => {
              router.pushUrl({
                url: 'pages/Index'
              })
            })
        }
        .margin({ top: 20 })
      }
      .width('100%')
      .padding({ left: 20, right: 20 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }

  async handleRegister() {
    if (!this.username) {
      this.errorMessage = '请输入用户名'
      return
    }
    if (!this.password) {
      this.errorMessage = '请输入密码'
      return
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = '两次输入的密码不一致'
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (this.email && !emailRegex.test(this.email)) {
      this.errorMessage = '请输入有效的邮箱地址'
      return
    }
    this.loading = true
    this.errorMessage = ''
    try {
      const result = await accountService.registerAccount({
        platform: this.username,
        username: this.username,
        password: this.password,
        email: this.email,
        notes: this.notes
      })
      if (result.success) {
        router.pushUrl({
          url: 'pages/Index',
          params: { message: '注册成功，请登录' }
        })
      } else {
        this.errorMessage = result.message
      }
    } catch (error) {
      this.errorMessage = '注册失败，请稍后再试'
    } finally {
      this.loading = false
    }
  }
}