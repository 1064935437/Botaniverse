import router from '@ohos.router'

@Entry
@Component
struct PruningDetailsPage {
  build() {
    Column() {
      // 标题栏
      Row() {
        Image($r('app.media.back'))
          .width(24)
          .height(24)
          .margin({ left: 16 })
          .onClick(() => {
            router.pushUrl({
              url: 'pages/faxian'
            })
          })
        Text('修剪技巧详解')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .margin({ left: 16 })
      }
      .width('100%')
      .height(56)
      .backgroundColor('#FFFFFF')
      .alignItems(VerticalAlign.Center)

      // 内容区域
      Scroll() {
        Column() {
          // 修剪知识图片 1
          Image($r('app.media.pruning_detail_1'))
            .width('90%')
            .height(420)
            .borderRadius(12)
            .margin({ top: 16 })
            .objectFit(ImageFit.Cover)

          // 修剪知识图片 2
          Image($r('app.media.pruning_detail_2'))
            .width('90%')
            .height(380)
            .borderRadius(12)
            .margin({ top: 16 })
            .objectFit(ImageFit.Cover)

          // 修剪知识图片 3
          Image($r('app.media.pruning_detail_3'))
            .width('90%')
            .height(420)
            .borderRadius(12)
            .margin({ top: 16 })
            .objectFit(ImageFit.Cover)

          // 修剪知识图片 4
          Image($r('app.media.pruning_detail_4'))
            .width('90%')
            .height(620)
            .borderRadius(12)
            .margin({ top: 16, bottom: 16 })
            .objectFit(ImageFit.Cover)
        }
        .width('100%')
        .alignItems(HorizontalAlign.Center)
      }
      .width('100%')
      .layoutWeight(1)
      .scrollable(ScrollDirection.Vertical)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F5F5')
  }
}