import router from '@ohos.router'

// 添加任务数据接口
interface TaskData {
  title: string
  plant: string
  time: string
  icon: Resource
  plantImage: Resource | string
}

// 添加路由参数接口
interface RouterParams {
  newTask: TaskData
}

@Entry
@Component
struct AddPlantPage {
  @State plantImage: string = ''
  @State plantName: string = ''
  @State plantType: string = ''
  @State growthDays: number = 7
  @State wateringFrequency: string = '每天一次'
  @State lightRequirement: string = '充足阳光'
  @State notes: string = ''

  // 添加任务相关状态变量
  @State taskTitle: string = ''
  @State taskTime: string = ''

  build() {
    Column() {
      // 顶部栏
      Row() {
        Image($r('app.media.back'))
          .width(24)
          .height(24)
          .onClick(() => {
            const params = router.getParams() as Record<string, string>
            if (params?.from === 'task') {
              router.pushUrl({ url: 'pages/renwu' })
            } else {
              router.back()
            }
          })
        Text('添加植物')
          .fontSize(20)
          .fontWeight(FontWeight.Medium)
      }
      .width('100%')
      .padding({
        left: 16,
        right: 16,
        top: 8,
        bottom: 8
      })
      .justifyContent(FlexAlign.Start)

      // 将整个内容区域放入滚动容器
      Scroll() {
        Column() {
          // 图片上传区域
          Column() {
            if (this.plantImage === '') {
              Column() {
                Image($r('app.media.camera'))
                  .width(40)
                  .height(40)
                Text('点击上传植物图片')
                  .fontSize(14)
                  .margin({ top: 8 })
                  .fontColor('#666666')
              }
              .width('100%')
              .height('100%')
              .justifyContent(FlexAlign.Center)
              .alignItems(HorizontalAlign.Center)
            } else {
              Image(this.plantImage)
                .width('100%')
                .height(200)
                .borderRadius(8)
                .objectFit(ImageFit.Cover)
            }
          }
          .width('100%')
          .height(200)
          .backgroundColor('#f3f4f6')
          .borderRadius(8)
          .margin({ top: 16 })
          .onClick(() => {
            router.pushUrl({
              url: 'pages/Camera',
              params: {
                from: 'addPlant'
              }
            })
          })

          // 植物信息表单
          TextInput({ placeholder: '请输入植物名称' })
            .width('100%')
            .height(48)
            .margin({ top: 16 })
            .onChange((value: string) => {
              this.plantName = value
            })

          Select([
            { value: '多肉植物' },
            { value: '观叶植物' },
            { value: '草本植物' }
          ])
            .width('100%')
            .margin({ top: 16 })
            .selected(0)
            .onSelect((index: number) => {
              this.plantType = index.toString()
            })

          // 生长周期滑块
          Text('生长周期（天）')
            .fontSize(14)
            .margin({ top: 16 })
          Slider({
            min: 7,
            max: 365,
            step: 1,
            value: this.growthDays
          })
            .width('100%')
            .onChange((value: number) => {
              this.growthDays = value
            })
          Row() {
            Text('7天')
              .fontSize(12)
              .fontColor('#666666')
            Text('365天')
              .fontSize(12)
              .fontColor('#666666')
          }
          .width('100%')
          .justifyContent(FlexAlign.SpaceBetween)

          // 浇水频率
          Row() {
            Radio({ value: '每天一次', group: 'watering' })
              .checked(true)
              .onChange((value: boolean) => {
                if (value) this.wateringFrequency = '每天一次'
              })
            Text('每天一次').fontSize(14)

            Radio({ value: '每周2-3次', group: 'watering' })
              .onChange((value: boolean) => {
                if (value) this.wateringFrequency = '每周2-3次'
              })
            Text('每周2-3次').fontSize(14)

            Radio({ value: '每周一次', group: 'watering' })
              .onChange((value: boolean) => {
                if (value) this.wateringFrequency = '每周一次'
              })
            Text('每周一次').fontSize(14)
          }
          .width('100%')
          .margin({ top: 16 })
          .justifyContent(FlexAlign.SpaceBetween)

          // 光照需求
          Row() {
            Radio({ value: '充足阳光', group: 'light' })
              .checked(true)
              .onChange((value: boolean) => {
                if (value) this.lightRequirement = '充足阳光'
              })
            Text('充足阳光').fontSize(14)

            Radio({ value: '散射光', group: 'light' })
              .onChange((value: boolean) => {
                if (value) this.lightRequirement = '散射光'
              })
            Text('散射光').fontSize(14)

            Radio({ value: '阴凉', group: 'light' })
              .onChange((value: boolean) => {
                if (value) this.lightRequirement = '阴凉'
              })
            Text('阴凉').fontSize(14)
          }
          .width('100%')
          .margin({ top: 16 })
          .justifyContent(FlexAlign.SpaceBetween)

          // 备注信息
          TextArea({ placeholder: '备注信息（选填）' })
            .width('100%')
            .height(100)
            .margin({ top: 16 })
            .onChange((value: string) => {
              this.notes = value
            })

          // 提交按钮
          Button('确认添加')
            .width('100%')
            .height(48)
            .margin({ top: 24, bottom: 24 })
            .backgroundColor('#16a34a')
            .onClick(() => {
              // 使用接口定义构造任务数据
              const taskData: TaskData = {
                title: `给${this.plantName}${this.wateringFrequency}浇水`,
                plant: this.plantName,
                time: '今天 ' + new Date().getHours() + ':00',
                icon: $r('app.media.water_icon'),
                plantImage: this.plantImage ? this.plantImage : $r('app.media.succulent')
              }

              // 构造符合接口的路由参数
              const routerParams: RouterParams = {
                newTask: taskData
              }

              router.replaceUrl({
                url: 'pages/renwu',
                params: routerParams
              })
            })
        }
        .padding(16)
        .width('100%')
      }
      .scrollable(ScrollDirection.Vertical)
      .edgeEffect(EdgeEffect.Spring)
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#ffffff')
  }
}
