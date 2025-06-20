import router from '@ohos.router'

// 定义推荐内容接口
interface IRecommand {
  id: string;
  imageSrc: Resource;
  url: string;
}

class RecommandItem {
  id: string;
  imageSrc: Resource;
  url: string;

  constructor(id: string, imageSrc: Resource, url: string) {
    this.id = id;
    this.imageSrc = imageSrc;
    this.url = url;
  }
}

@Entry
@Component
struct FaXianPage {
  @State activeTab: number = 2
  @State phoneNumber: string = ''
  readonly tabItems: string[] = ['社区', '任务', '发现', '我的']

  aboutToAppear() {
    try {
      const params = router.getParams() as Record<string, string>
      this.phoneNumber = params?.phoneNumber ?? ''
    } catch (err) {
      console.error('获取参数失败:', err)
    }
  }

  build() {
    Column() {
      // 顶部标题栏
      Row() {
        Text('Botaniverse')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#166534')

        Image($r('app.media.avatar'))
          .width(32)
          .height(32)
          .borderRadius(16)
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceBetween)
      .padding({ left: 16, right: 16, top: 8, bottom: 8 })

      Scroll() {
        Column() {
          // 推荐轮播
          Column() {
            Text('今日推荐')
              .fontSize(16)
              .fontWeight(FontWeight.Medium)
              .fontColor('#556B2F')

            Recommand()
          }
          .width('100%')
          .margin({ top: 8, bottom: 8 })
          .padding({ top: 8, bottom: 8 })

          // 我的植物展示
          Column() {
            Text('我的植物')
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .alignSelf(ItemAlign.Start)

            Row() {
              Stack() {
                Image($r('app.media.succulent'))
                  .width('100%')
                  .height(160)
                  .borderRadius(8)
                  .objectFit(ImageFit.Cover)
                  .onClick(() => {
                    router.pushUrl({
                      url: 'pages/threeD',
                      params: {
                        from: 'faxian'  // 标记来源页面
                      }
                    })
                  })
                Column() {
                  Text('多肉植物')
                    .fontColor('#ffffff')
                  Text('生长期 - 14天')
                    .fontSize(12)
                    .fontColor('#ffffff')
                }
                .width('100%')
                .padding(8)
                .backgroundColor('#00000060')
                .position({ y: 120 })
              }
              .width('45%')

              Stack() {
                Image($r('app.media.basil'))
                  .width('100%')
                  .height(160)
                  .borderRadius(8)
                Column() {
                  Text('罗勒')
                    .fontColor('#ffffff')
                  Text('生长期 - 21天')
                    .fontSize(12)
                    .fontColor('#ffffff')
                }
                .width('100%')
                .padding(8)
                .backgroundColor('#00000060')
                .position({ y: 120 })
              }
              .width('45%')
            }
            .width('100%')
            .justifyContent(FlexAlign.SpaceBetween)
          }
          .width('90%')
          .padding(16)
          .backgroundColor('#ffffff')
          .borderRadius(16)
          .margin({ top: 16 })

          // 花艺知识分享
          Column() {
            Text('花艺知识分享')
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .alignSelf(ItemAlign.Start)

            Row() {
              Column() {
                Image($r('app.media.watering_tip'))
                  .width('100%')
                  .height(120)
                  .borderRadius(8)
                Text('植物浇水技巧')
                  .fontSize(16)
                  .margin({ top: 8 })
                Text('了解不同植物的浇水需求')
                  .fontSize(12)
                  .fontColor('#666666')
                  .margin({ top: 4 })
              }
              .width('45%')
              .backgroundColor('#f0fdf4')
              .padding(12)
              .borderRadius(8)

              Column() {
                Image($r('app.media.pruning_tip'))
                  .width('100%')
                  .height(120)
                  .borderRadius(8)
                Text('修剪技巧')
                  .fontSize(16)
                  .margin({ top: 8 })
                Text('掌握植物修剪的基本方法')
                  .fontSize(12)
                  .fontColor('#666666')
                  .margin({ top: 4 })
              }
              .width('45%')
              .backgroundColor('#f0fdf4')
              .padding(12)
              .borderRadius(8)
              .onClick(() => {
                router.pushUrl({
                  url: 'pages/xiujian',
                  params: {
                    from: 'faxian'  // 标记来源页面
                  }
                })
              })
            }
            .width('100%')
            .justifyContent(FlexAlign.SpaceBetween)
          }
          .width('90%')
          .padding(16)
          .backgroundColor('#ffffff')
          .borderRadius(16)
          .margin({ top: 16, bottom: 60 })
        }
      }
      .scrollable(ScrollDirection.Vertical)
      .edgeEffect(EdgeEffect.Spring)
      .layoutWeight(1)

      // 底部导航栏
      Row() {
        ForEach(this.tabItems, (item: string, index: number) => {
          Column() {
            Image(index === this.activeTab ? $r(`app.media.tab_${item}_active`) : $r(`app.media.tab_${item}_normal`))
              .width(24)
              .height(36)
            Text(item)
              .fontSize(12)
              .fontColor(index === this.activeTab ? '#16a34a' : '#666666')
          }
          .onClick(() => {
            if (index === 0) {
              router.pushUrl({ url: 'pages/shequ' })
            } else if (index === 1) {
              router.pushUrl({ url: 'pages/renwu' })
            } else if (index === 2) {
              this.activeTab = index
            } else if (index === 3) {
              router.pushUrl({ url: 'pages/wode' })
            }
          })
        })
      }
      .width('100%')
      .backgroundColor('#ffffff')
      .position({ y: '93%' })
      .justifyContent(FlexAlign.SpaceAround)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#f8fafc')
  }
}

@Preview
@Component
struct Recommand {
  @State RecommandList: IRecommand[] = [
    new RecommandItem('pic0', $r('app.media.recommend_p1'),
      'https://ppbc.iplant.cn/tu/2079193'),
    new RecommandItem('pic1', $r('app.media.recommend_p2'),
      'https://ppbc.iplant.cn/tu/1039291'),
    new RecommandItem('pic2', $r('app.media.recommend_p3'),
      'https://ppbc.iplant.cn/tu/1237552'),
    new RecommandItem('pic3', $r('app.media.recommend_p4'),
      'https://ppbc.iplant.cn/tu/149948'),
    new RecommandItem('pic4', $r('app.media.recommend_p5'),
      'https://ppbc.iplant.cn/tu/20746313'),
    new RecommandItem('pic5', $r('app.media.recommend_p6'),
      'https://ppbc.iplant.cn/tu/1208382')
  ]

  build() {
    Swiper() {
      ForEach(this.RecommandList, (item: IRecommand, index: number) => {
        Image(item.imageSrc)
          .objectFit(ImageFit.Contain)
          .width('100%')
          .padding({ top: 11, left: 16, right: 16 })
          .borderRadius(16)
      }, (item: IRecommand): string => item.id)
    }
    .autoPlay(true)
    .loop(true)
    .indicator(
      new DotIndicator()
        .color('#1a000000')
        .selectedColor('#0A59F7')
    )
  }
}