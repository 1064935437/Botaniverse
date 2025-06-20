import router from '@ohos.router'
import userStore from './userStore'
import promptAction from '@ohos.promptAction'  // 添加提示框组件

@Entry
@Component
struct WodePage {
  @State avatarUrl: string = '/images/default_avatar.png'
  @State nickname: string = userStore.getUsername() || '未设置昵称'
  @State description: string = '这个人很懒，什么都没写~'
  @State isNightMode: boolean = false
  @State activeTab: number = 3  // 修改初始值为3，表示"我的"页面
  @State isEditingName: boolean = false  // 添加编辑状态
  @State tempNickname: string = ''  // 临时存储编辑的昵称
  private tabItems: string[] = ['社区', '任务', '发现', '我的']

  @Builder MenuListItem(icon: Resource, title: string, arrow: boolean = true) {
    Row() {
      Row({ space: 12 }) {
        Image(icon)
          .width(24)
          .height(24)
        Text(title)
          .fontSize(16)
          .fontColor('#333333')
      }

      if (arrow) {
        Image($r('app.media.ic_arrow_right'))
          .width(20)
          .height(20)
          .fillColor('#999999')
      }
    }
    .width('100%')
    .height(56)
    .padding({ left: 16, right: 16 })
    .justifyContent(FlexAlign.SpaceBetween)
    .backgroundColor('#FFFFFF')
  }

  aboutToAppear() {
    // 每次页面显示时更新用户名
    this.nickname = userStore.getUsername() || '未设置昵称'
  }

  // 添加保存昵称的方法
  saveNickname() {
    if (this.tempNickname.trim() === '') {
      promptAction.showToast({ message: '昵称不能为空' })
      return
    }
    userStore.setUsername(this.tempNickname.trim())
    this.nickname = this.tempNickname.trim()
    this.isEditingName = false
    promptAction.showToast({ message: '昵称修改成功' })
  }

  build() {
    Stack() {
      Column() {
        // 顶部个人信息
        Stack() {
          // 背景图片
          Image('/images/profile_bg.jpg')
            .width('100%')
            .height(160)
            .objectFit(ImageFit.Cover)
            .blur(2)  // 添加背景模糊效果

          // 个人信息居中显示
          Column() {
            Image($r('app.media.avatar_default'))
              .width(100)
              .height(100)
              .borderRadius(50)
              .border({ width: 2, color: '#FFFFFF' })

            Text(this.nickname)
              .fontSize(16)
              .fontWeight(FontWeight.Medium)
              .fontColor('#333333')
              .margin({ top: 8 })
              .onClick(() => {
                this.tempNickname = this.nickname
                this.isEditingName = true
              })

            Text('ID: 12345678')
              .fontSize(14)
              .fontColor('#333333')
              .margin({ top: 4 })

            Text(this.description)
              .fontSize(12)
              .fontColor('#666666')
              .margin({ top: 4 })
          }
          .alignItems(HorizontalAlign.Center)
          .backgroundColor('#FFFFFF')
          .padding({ top: 20, bottom: 20 })
          .position({ x: '50%', y: '50%' })
          .translate({ x: '-50%', y: '-30%' })
        }
        .height(400)
        .backgroundColor('#FFFFFF')

        Scroll() {
          Column({ space: 8 }) {
            // 我的收藏
            Column() {
              this.MenuListItem($r('app.media.favorites'), '我的收藏')
            }
            .backgroundColor('#FFFFFF')
            .borderRadius(12)
            .margin({ top: 12 })
            .onClick(() => {
              router.pushUrl({
                url: 'pages/collect'
              })
            })

            // 消息通知
            Column() {
              this.MenuListItem($r('app.media.notification'), '消息通知')
            }
            .backgroundColor('#FFFFFF')
            .borderRadius(12)
            .margin({ top: 12 })
            .onClick(() => {
              router.pushUrl({
                url: 'pages/message'
              })
            })

            // 设置
            Column() {
              Row() {
                Row({ space: 12 }) {
                  Image($r('app.media.settings'))
                    .width(24)
                    .height(24)
                  Text('设置')
                    .fontSize(16)
                    .fontColor('#333333')
                }

                Image($r('app.media.ic_arrow_right'))
                  .width(20)
                  .height(20)
                  .fillColor('#999999')
              }
              .width('100%')
              .height(56)
              .padding({ left: 16, right: 16 })
              .justifyContent(FlexAlign.SpaceBetween)
              .backgroundColor('#FFFFFF')
              .onClick(() => {
                router.pushUrl({
                  url: 'pages/shezhi',
                  params: {
                    from: 'wode'
                  }
                })
              })
            }
            .backgroundColor('#FFFFFF')
            .borderRadius(12)
            .margin({ top: 12 })  // 只保留顶部边距
          }
          .padding({ bottom: 20 })
        }
        .width('100%')  // 确保宽度占满
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
              if (index === 0) {  // 社区
                router.pushUrl({
                  url: 'pages/shequ'
                })
              } else if (index === 1) {  // 任务
                router.pushUrl({
                  url: 'pages/renwu'
                })
              } else if (index === 2) {  // 发现
                router.pushUrl({
                  url: 'pages/faxian'
                })
              } else if (index === 3) {  // 我的
                this.activeTab = index  // 保持在我的页面
              }
            })
          })
        }
        .width('100%')
        .height(56)
        .backgroundColor('#ffffff')
        .justifyContent(FlexAlign.SpaceAround)
      }
      .width('100%')
      .height('100%')

      // 添加编辑昵称的对话框
      if (this.isEditingName) {
        Column() {
          Column() {
            Text('修改昵称')
              .fontSize(18)
              .fontWeight(FontWeight.Medium)
              .margin({ bottom: 16 })

            TextInput({ text: this.tempNickname })
              .width('100%')
              .height(40)
              .margin({ bottom: 20 })
              .onChange((value) => {
                this.tempNickname = value
              })

            Row() {
              Button('取消')
                .width(120)
                .backgroundColor('#F5F5F5')
                .fontColor('#333333')
                .onClick(() => {
                  this.isEditingName = false
                })
              Button('确定')
                .width(120)
                .onClick(() => {
                  this.saveNickname()
                })
            }
            .width('100%')
            .justifyContent(FlexAlign.SpaceAround)
          }
          .width('80%')
          .padding(20)
          .backgroundColor(Color.White)
          .borderRadius(12)
        }
        .width('100%')
        .height('100%')
        .backgroundColor('rgba(0,0,0,0.5)')
        .justifyContent(FlexAlign.Center)
      }
    }
    .backgroundColor('#f5f5f5')
  }
}