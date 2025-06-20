import router from '@ohos.router'
import picker from '@ohos.file.picker'
import common from '@ohos.app.ability.common'

// 添加新帖子数据接口
interface NewPostData {
  content: string
  images: string[]
  location: string
}

// 添加路由参数接口
interface RouterParams {
  newPost: NewPostData
}

@Entry
@Component
struct EditPost {
  @State content: string = ''
  @State selectedImages: Array<string> = []
  @State location: string = ''
  @State isPublic: boolean = true
  private maxImageCount: number = 9
  private context = getContext(this) as common.UIAbilityContext

  build() {
    Column() {
      // 顶部导航栏
      Row() {
        Image($r('app.media.ic_back'))
          .width(24)
          .height(24)
          .onClick(() => {
            router.back()
          })
        Text('发布动态')
          .fontSize(18)
          .fontWeight(FontWeight.Medium)
        Button('发布')
          .fontSize(16)
          .fontColor('#16A34A')
          .backgroundColor(0x00000000)
          .onClick(() => {
            this.publishPost()
          })
      }
      .width('100%')
      .padding({ left: 16, right: 16 })
      .height(56)
      .justifyContent(FlexAlign.SpaceBetween)
      .alignItems(VerticalAlign.Center)
      .backgroundColor(Color.White)

      Scroll() {
        Column() {
          // 文本输入区
          TextArea({ placeholder: '分享此刻的想法...' })
            .height(200)
            .fontSize(16)
            .backgroundColor(Color.White)
            .margin({ top: -120 })
            .onChange((value: string) => {
              this.content = value
            })

          // 图片选择网格
          Grid() {
            ForEach(this.selectedImages, (image: string, index?: number) => {
              GridItem() {
                Stack() {
                  Image(image)
                    .width('100%')
                    .height('100%')
                    .borderRadius(8)
                    .objectFit(ImageFit.Cover)

                  Image($r('app.media.ic_delete'))
                    .width(20)
                    .height(20)
                    .position({ x: '85%', y: '5%' })
                    .onClick(() => {
                      if (index !== undefined) {
                        this.removeImage(index)
                      }
                    })
                }
              }
            })

            if (this.selectedImages.length < this.maxImageCount) {
              GridItem() {
                Column() {
                  Image($r('app.media.ic_add_photo'))
                    .width(32)
                    .height(32)
                  Text('添加图片')
                    .fontSize(12)
                    .margin({ top: 4 })
                }
                .width('100%')
                .height('100%')
                .justifyContent(FlexAlign.Center)
                .backgroundColor('#F5F5F5')
                .borderRadius(8)
                .onClick(() => {
                  this.selectImages()
                })
              }
            }
          }
          .columnsTemplate('1fr 1fr 1fr')
          .rowsGap(8)
          .columnsGap(8)
          .padding(16)
          .height(240)

          // 底部功能区
          Column() {
            Row() {
              Image($r('app.media.ic_location'))
                .width(24)
                .height(24)
              Text(this.location || '所在位置')
                .fontSize(14)
                .margin({ left: 8 })
            }
            .width('100%')
            .padding(16)
            .onClick(() => {
              this.selectLocation()
            })

            Divider().color('#F0F0F0')

            Row() {
              Text('谁可以看')
                .fontSize(14)
              Row() {
                Text(this.isPublic ? '公开' : '仅自己可见')
                  .fontSize(14)
                  .fontColor('#666666')
                Image($r('app.media.ic_arrow_right'))
                  .width(16)
                  .height(16)
                  .margin({ left: 4 })
              }
            }
            .width('100%')
            .padding(16)
            .justifyContent(FlexAlign.SpaceBetween)
            .onClick(() => {
              this.showPrivacySelector()
            })
          }
          .backgroundColor(Color.White)
          .margin({ top: 12 })
        }
      }
      .layoutWeight(1)
      .backgroundColor('#F5F5F5')
    }
  }

  async selectImages() {
    try {
      let photoPickerObj: picker.PhotoViewPicker = new picker.PhotoViewPicker();
      let photoResult: picker.PhotoSelectResult = await photoPickerObj.select({
        MIMEType: picker.PhotoViewMIMETypes.IMAGE_TYPE,
        maxSelectNumber: this.maxImageCount - this.selectedImages.length
      });
      if (photoResult && photoResult.photoUris) {
        this.selectedImages = this.selectedImages.concat(photoResult.photoUris);
      }
    } catch (err) {
      console.error(`选择图片失败: ${err.message}`);
    }
  }

  removeImage(index: number) {
    this.selectedImages = this.selectedImages.filter((_, i) => i !== index)
  }

  selectLocation() {
    // TODO: 实现位置选择功能
  }

  showPrivacySelector() {
    // TODO: 实现隐私设置
  }

  publishPost() {
    if (this.content.trim() !== '' || this.selectedImages.length > 0) {
      // 构建符合接口的新帖子数据
      const newPost: NewPostData = {
        content: this.content,
        images: this.selectedImages,
        location: this.location
      }

      // 构造符合接口的路由参数
      const params: RouterParams = {
        newPost: newPost
      }

      router.replaceUrl({
        url: 'pages/shequ',
        params: params
      })
    } else {
      console.info('发布内容不能为空')
    }
  }
}


