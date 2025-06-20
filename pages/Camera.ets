import { camera, cameraPicker as picker } from '@kit.CameraKit'
import { fileIo, fileUri } from '@kit.CoreFileKit'
import router from '@ohos.router'

@Entry
@Component
struct Index {
  @State imgSrc: string = '';
  @State videoSrc: string = '';

  build() {
    Column() {
      // 顶部栏
      Row() {
        Image($r('app.media.back'))
          .width(24)
          .height(24)
          .onClick(() => {
            const params = router.getParams() as Record<string, string>
            if (params?.from === 'addPlant') {
              router.pushUrl({ url: 'pages/addPlant' })
            } else {
              router.back()
            }
          })

        Text('相机界面')
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor('#166534')

        // 添加一个占位view以保持标题居中
        Row().width(24)
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
          // 图片显示区域
          Column() {
            Text('拍摄的照片')
              .fontSize(16)
              .fontWeight(FontWeight.Medium)
              .fontColor('＃556B2F')
              .margin({ top: 8 })

            Image(this.imgSrc)
              .width('100%')
              .height(200)
              .backgroundColor(Color.Black)
              .margin(5)
              .borderRadius(8)
          }
          .width('90%')
          .padding(16)
          .backgroundColor('#ffffff')
          .borderRadius(16)
          .margin({ top: 16 })

          // 视频显示区域
          Column() {
            Text('拍摄的视频')
              .fontSize(16)
              .fontWeight(FontWeight.Medium)
              .fontColor('＃556B2F')
              .margin({ top: 8 })

            Video({ src: this.videoSrc })
              .width('100%')
              .height(200)
              .autoPlay(true)
              .margin(5)
              .borderRadius(8)
          }
          .width('90%')
          .padding(16)
          .backgroundColor('#ffffff')
          .borderRadius(16)
          .margin({ top: 16 })

          // 拍照和录像按钮
          Button("Test Picker Photo&Video")
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#16a34a')
            .fontColor('#ffffff')
            .width('80%')
            .padding(12)
            .borderRadius(8)
            .margin({ top: 16 })
            .onClick(async () => {
              let pathDir = getContext().filesDir;
              let fileName = `${new Date().getTime()}`
              let filePath = pathDir + `/${fileName}.tmp`
              fileIo.createRandomAccessFileSync(filePath, fileIo.OpenMode.CREATE);

              let uri = fileUri.getUriFromPath(filePath);
              let pickerProfile: picker.PickerProfile = {
                cameraPosition: camera.CameraPosition.CAMERA_POSITION_BACK,
                saveUri: uri
              };
              let result: picker.PickerResult =
                await picker.pick(getContext(), [picker.PickerMediaType.PHOTO, picker.PickerMediaType.VIDEO],
                  pickerProfile);
              console.info(`picker resultCode: ${result.resultCode},resultUri: ${result.resultUri},mediaType: ${result.mediaType}`);
              if (result.resultCode == 0) {
                if (result.mediaType === picker.PickerMediaType.PHOTO) {
                  this.imgSrc = result.resultUri;
                } else {
                  this.videoSrc = result.resultUri;
                }
              }
            })
        }
      }
      .scrollable(ScrollDirection.Vertical)
      .edgeEffect(EdgeEffect.Spring)
      .layoutWeight(1)

    }
  }
}