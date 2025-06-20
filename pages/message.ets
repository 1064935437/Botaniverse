import router from '@ohos.router'

@Entry
@Component
struct MessagePage {
  @State currentTab: number = 0
  private tabTitles: string[] = ['提醒', '私信']

  @Builder TabBuilder(title: string, index: number) {
    Column() {
      Text(title)
        .fontColor(this.currentTab === index ? '#333333' : '#666666')
        .fontSize(16)
        .fontWeight(this.currentTab === index ? FontWeight.Medium : FontWeight.Regular)

      if (this.currentTab === index) {
        Divider()
          .width(24)
          .height(2)
          .color('#333333')
          .margin({ top: 4 })
      }
    }
    .width(60)
    .alignItems(HorizontalAlign.Center)
    .onClick(() => {
      this.currentTab = index
    })
  }

  build() {
    Column() {
      // 顶部导航栏
      Row() {
        Image($r('app.media.back'))
          .width(24)
          .height(24)
          .onClick(() => router.back())

        Row() {
          ForEach(this.tabTitles, (title: string, index: number) => {
            this.TabBuilder(title, index)
          })
        }
        .width('50%')  // 设置固定宽度
        .margin({ left: 80 })  // 增加左边距
        .justifyContent(FlexAlign.SpaceAround)  // 平均分布间距
      }
      .width('100%')
      .height(56)
      .padding({ left: 16, right: 16 })
      .backgroundColor('#FFFFFF')
      .justifyContent(FlexAlign.Start)
      .alignItems(VerticalAlign.Center)

      // 内容区域
      Stack() {
        if (this.currentTab === 0) {
          Column() {
            // 全部已读按钮
            Text('全部已读')
              .fontSize(14)
              .fontColor('#999999')
              .margin({ top: 8, right: 16, bottom: 8 })  // 调整上下间距
              .alignSelf(ItemAlign.End)

            // 空状态提示
            Column() {
              Image($r('app.media.empty'))
                .width(100)
                .height(100)
              Text('暂无提醒')
                .fontSize(14)
                .fontColor('#999999')
                .margin({ top: 8 })
            }
            .width('100%')
            .height('100%')
            .justifyContent(FlexAlign.Center)
            .alignItems(HorizontalAlign.Center)
          }
          .width('100%')
        } else {
          Column() {
            // 添加私信标签页的全部已读按钮
            Text('全部已读')
              .fontSize(14)
              .fontColor('#999999')
              .margin({ top: 8, right: 16, bottom: 8 })
              .alignSelf(ItemAlign.End)

            // 空状态提示
            Column() {
              Image($r('app.media.empty'))
                .width(100)
                .height(100)
              Text('暂无私信')
                .fontSize(14)
                .fontColor('#999999')
                .margin({ top: 8 })
            }
            .width('100%')
            .height('100%')
            .justifyContent(FlexAlign.Center)
            .alignItems(HorizontalAlign.Center)
          }
        }
      }
      .backgroundColor('#FFFFFF')
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#f5f5f5')
  }
}
