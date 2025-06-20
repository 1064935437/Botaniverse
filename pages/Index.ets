// LoginPage.ets - 融合后的登录页面
import router from '@ohos.router';
import accountService from './test11';
import userStore from './userStore';

@Entry
@Component
struct LoginPage {
  @State username: string = ''
  @State password: string = ''
  @State errorMessage: string = ''
  @State loading: boolean = false
  @State loginMessage: string = ''

  aboutToAppear() {
    // 获取注册成功后的提示信息
    const params = router.getParams() as Record<string, string>
    if (params && params.message) {
      this.loginMessage = params.message
    }
  }

  build() {
    Column() {
      // 顶部品牌区域 - 保留原始风格
      Image($r('app.media.avatar'))
        .width(150)
        .height(150)
        .borderRadius(50)
        .margin({ top: 80 })

      Text('Botaniverse')
        .fontSize(28)
        .fontWeight(FontWeight.Bold)
        .fontColor('#166534')
        .margin({ top: 16, bottom: 60 })

      // 登录提示信息
      if (this.loginMessage) {
        Text(this.loginMessage)
          .fontSize(14)
          .fontColor('#008000')
          .margin({ bottom: 20 })
      }

      // 表单区域 - 使用原始风格
      Column() {
        // 用户名输入
        TextInput({ placeholder: '请输入用户名', text: this.username })
          .type(InputType.Normal)
          .onChange((value: string) => { this.username = value })
          .width('85%')
          .height(45)
          .backgroundColor('rgba(220, 252, 231, 0.6)')
          .borderRadius(8)
          .margin({ bottom: 8 })

        // 密码输入
        TextInput({ placeholder: '请输入密码', text: this.password })
          .type(InputType.Password)
          .onChange((value: string) => { this.password = value })
          .width('85%')
          .height(45)
          .backgroundColor('rgba(220, 252, 231, 0.6)')
          .borderRadius(8)
          .margin({ bottom: 40 })

        // 错误提示
        if (this.errorMessage) {
          Text(this.errorMessage)
            .fontSize(12)
            .fontColor('#dc2626')
            .margin({ bottom: 8 })
        }

        // 登录按钮 - 使用原始风格
        Button(this.loading ? '登录中...' : '登 录')
          .width('85%')
          .height(45)
          .backgroundColor('#16a34a')
          .fontColor('#FFFFFF')
          .fontSize(18)
          .borderRadius(8)
          .opacity(0.9)
          .onClick(() => this.handleLogin())
          .enabled(!this.loading)

        // 底部链接 - 保留原始风格
        Row() {
          Text('注册账号')
            .fontColor('#16a34a')
            .onClick(() => {
              router.pushUrl({
                url: 'pages/zhuce'
              })
            })


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

  // 处理登录逻辑 - 保留改进后的功能
  async handleLogin() {
    // 验证表单
    if (!this.username) {
      this.errorMessage = '请输入用户名'
      return
    }

    if (!this.password) {
      this.errorMessage = '请输入密码'
      return
    }

    // 显示加载状态
    this.loading = true
    this.errorMessage = ''

    try {
      const result = await accountService.login(this.username, this.password)
      if (result.success) {
        // 保存用户名到全局状态
        userStore.setUsername(this.username)
        router.pushUrl({
          url: 'pages/shequ',
          params: {
            username: this.username,
            user: result.user
          }
        })
      } else {
        // 登录失败，显示错误信息
        this.errorMessage = result.message
      }
    } catch (error) {
      this.errorMessage = '登录失败，请稍后再试'
    } finally {
      // 隐藏加载状态
      this.loading = false
    }
  }
}