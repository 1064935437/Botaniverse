import router from '@ohos.router';

// 定义权限项接口
interface PermissionItemOptions {
  icon: Resource
  title: string
  subTitle: string
  enabled: boolean
  onChange: (isOn: boolean) => void
}

@Entry
@Component
struct PermissionPage {
  @State cameraEnabled: boolean = false
  @State albumEnabled: boolean = false
  @State locationEnabled: boolean = false
  @State notificationEnabled: boolean = false

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
        Text('权限管理')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .margin({ left: 16 })
      }
      .width('100%')
      .height(56)
      .padding({ left: 16 })
      .backgroundColor('#FFFFFF')
      .alignItems(VerticalAlign.Center)

      // 内容区域
      Scroll() {
        Column() {
          // 相机权限
          this.PermissionItem({
            icon: $r('app.media.camera'),
            title: '相机权限',
            subTitle: '用于拍摄照片和视频',
            enabled: this.cameraEnabled,
            onChange: (isOn: boolean) => {
              this.cameraEnabled = isOn
            }
          })

          // 相册权限
          this.PermissionItem({
            icon: $r('app.media.album'),
            title: '相册权限',
            subTitle: '用于访问和保存照片',
            enabled: this.albumEnabled,
            onChange: (isOn: boolean) => {
              this.albumEnabled = isOn
            }
          })

          // 位置信息
          this.PermissionItem({
            icon: $r('app.media.location'),
            title: '位置信息',
            subTitle: '用于获取当前位置信息',
            enabled: this.locationEnabled,
            onChange: (isOn: boolean) => {
              this.locationEnabled = isOn
            }
          })

          // 消息推送
          this.PermissionItem({
            icon: $r('app.media.notification'),
            title: '消息推送',
            subTitle: '接收重要消息和活动通知',
            enabled: this.notificationEnabled,
            onChange: (isOn: boolean) => {
              this.notificationEnabled = isOn
            }
          })

          // 权限设置说明
          Text('开启权限即代表您同意我们访问和使用相关功能，您可以随时在这里管理这些权限')
            .fontSize(14)
            .fontColor('#999999')
            .margin({ top: 24, left: 16, right: 16 })
            .textAlign(TextAlign.Center)
        }
        .width('100%')
        .margin({ top: -270 })
      }
      .layoutWeight(1)
      .scrollable(ScrollDirection.Vertical)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F7FA')
  }

  @Builder PermissionItem(options: PermissionItemOptions) {
    Row() {
      Image(options.icon)
        .width(24)
        .height(24)
        .fillColor('#16A34A')

      Column() {
        Text(options.title)
          .fontSize(16)
          .fontColor('#333333')
        Text(options.subTitle)
          .fontSize(14)
          .fontColor('#999999')
          .margin({ top: 4 })
      }
      .alignItems(HorizontalAlign.Start)
      .margin({ left: 12 })
      .flexGrow(1)

      Toggle({ type: ToggleType.Switch, isOn: options.enabled })
        .width(40)
        .height(24)
        .selectedColor('#16A34A')
        .onChange(options.onChange)
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 12, bottom: 12 })
    .backgroundColor('#FFFFFF')
    .borderRadius(8)
    .margin({ left: 12, right: 12, top: 12 })
  }
}