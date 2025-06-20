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

interface NewTaskParams {
  title: string
  time: string
  plant: string
  icon?: Resource
  plantImage?: Resource
}

interface RouterParams {
  newTask?: NewTaskParams;
}

interface AddPlantParams {
  from: string
}

@Entry
@Component
struct TaskPage {
  @State activeTab: number = 1
  @State selectedFilter: number = 0
  @State isManageMode: boolean = false
  @State selectedTasks: Set<number> = new Set()
  @State tasks: TaskItem[] = [
    new TaskItem(
      1,
      $r('app.media.water_icon'),
      '给多肉浇水',
      '2024-06-16 15:00',
      '多肉植物',
      $r('app.media.succulent')
    ),
    new TaskItem(
      2,
      $r('app.media.scissors_icon'),
      '修剪罗勒叶片',
      '2024-06-17 10:00',
      '罗勒',
      $r('app.media.basil')
    )
  ]

  aboutToAppear() {
    try {
      const params = router.getParams() as RouterParams
      if (params?.newTask) {
        const newTask: NewTaskParams = params.newTask
        this.tasks = [...this.tasks, new TaskItem(
          this.tasks.length + 1,
          newTask.icon ?? $r('app.media.water_icon'),
          newTask.title,
          newTask.time,
          newTask.plant,
          newTask.plantImage ?? $r('app.media.succulent'),
          false
        )]
      }
    } catch (error) {
      console.error('添加任务失败:', error)
    }
  }

  readonly tabItems: string[] = ['社区', '任务', '发现', '我的']
  readonly filterItems: string[] = ['全部', '待办', '已完成', '已过期']

  getFilteredTasks(): TaskItem[] {
    const now = new Date()

    switch (this.selectedFilter) {
      case 0: // 全部
        return this.tasks
      case 1: // 待办
        return this.tasks.filter(task => !task.completed && new Date(task.time) >= now)
      case 2: // 已完成
        return this.tasks.filter(task => task.completed)
      case 3: // 已过期
        return this.tasks.filter(task => !task.completed && new Date(task.time) < now)
      default:
        return this.tasks
    }
  }

  @Builder
  TaskContent(task: TaskItem) {
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
          .fontColor(new Date(task.time) < new Date() && !task.completed ? '#ef4444' : '#666666')
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
  }

  build() {
    Column() {
      // 顶部栏
      Row() {
        Text('任务')
          .fontSize(28)
          .fontWeight(FontWeight.Bold)

        Button() {
          Text(this.isManageMode ? '完成' : '管理')
            .fontSize(16)
            .fontWeight(FontWeight.Normal)
            .fontColor('#666666')
        }
        .backgroundColor('transparent')
        .onClick(() => {
          this.isManageMode = !this.isManageMode
          if (!this.isManageMode) {
            this.selectedTasks.clear()
          }
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
        ForEach(this.getFilteredTasks(), (task: TaskItem) => {
          ListItem() {
            Row() {
              if (this.isManageMode) {
                Checkbox()
                  .select(this.selectedTasks.has(task.id))
                  .selectedColor('#16a34a')
                  .margin({ right: 12 })
                  .onChange((value: boolean) => {
                    if (value) {
                      this.selectedTasks.add(task.id)
                    } else {
                      this.selectedTasks.delete(task.id)
                    }
                  })
              }

              // 修改这里：删除 TaskContent 上的 layoutWeight
              this.TaskContent(task)

              if (!this.isManageMode) {
                Checkbox({ name: task.id.toString(), group: 'tasks' })
                  .select(task.completed)
                  .selectedColor('#16a34a')
                  .onChange((value: boolean) => {
                    task.completed = value
                    this.tasks = [...this.tasks]
                  })
              }
            }
            .width('100%')
            .justifyContent(FlexAlign.SpaceBetween)
            .padding(16)
          }
          .backgroundColor(task.completed ? '#f3f4f6' : '#ffffff')
          .opacity(task.completed ? 0.8 : 1)
          .borderRadius(12)
          .margin({ bottom: 12 })
        })
      }
      .width('90%')
      .height('100%') // 使用固定高度替代 layoutWeight

      // 管理模式下的底部操作栏
      if (this.isManageMode) {
        Row() {
          Row() {
            Checkbox()
              .select(this.selectedTasks.size === this.tasks.length)
              .selectedColor('#16a34a')
              .onChange((value: boolean) => {
                if (value) {
                  this.tasks.forEach(task => this.selectedTasks.add(task.id))
                } else {
                  this.selectedTasks.clear()
                }
              })
            Text('全选')
              .fontSize(14)
              .fontColor('#666666')
              .margin({ left: 8 })
          }

          Row() {
            Button('完成选中')
              .backgroundColor('#16a34a')
              .fontSize(14)
              .height(32)
              .margin({ right: 12 })
              .onClick(() => {
                this.tasks = this.tasks.map(task => {
                  if (this.selectedTasks.has(task.id)) {
                    task.completed = true
                  }
                  return task
                })
                this.selectedTasks.clear()
              })

            Button('删除')
              .backgroundColor('#ef4444')
              .fontSize(14)
              .height(32)
              .onClick(() => {
                this.tasks = this.tasks.filter(task =>
                !this.selectedTasks.has(task.id)
                )
                this.selectedTasks.clear()
              })
          }
        }
        .width('100%')
        .height(50)
        .padding({ left: 16, right: 16 })
        .backgroundColor('#ffffff')
        .justifyContent(FlexAlign.SpaceBetween)
        .position({ y: '93%' })
      }

      // 浮动添加按钮
      if (!this.isManageMode) {
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
          const params: AddPlantParams = {
            from: 'task'
          }
          router.pushUrl({
            url: 'pages/addPlant',
            params: params
          })
        })
      }

      // 底部导航栏
      if (!this.isManageMode) {
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
                this.activeTab = index
              } else if (index === 2) {
                router.pushUrl({ url: 'pages/faxian' })
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
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#f8fafc')
  }
}