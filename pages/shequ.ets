import router from '@ohos.router'

// 定义帖子类型接口
interface Post {
  avatar: Resource
  userName: string
  postDate: string
  title: string
  content: string
  images: Resource[]
  likes: number
  comments: number
  collections: number
}

// 修改新帖子参数接口
interface NewPost {
  content: string
  images: Resource[]  // 改为 Resource 类型
  location?: string
}

interface RouterParams {
  newPost?: NewPost
}

@Entry
@Component
struct ShequPage {  // 修改组件名称
  // 副标题导航数据
  private subNavItems: string[] = ['推荐', '热门', '关注', '最新']
  @State currentSubNav: number = 0

  // 底部导航数据
  private tabItems: string[] = ['社区', '任务', '发现', '我的']
  @State activeTab: number = 0  // 确保在社区页时为0

  // 社区帖子数据
  private posts: Post[] = [
    {
      avatar: $r('app.media.user1'),
      userName: '绿色农场主',
      postDate: '2024-03-20',
      title: '春季蔬菜种植技巧分享',
      content: '今天给大家分享一下春季蔬菜种植的一些经验，希望对大家有帮助...',
      images: [$r('app.media.post1_1'), $r('app.media.post1_2')],
      likes: 128,
      comments: 32,
      collections: 45
    },
    {
      avatar: $r('app.media.user2'),
      userName: '田园达人',
      postDate: '2024-03-19',
      title: '防治小麦赤霉病经验',
      content: '最近天气多变，小麦容易染上赤霉病，分享一下我的防治方法...',
      images: [$r('app.media.post2_1')],
      likes: 256,
      comments: 64,
      collections: 89
    }
  ]

  aboutToAppear() {
    try {
      const params = router.getParams() as RouterParams
      if (params?.newPost) {
        const now = new Date()
        // 添加新帖子到列表开头
        this.posts.unshift({
          avatar: $r('app.media.user1'),  // 使用默认头像
          userName: '我的账号',  // 可以替换为实际用户名
          postDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
          title: '',  // 可选标题
          content: params.newPost.content,
          images: params.newPost.images, // 直接使用 Resource 数组
          likes: 0,
          comments: 0,
          collections: 0
        })
      }
    } catch (error) {
      console.error('添加新帖子失败:', error)
    }
  }

  build() {
    Stack({ alignContent: Alignment.Bottom }) {
      Column() {
        // 顶部搜索栏
        Row() {
          // 搜索框
          Row() {
            Image($r('app.media.ic_search'))
              .width(20)
              .height(20)
            TextInput({ placeholder: '搜索帖子内容...' })
              .width('100%')
              .height(36)
              .backgroundColor('#f5f5f5')
              .margin({ left: 8 })
              .placeholderColor('#999999')
          }
          .layoutWeight(1)
          .padding({ left: 12, right: 12 })
          .height(36)
          .borderRadius(18)
          .backgroundColor('#f5f5f5')

          // AI问答按钮
          Button('AI问答')
            .height(36)
            .fontSize(14)
            .fontColor('#16a34a')
            .backgroundColor(0x00000000)
            .margin({ left: 12 })
            .onClick(() => {
              router.pushUrl({
                url: 'pages/AIxunfei'
              })
            })
        }
        .width('100%')
        .padding(16)
        .backgroundColor('#ffffff')

        // 副标题导航
        Row() {
          ForEach(this.subNavItems, (item: string, index: number) => {
            Text(item)
              .fontSize(14)
              .fontWeight(this.currentSubNav === index ? FontWeight.Bold : FontWeight.Normal)
              .fontColor(this.currentSubNav === index ? '#16a34a' : '#666666')
              .margin({ right: 20 })
              .onClick(() => {
                this.currentSubNav = index
              })
          })
        }
        .width('100%')
        .padding(16)
        .backgroundColor('#ffffff')

        // 社区帖子列表
        List() {
          ForEach(this.posts, (post: Post) => {
            ListItem() {
              Column() {
                // 用户信息行
                Row() {
                  Image(post.avatar)
                    .width(40)
                    .height(40)
                    .borderRadius(20)
                  Column() {
                    Text(post.userName)
                      .fontSize(16)
                      .fontWeight(FontWeight.Medium)
                    Text(post.postDate)
                      .fontSize(12)
                      .fontColor('#999999')
                  }
                  .alignItems(HorizontalAlign.Start)
                  .margin({ left: 12 })
                }
                .width('100%')
                .padding({ top: 12, bottom: 12 })

                // 帖子内容
                Text(post.title)
                  .fontSize(18)
                  .fontWeight(FontWeight.Bold)
                  .margin({ bottom: 8 })
                  .alignSelf(ItemAlign.Start)

                Text(post.content)
                  .fontSize(14)
                  .margin({ bottom: 12 })

                // 图片网格
                Grid() {
                  ForEach(post.images, (image: Resource) => {
                    GridItem() {
                      Image(image)
                        .width('100%')
                        .height(100)
                        .borderRadius(8)
                    }
                  })
                }
                .columnsTemplate('1fr 1fr 1fr')
                .columnsGap(8)
                .rowsGap(8)
                .margin({ bottom: 12 })

                // 互动数据行
                Row() {
                  Row() {
                    Image($r('app.media.ic_like'))
                      .width(16)
                      .height(16)
                    Text(post.likes.toString())
                      .fontSize(14)
                      .margin({ left: 4 })
                  }
                  Row() {
                    Image($r('app.media.ic_comment'))
                      .width(16)
                      .height(16)
                    Text(post.comments.toString())
                      .fontSize(14)
                      .margin({ left: 4 })
                  }
                  .margin({ left: 16 })
                  Row() {
                    Image($r('app.media.ic_collect'))
                      .width(16)
                      .height(16)
                    Text(post.collections.toString())
                      .fontSize(14)
                      .margin({ left: 4 })
                  }
                  .margin({ left: 16 })
                }
                .width('100%')
              }
              .padding(16)
              .backgroundColor('#ffffff')
              .borderRadius(8)
              .margin({ bottom: 8 })
            }
          })
        }
        .width('100%')
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
                this.activeTab = index  // 保持在社区页面
              } else if (index === 1) {  // 任务
                router.pushUrl({
                  url: 'pages/renwu'
                })
              } else if (index === 2) {  // 发现
                router.pushUrl({
                  url: 'pages/faxian'
                })
              } else if (index === 3) {  // 我的
                router.pushUrl({
                  url: 'pages/wode'
                })
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

      // 悬浮发布按钮
      Button({ type: ButtonType.Circle }) {
        Text('+')
          .fontSize(30)
          .fontWeight(FontWeight.Bold)
          .fontColor('#ffffff')
      }
      .width(56)
      .height(56)
      .backgroundColor('#16a34a')
      .position({ x: '80%', y: '85%' })
      .onClick(() => {
        router.pushUrl({
          url: 'pages/riji'
        })
      })
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#f5f5f5')
  }
}