import router from '@ohos.router'

@Entry
@Component
struct WaterDetailsPage {
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
        Text('浇水细节介绍')
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
          // 知识图片 1
          Image($r('app.media.water_detail_1'))
            .width('90%')
            .height(420)
            .borderRadius(12)
            .margin({ top: 16 })
            .objectFit(ImageFit.Cover)

          // 知识图片 2
          Image($r('app.media.water_detail_2'))
            .width('90%')
            .height(420)
            .borderRadius(12)
            .margin({ top: 16 })
            .objectFit(ImageFit.Cover)

          // 知识图片 3
          Image($r('app.media.water_detail_3'))
            .width('90%')
            .height(420)
            .borderRadius(12)
            .margin({ top: 16 })
            .objectFit(ImageFit.Cover)

          // 知识图片 4
          Image($r('app.media.water_detail_4'))
            .width('90%')
            .height(420)
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