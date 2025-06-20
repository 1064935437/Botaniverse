import { webview } from '@kit.ArkWeb';
import { BusinessError } from '@kit.BasicServicesKit';
import connection from '@ohos.net.connection';

@Entry
@Component
struct SplineModelViewer {
  private controller: webview.WebviewController = new webview.WebviewController();
  @State loading: boolean = true;
  @State errorOccurred: boolean = false;
  @State private timerId: number = -1;
  private modelTitle: string = "3D模型展示";
  private modelDescription: string = "使用Spline创建的交互式3D模型";

  aboutToDisappear() {
    if (this.timerId !== -1) {
      clearTimeout(this.timerId);
    }
  }

  aboutToAppear() {
    let netManager = connection.createNetConnection();
    netManager.on('netAvailable', () => {  // 修改为正确的事件类型
      this.errorOccurred = false;
    })
    netManager.on('netUnavailable', () => {  // 修改为正确的事件类型
      this.errorOccurred = true;
    })
  }

  build() {
    Column() {
      Stack() {
        Web({
          src: "https://my.spline.design/untitled-jHi9ToEmm0PMRf95tQjcbztA/",
          controller: this.controller
        })
          .width('100%')
          .height('100%')
          .javaScriptAccess(true)
          .domStorageAccess(true)
          .fileAccess(true)
          .cacheMode(1)  // 修改为数字类型
          .userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")
          .onPageBegin(() => {
            console.info("开始加载页面");
            this.loading = true;
            this.errorOccurred = false;

            if (this.timerId !== -1) {
              clearTimeout(this.timerId);
            }

            const timer: number = setTimeout(() => {
              if (this.loading) {
                this.loading = false;
                this.errorOccurred = true;
                console.error("加载超时，请检查网络连接");
                this.controller.refresh();
              }
            }, 5000) as number;

            this.timerId = timer;
          })
          .onPageEnd(() => {
            console.info("页面加载完成");
            this.loading = false;
            if (this.timerId !== -1) {
              clearTimeout(this.timerId);
              this.timerId = -1;
            }
          })
          .onErrorReceive((event) => {
            console.error(`加载错误: ${JSON.stringify(event)}`);
            this.loading = false;
            this.errorOccurred = true;
            if (this.timerId !== -1) {
              clearTimeout(this.timerId);
              this.timerId = -1;
            }
            setTimeout(() => {
              this.controller.refresh();
            }, 3000);
          })

        if (this.loading) {
          Column() {
            LoadingProgress()
              .width(60)
              .height(60)
              .margin({ bottom: 16 })
            Text("加载模型中...")
              .fontSize(16)
              .fontColor("#7f8c8d")
          }
          .width('100%')
          .height('100%')
          .justifyContent(FlexAlign.Center)
          .backgroundColor("#ffffff")
          .opacity(0.9)
        }

        if (this.errorOccurred) {
          Column() {
            Text("网络连接失败")
              .fontSize(36)
              .fontColor("#e74c3c")
            Text("请检查网络设置后重试")
              .fontSize(18)
              .fontColor("#e74c3c")
              .margin({ bottom: 8 })
            Button("重新加载")
              .width(120)
              .margin({ top: 20 })
              .onClick(() => {
                this.controller.refresh();
                this.loading = true;
                this.errorOccurred = false;
              })
          }
          .width('100%')
          .height('100%')
          .justifyContent(FlexAlign.Center)
          .backgroundColor("#ffffff")
        }
      }
      .layoutWeight(1)
      .margin(16)
      .borderRadius(16)
      .backgroundColor("#f5f5f5")

      Row() {
        Button("旋转视图")
          .layoutWeight(1)
          .height(40)
          .backgroundColor("#3498db")
          .fontColor(Color.White)
          .onClick(() => {
            this.executeJavaScript("document.querySelector('canvas').dispatchEvent(new MouseEvent('mousedown', {buttons: 1}));");
          })

        Button("重置视图")
          .layoutWeight(1)
          .height(40)
          .margin({ left: 10 })
          .backgroundColor("#2ecc71")
          .fontColor(Color.White)
          .onClick(() => {
            this.executeJavaScript("window.location.reload();");
          })
      }
      .width('100%')
      .padding({ left: 16, right: 16, bottom: 16 })
    }
    .width('100%')
    .height('100%')
    .backgroundColor("#f0f2f5")
  }

  private executeJavaScript(script: string) {
    try {
      this.controller.runJavaScript(script, (error, result) => {
        if (error) {
          console.error(`run JavaScript error: ${JSON.stringify(error)}`);
          return;
        }
        console.info(`run JavaScript result: ${result}`);
      });
    } catch (error) {
      console.error(`Error running JavaScript, code: ${(error as BusinessError).code}, message: ${(error as BusinessError).message}`);
    }
  }
}