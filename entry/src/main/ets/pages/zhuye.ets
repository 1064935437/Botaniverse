import router from '@ohos.router'

@Entry
@Component
struct MainPage {
  @State currentTemp: number = 26
  @State currentHumidity: number = 65
  @State activeTab: number = 0
  @State phoneNumber: string = ''
  readonly tabItems: string[] = ['首页', '任务', '社区', '我的']

  aboutToAppear() {
    // 获取上一个页面传递的参数
    try {
      const params = router.getParams() as Record<string, string>
      this.phoneNumber = params?.phoneNumber ?? ''
    } catch (err) {
      console.error('获取参数失败:', err)
    }
  }

  build() {
    Column() {
      // 顶部栏
      Row() {
        Text('Botaniverse')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#166534')

        Button() {
          Image($r('app.media.settings'))
            .width(24)
            .height(24)
            .fillColor('#166534')
        }
        .backgroundColor('transparent')
        .onClick(() => {
          router.pushUrl({
            url: 'pages/shezhi'
          })
        })
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceBetween)
      .padding({
        left: 16,
        right: 16,
        top: 8,
        bottom: 8
      })

      Scroll() {
        Column() {
          Column() {
            //推荐栏
            Text('今日推荐')
              .fontSize(16)
              .fontWeight(FontWeight.Medium)
              .fontColor('＃556B2F')

            Recommand()
          }
          .width('100%')
          .margin({ top: 8, bottom: 8 })
          .padding({ top: 8, bottom: 8 })

          // 环境信息卡片
          Column() {
            Row() {
              // 温度卡片
              Column() {
                Progress({ value: this.currentTemp, total: 50 })
                  .width(100)
                  .height(100)
                  .style({ strokeWidth: 10 })// 修改为style属性
                  .color('#22c55e')
                Text(`${this.currentTemp}°C`)
                  .fontSize(24)
                  .fontWeight(FontWeight.Medium)
                Text('温度')
                  .fontSize(14)
                  .fontColor('#666666')
              }
              .width('45%')

              // 湿度卡片
              Column() {
                Progress({ value: this.currentHumidity, total: 100 })
                  .width(100)
                  .height(100)
                  .style({ strokeWidth: 10 })// 修改为style属性
                  .color('#22c55e')
                Text(`${this.currentHumidity}%`)
                  .fontSize(24)
                  .fontWeight(FontWeight.Medium)
                Text('湿度')
                  .fontSize(14)
                  .fontColor('#666666')
              }
              .width('45%')
            }
            .width('100%')
            .justifyContent(FlexAlign.SpaceAround)
          }
          .width('90%')
          .padding(16)
          .backgroundColor('#ffffff')
          .borderRadius(16)
          .margin({ top: 16 })

          // 设备状态卡片
          Column() {
            Text('已连接设备')
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .alignSelf(ItemAlign.Start)

            Row() {
              // 温湿度传感器
              Row() {
                Image('/images/bluetooth.png')// 替换为本地图片
                  .width(20)
                  .height(20)
                Column() {
                  Text('温湿度传感器')
                    .fontSize(14)
                  Text('已连接')
                    .fontSize(12)
                    .fontColor('#16a34a')
                }
                .margin({ left: 8 })
              }
              .padding(12)
              .backgroundColor('#f0fdf4')
              .borderRadius(8)
              .width('45%')

              // 智能浇水器
              Row() {
                Image('/images/wifi.png')// 替换为本地图片
                  .width(20)
                  .height(20)
                Column() {
                  Text('智能浇水器')
                    .fontSize(14)
                  Text('已连接')
                    .fontSize(12)
                    .fontColor('#16a34a')
                }
                .margin({ left: 8 })
              }
              .padding(12)
              .backgroundColor('#f0fdf4')
              .borderRadius(8)
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

          // 我的植物
          Column() {
            Text('我的植物')
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .alignSelf(ItemAlign.Start)

            Row() {
              // 多肉植物卡片
              Stack() {
                Image('https://images.unsplash.com/photo-1446071103084-c257b5f70672')// 改用在线图片
                  .width('100%')
                  .height(160)
                  .borderRadius(8)
                  .objectFit(ImageFit.Cover) // 添加图片填充模式
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

              // 罗勒卡片
              Stack() {
                Image('https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb')
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

          // 浮动按钮
          Button({ type: ButtonType.Circle, stateEffect: true }) {
            Row() {
              Text('+')
                .fontSize(30)
                .fontWeight(FontWeight.Bold)
                .fontColor('#ffffff')
            }
            .width('100%')
            .justifyContent(FlexAlign.Center)
          }
          .width(56)
          .height(56)
          .backgroundColor('#16a34a')
          .position({ x: '80%', y: '85%' })
          .onClick(() => {
            router.pushUrl({
              url: 'pages/addPlant'  // 跳转到添加植物页面
            })
          })
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
              .height(24)
            Text(item)
              .fontSize(12)
              .fontColor(index === this.activeTab ? '#16a34a' : '#666666')
          }
          .onClick(() => {
            if (index === 1) {
              router.pushUrl({
                url: 'pages/renwu' // 修改为正确的路由路径
              })
            } else {
              this.activeTab = index
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
    .backgroundColor('#f8fafc')
  }
}

class RecommandClass {
  id:string='';
  imageSrc:ResourceStr = '';
  url:string='';

  constructor(id: string, imageSrc: ResourceStr, url: string) {
    this.id = id;
    this.imageSrc = imageSrc;
    this.url = url;
  }
}

@Preview
@Component
struct Recommand{
  @State RecommandList:Array<RecommandClass>=[
    new RecommandClass('pic0', $r('app.media.recommend_p1'),
      'https://ppbc.iplant.cn/tu/2079193'),
    new RecommandClass('pic1', $r('app.media.recommend_p2'),
      'https://ppbc.iplant.cn/tu/1039291'),
    new RecommandClass('pic2', $r('app.media.recommend_p3'),
      'https://ppbc.iplant.cn/tu/1237552'),
    new RecommandClass('pic3', $r('app.media.recommend_p4'),
      'https://ppbc.iplant.cn/tu/149948'),
    new RecommandClass('pic4', $r('app.media.recommend_p5'),
      'https://ppbc.iplant.cn/tu/20746313'),
    new RecommandClass('pic5', $r('app.media.recommend_p6'),
      'https://ppbc.iplant.cn/tu/1208382')
  ]
  build() {
    Swiper(){
      ForEach(this.RecommandList, (item: RecommandClass, index: number) => {
        Image(item.imageSrc)
          .objectFit(ImageFit.Contain)
          .width('100%')
          .padding({ top: 11, left: 16, right: 16 })
          .borderRadius(16)
      }, (item: RecommandClass, index: number) => item.id)
    }
    .autoPlay(true)
    .loop(true)
    .indicator(
      new DotIndicator()
        .color('#1a000000')
        .selectedColor('#0A59F7'))
  }
}
