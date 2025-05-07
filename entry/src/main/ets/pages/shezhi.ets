import router from '@ohos.router';

interface ListItemOptions {
  icon: Resource
  title: string
  subTitle?: string
  showArrow?: boolean
  showSwitch?: boolean
}

@Entry
@Component
struct SettingsPage {
  @State notificationEnabled: boolean = true

  build() {
    Column() {
      // 标题栏
      Row() {
        Image($r('app.media.back'))
          .width(24)
          .height(24)
          .onClick(() => {
            const params = router.getParams() as Record<string, string>
            if (params?.from === 'task') {
              router.pushUrl({ url: 'pages/renwu' })
            } else {
              router.pushUrl({ url: 'pages/zhuye' })
            }
          })
        Text('设置')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .margin({ left: 16 })
      }
      .width('100%')
      .height(56)
      .padding({ left: 16 })
      .backgroundColor('#FFFFFF')
      .alignItems(VerticalAlign.Center)

      // 用户信息卡片
      Row() {
        Image($r('app.media.avatar_default'))
          .width(64)
          .height(64)
          .borderRadius(32)
          .margin({ right: 16 })

        Column() {
          Text('亚尔林√那么美丽')
            .fontSize(18)
            .fontWeight(FontWeight.Medium)
            .fontColor('#333333')
          Text('181****6310')
            .fontSize(14)
            .fontColor('#999999')
            .margin({ top: 4 })
        }
        .alignItems(HorizontalAlign.Start)
      }
      .width('100%')
      .backgroundColor('#FFFFFF')
      .padding(16)

      // 内容区域
      Scroll() {
        Column() {
          // 设备管理
          this.ListItem({
            icon: $r('app.media.device'),
            title: '设备管理',
            subTitle: '已连接 4 个设备',
            showArrow: true
          })

          Divider().height(1).color('#F0F0F0')

          // 环境阈值
          this.ListItem({
            icon: $r('app.media.environment'),
            title: '环境阈值',
            subTitle: '温度: 26°C | 湿度: 65% | 光照: 2000lux',
            showArrow: true
          })

          Divider().height(1).color('#F0F0F0')

          // 自动化规则
          this.ListItem({
            icon: $r('app.media.automation'),
            title: '自动化规则',
            subTitle: '已配置 3 条规则',
            showArrow: true
          })

          Divider().height(1).color('#F0F0F0')

          // 消息通知
          this.ListItem({
            icon: $r('app.media.notification'),
            title: '消息通知',
            subTitle: '接收系统通知和报警提醒',
            showSwitch: true
          })

          Divider().height(1).color('#F0F0F0')

          // 修改密码
          this.ListItem({
            icon: $r('app.media.lock'),
            title: '修改密码',
            showArrow: true
          })

          // 退出登录按钮
          Button('退出登录')
            .width('90%')
            .height(48)
            .margin({ top: 32 })
            .fontColor('#FF4D4F')
            .fontSize(16)
            .backgroundColor('#FFFFFF')
            .borderRadius(24)
        }
        .padding({ left: 16, right: 16, top: 12 })
        .margin({ top: -8 })
      }
      .layoutWeight(1)
      .scrollable(ScrollDirection.Vertical)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F7FA')
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
          .fontColor('#333333')
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
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ top: 8 })
  }
}