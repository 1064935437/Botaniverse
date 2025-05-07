import router from '@ohos.router'

class TaskItem {
  id: number
  icon: Resource
  title: string
  time: string
  plant: string
  plantImage: Resource
  completed: boolean

  constructor(id: number, icon: Resource, title: string, time: string, plant: string, plantImage: Resource, completed: boolean = false) {
    this.id = id
    this.icon = icon
    this.title = title
    this.time = time
    this.plant = plant
    this.plantImage = plantImage
    this.completed = completed
  }
}

@Entry
@Component
struct TaskPage {
  @State activeTab: number = 1
  @State selectedFilter: number = 0
  @State tasks: TaskItem[] = [
    new TaskItem(
      1,
      $r('app.media.water_icon'),
      '给多肉浇水',
      '今天 15:00',
      '多肉植物',
      $r('app.media.succulent')
    ),
    new TaskItem(
      2,
      $r('app.media.scissors_icon'),
      '修剪罗勒叶片',
      '明天 10:00',
      '罗勒',
      $r('app.media.basil')
    )
  ]

  readonly tabItems: string[] = ['首页', '任务', '社区', '我的']
  readonly filterItems: string[] = ['全部', '待办', '已完成', '已过期']

  build() {
    Column() {
      // 顶部栏
      Row() {
        Text('任务管理')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)

        Button() {
          Image($r('app.media.settings'))  // 将menu_icon改为settings
            .width(24)
            .height(24)
            .fillColor('#333333')
        }
        .backgroundColor('transparent')
        .onClick(() => {
          router.pushUrl({
            url: 'pages/shezhi',
            params: {
              from: 'task'  // 标记来源页面
            }
          })
        })
      }
      .width('100%')
      .justifyContent(FlexAlign.SpaceBetween)
      .padding({ left: 16, right: 16, top: 8, bottom: 8 })

      // 搜索栏
      Row() {
        Image($r('app.media.search_icon'))
          .width(20)
          .height(20)
          .fillColor('#666666')
        TextInput({ placeholder: '搜索任务或植物' })
          .backgroundColor('transparent')
          .placeholderColor('#999999')
          .fontSize(14)
          .margin({ left: 8 })
      }
      .width('90%')
      .padding(12)
      .backgroundColor('#f1f5f9')
      .borderRadius(8)
      .margin({ top: 16 })

      // 筛选标签
      Row() {
        ForEach(this.filterItems, (item: string, index: number) => {
          Text(item)
            .fontSize(14)
            .fontColor(this.selectedFilter === index ? '#ffffff' : '#666666')
            .backgroundColor(this.selectedFilter === index ? '#16a34a' : 'transparent')
            .padding({ left: 12, right: 12, top: 6, bottom: 6 })
            .borderRadius(16)
            .onClick(() => {
              this.selectedFilter = index
            })
        })
      }
      .width('90%')
      .margin({ top: 16, bottom: 16 })
      .justifyContent(FlexAlign.SpaceAround)

      // 任务列表
      List() {
        ForEach(this.tasks, (task: TaskItem) => {
          ListItem() {
            Row() {
              Row() {
                Image(task.icon)
                  .width(24)
                  .height(24)
                  .fillColor('#16a34a')
                  .margin({ right: 12 })

                Column() {
                  Text(task.title)
                    .fontSize(16)
                    .fontWeight(FontWeight.Medium)
                    .decoration({ type: task.completed ? TextDecorationType.LineThrough : TextDecorationType.None })
                    .fontColor(task.completed ? '#999999' : '#333333')
                  Text(task.time)
                    .fontSize(12)
                    .fontColor('#666666')
                    .margin({ top: 4 })
                  Row() {
                    Image(task.plantImage)
                      .width(24)
                      .height(24)
                      .borderRadius(12)
                    Text(task.plant)
                      .fontSize(12)
                      .fontColor('#666666')
                      .margin({ left: 8 })
                  }
                  .margin({ top: 8 })
                }
              }

              Checkbox({ name: task.id.toString(), group: 'tasks' })
                .select(task.completed)
                .selectedColor('#16a34a')
                .onChange((value: boolean) => {
                  task.completed = value
                })
            }
            .width('100%')
            .justifyContent(FlexAlign.SpaceBetween)
            .padding(16)
          }
          .backgroundColor(task.completed ? '#f3f4f6' : '#ffffff')  // 完成时变灰
          .opacity(task.completed ? 0.8 : 1)  // 降低透明度增强灰色效果
          .borderRadius(12)
          .margin({ bottom: 12 })
        })
      }
      .width('90%')

      // 浮动按钮
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
          url: 'pages/addPlant',
          params: {
            from: 'task'
          }
        })
      })

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
            if (index === 0) {
              router.pushUrl({
                url: 'pages/zhuye', // 修改为正确的路由路径
                params: { // 可以传递参数
                  from: 'task'
                }
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
    .height('100%')
    .backgroundColor('#f8fafc')
  }
}
