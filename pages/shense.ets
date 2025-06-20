import router from '@ohos.router';

interface ListItemOptions {
  icon: Resource
  title: string
  subTitle?: string
  showArrow?: boolean
  showSwitch?: boolean
  onClick?: () => void
}

@Entry
@Component
struct SettingsPage {
  @State notificationEnabled: boolean = true
  @State themeMode: string = '深色模式'

  build() {
    Stack({ alignContent: Alignment.Bottom }) {
      Column() {
        // 标题栏
        Row() {
          Image($r('app.media.back'))
            .width(24)
            .height(24)
            .fillColor('#FFFFFF')
            .onClick(() => {
              router.pushUrl({
                url: 'pages/wode'
              })
            })
          Text('设置')
            .fontSize(20)
            .fontWeight(FontWeight.Medium)
            .fontColor('#FFFFFF')
            .margin({ left: 16 })
        }
        .width('100%')
        .height(56)
        .padding({ left: 16 })
        .backgroundColor('#1A1A1A')
        .alignItems(VerticalAlign.Center)

        // 内容区域
        Scroll() {
          Column() {
            // 主题设置
            Row() {
              Image($r('app.media.theme'))
                .width(24)
                .height(24)
                .fillColor('#16A34A')

              Column() {
                Text('主题设置')
                  .fontSize(16)
                  .fontColor('#FFFFFF')
                Text(this.themeMode)
                  .fontSize(14)
                  .fontColor('#999999')
                  .margin({ top: 4 })
              }
              .alignItems(HorizontalAlign.Start)
              .margin({ left: 12 })
              .flexGrow(1)

              Button(this.themeMode === '浅色模式' ? '切换深色' : '切换浅色')
                .height(32)
                .fontSize(14)
                .fontColor('#16A34A')
                .backgroundColor('#0A2714')
                .borderRadius(16)
                .onClick(() => {
                  this.themeMode = this.themeMode === '浅色模式' ? '深色模式' : '浅色模式'
                  router.pushUrl({
                    url: 'pages/shezhi'
                  })
                })
            }
            .width('100%')
            .padding({ left: 16, right: 16, top: 12, bottom: 12 })
            .backgroundColor('#2A2A2A')
            .margin({ top: 12, left: 12, right: 12 })
            .borderRadius(8)

            // 权限管理
            this.ListItem({
              icon: $r('app.media.permission'),
              title: '权限管理',
              subTitle: '相机、相册、位置信息、推送权限',
              showArrow: true,
              onClick: () => {
                router.pushUrl({
                  url: 'pages/quanxian'
                })
              }
            })

            // 关于与版本信息
            this.ListItem({
              icon: $r('app.media.info'),
              title: '关于与版本信息',
              subTitle: 'App 版本号、更新日志、开发者信息',
              showArrow: true,
              onClick: () => {
                router.pushUrl({
                  url: 'pages/banben'
                })
              }
            })

            // 退出登录按钮
            Button('退出登录')
              .width('90%')
              .height(48)
              .margin({ top: 32 })
              .fontColor('#FF4D4F')
              .fontSize(16)
              .backgroundColor('#2A2A2A')
              .borderRadius(24)
              .onClick(() => {
                router.pushUrl({
                  url: 'pages/Index'
                })
              })
          }
          .width('100%')
          .margin({ top: -350 })
        }
        .layoutWeight(1)
        .scrollable(ScrollDirection.Vertical)
      }
      .width('100%')
      .height('100%')
      .backgroundColor('#121212')

      // 浮动客服按钮
      Button({ type: ButtonType.Circle }) {
        Image($r('app.media.customer_service'))
          .width(24)
          .height(24)
          .fillColor('#FFFFFF')
      }
      .width(56)
      .height(56)
      .margin({ bottom: 24, right: 24 })
      .backgroundColor('#16A34A')
      .onClick(() => {
        router.pushUrl({
          url: 'pages/kefu'
        })
      })
    }
  }

  @Builder ListItem(options: ListItemOptions) {
    Row() {
      Image(options.icon)
        .width(24)
        .height(24)
        .fillColor('#16A34A')

      Column() {
        Text(options.title)
          .fontSize(16)
          .fontColor('#FFFFFF')
        if (options.subTitle) {
          Text(options.subTitle)
            .fontSize(14)
            .fontColor('#999999')
            .margin({ top: 4 })
        }
      }
      .alignItems(HorizontalAlign.Start)
      .margin({ left: 12 })
      .flexGrow(1)

      if (options.showSwitch) {
        Toggle({ type: ToggleType.Switch, isOn: this.notificationEnabled })
          .width(40)
          .height(24)
          .selectedColor('#16A34A')
          .onChange((isOn: boolean) => {
            this.notificationEnabled = isOn
          })
      }

      if (options.showArrow) {
        Image($r('app.media.arrow_right'))
          .width(20)
          .height(20)
          .fillColor('#999999')
      }
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 12, bottom: 12 })
    .backgroundColor('#2A2A2A')
    .borderRadius(8)
    .margin({ left: 12, right: 12, top: 12 })
    .onClick(() => {
      options.onClick?.()
    })
  }
}