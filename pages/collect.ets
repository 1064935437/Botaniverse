import router from '@ohos.router'

@Entry
@Component
struct CollectPage {
  private categories: string[] = ['帖子', '话题', '植物']
  @State currentTab: number = 0

  build() {
    Column() {
      // 顶部导航栏
      Row() {
        Image($r('app.media.back'))
          .width(24)
          .height(24)
          .onClick(() => {
            router.back()
          })
        Text('我的收藏')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .margin({ left: 16 })
      }
      .width('100%')
      .height(56)
      .padding({ left: 16, right: 16 })
      .backgroundColor('#FFFFFF')
      .alignItems(VerticalAlign.Center)

      // 分类标签栏
      Row() {
        ForEach(this.categories, (item: string, index: number) => {
          Text(item)
            .fontSize(16)
            .fontColor(this.currentTab === index ? '#16a34a' : '#666666')
            .fontWeight(this.currentTab === index ? FontWeight.Medium : FontWeight.Normal)
            .margin({ right: 24 })
            .onClick(() => {
              this.currentTab = index
            })
        })
      }
      .width('100%')
      .padding(16)
      .backgroundColor('#FFFFFF')

      // 内容区域
      Tabs() {
        TabContent() {
          List() {
            // 收藏的帖子列表
          }
        }.tabBar('帖子')

        TabContent() {
          List() {
            // 收藏的话题列表
          }
        }.tabBar('话题')

        TabContent() {
          List() {
            // 收藏的植物列表
          }
        }.tabBar('植物')
      }
      .barWidth(0)
      .scrollable(false)
      .backgroundColor('#f5f5f5')
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#f5f5f5')
  }
}
