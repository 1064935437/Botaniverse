import router from '@ohos.router';

@Entry
@Component
struct VersionInfoPage {
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
        Text('关于植境')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
          .margin({ left: 16 })
      }
      .width('100%')
      .height(56)
      .padding({ left: 16 })
      .backgroundColor('#FFFFFF')
      .alignItems(VerticalAlign.Center)

      Scroll() {
        Column() {
          // App Logo
          Image($r('app.media.logo'))
            .width(120)
            .height(120)
            .margin({ top: 32, bottom: 16 })

          // App 名称和版本号
          Text('植境')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .margin({ bottom: 8 })

          Text('Version 1.0.0')
            .fontSize(16)
            .fontColor('#666666')
            .margin({ bottom: 32 })

          // 更新日志
          Column() {
            Text('更新日志')
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .width('100%')
              .padding({ left: 16, top: 16, bottom: 12 })
              .backgroundColor('#F5F7FA')

            Column() {
              this.UpdateItem('2025.06.12', [
                '新增智能植物识别功能',
                '优化养护提醒系统',
                '增加社区互动功能',
                '界面视觉升级'
              ])

              this.UpdateItem('2025.05.15', [
                '首次发布',
                '植物图鉴功能',
                '基础养护指南',
                '天气提醒功能'
              ])
            }
            .padding(16)
            .backgroundColor('#FFFFFF')
          }
          .margin({ bottom: 16 })

          // 开发者信息
          Column() {
            Text('开发者信息')
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .width('100%')
              .padding({ left: 16, top: 16, bottom: 12 })
              .backgroundColor('#F5F7FA')

            Column() {
              this.InfoItem('开发团队', '植境科技')
              this.InfoItem('联系邮箱', 'support@zhijing.com')
              this.InfoItem('官方网站', 'www.zhijing.com')
              this.InfoItem('企业地址', '深圳市南山区科技园')
            }
            .padding(16)
            .backgroundColor('#FFFFFF')
          }
        }
        .width('100%')
      }
      .layoutWeight(1)
      .scrollable(ScrollDirection.Vertical)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#F5F7FA')
  }

  @Builder
  InfoItem(title: string, content: string) {
    Row() {
      Text(title)
        .fontSize(16)
        .fontColor('#333333')
      Text(content)
        .fontSize(16)
        .fontColor('#666666')
    }
    .width('100%')
    .justifyContent(FlexAlign.SpaceBetween)
    .padding({ top: 8, bottom: 8 })
  }

  @Builder
  UpdateItem(date: string, updates: string[]) {
    Column() {
      Text(date)
        .fontSize(16)
        .fontWeight(FontWeight.Medium)
        .margin({ bottom: 8 })

      ForEach(updates, (item: string) => {
        Row() {
          Text('•')
            .fontSize(14)
            .fontColor('#666666')
            .margin({ right: 8 })
          Text(item)
            .fontSize(14)
            .fontColor('#666666')
        }
        .alignItems(VerticalAlign.Top)
        .margin({ bottom: 4 })
      })
    }
    .alignItems(HorizontalAlign.Start)
    .margin({ bottom: 16 })
  }
}