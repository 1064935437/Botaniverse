if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SplineModelViewer_Params {
    controller?: webview.WebviewController;
    loading?: boolean;
    errorOccurred?: boolean;
    timerId?: number;
    modelTitle?: string;
    modelDescription?: string;
}
import webview from "@ohos:web.webview";
import type { BusinessError } from "@ohos:base";
import connection from "@ohos:net.connection";
class SplineModelViewer extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = new webview.WebviewController();
        this.__loading = new ObservedPropertySimplePU(true, this, "loading");
        this.__errorOccurred = new ObservedPropertySimplePU(false, this, "errorOccurred");
        this.__timerId = new ObservedPropertySimplePU(-1, this, "timerId");
        this.modelTitle = "3D模型展示";
        this.modelDescription = "使用Spline创建的交互式3D模型";
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SplineModelViewer_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.loading !== undefined) {
            this.loading = params.loading;
        }
        if (params.errorOccurred !== undefined) {
            this.errorOccurred = params.errorOccurred;
        }
        if (params.timerId !== undefined) {
            this.timerId = params.timerId;
        }
        if (params.modelTitle !== undefined) {
            this.modelTitle = params.modelTitle;
        }
        if (params.modelDescription !== undefined) {
            this.modelDescription = params.modelDescription;
        }
    }
    updateStateVars(params: SplineModelViewer_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__loading.purgeDependencyOnElmtId(rmElmtId);
        this.__errorOccurred.purgeDependencyOnElmtId(rmElmtId);
        this.__timerId.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__loading.aboutToBeDeleted();
        this.__errorOccurred.aboutToBeDeleted();
        this.__timerId.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller: webview.WebviewController;
    private __loading: ObservedPropertySimplePU<boolean>;
    get loading() {
        return this.__loading.get();
    }
    set loading(newValue: boolean) {
        this.__loading.set(newValue);
    }
    private __errorOccurred: ObservedPropertySimplePU<boolean>;
    get errorOccurred() {
        return this.__errorOccurred.get();
    }
    set errorOccurred(newValue: boolean) {
        this.__errorOccurred.set(newValue);
    }
    private __timerId: ObservedPropertySimplePU<number>;
    get timerId() {
        return this.__timerId.get();
    }
    set timerId(newValue: number) {
        this.__timerId.set(newValue);
    }
    private modelTitle: string;
    private modelDescription: string;
    aboutToDisappear() {
        if (this.timerId !== -1) {
            clearTimeout(this.timerId);
        }
    }
    aboutToAppear() {
        let netManager = connection.createNetConnection();
        netManager.on('netAvailable', () => {
            this.errorOccurred = false;
        });
        netManager.on('netUnavailable', () => {
            this.errorOccurred = true;
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor("#f0f2f5");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.layoutWeight(1);
            Stack.margin(16);
            Stack.borderRadius(16);
            Stack.backgroundColor("#f5f5f5");
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Web.create({
                src: "https://my.spline.design/untitled-jHi9ToEmm0PMRf95tQjcbztA/",
                controller: this.controller
            });
            Web.width('100%');
            Web.height('100%');
            Web.javaScriptAccess(true);
            Web.domStorageAccess(true);
            Web.fileAccess(true);
            Web.cacheMode(1);
            Web.userAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36");
            Web.onPageBegin(() => {
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
            });
            Web.onPageEnd(() => {
                console.info("页面加载完成");
                this.loading = false;
                if (this.timerId !== -1) {
                    clearTimeout(this.timerId);
                    this.timerId = -1;
                }
            });
            Web.onErrorReceive((event) => {
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
            });
        }, Web);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.loading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height('100%');
                        Column.justifyContent(FlexAlign.Center);
                        Column.backgroundColor("#ffffff");
                        Column.opacity(0.9);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.width(60);
                        LoadingProgress.height(60);
                        LoadingProgress.margin({ bottom: 16 });
                    }, LoadingProgress);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("加载模型中...");
                        Text.fontSize(16);
                        Text.fontColor("#7f8c8d");
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.errorOccurred) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height('100%');
                        Column.justifyContent(FlexAlign.Center);
                        Column.backgroundColor("#ffffff");
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("网络连接失败");
                        Text.fontSize(36);
                        Text.fontColor("#e74c3c");
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create("请检查网络设置后重试");
                        Text.fontSize(18);
                        Text.fontColor("#e74c3c");
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel("重新加载");
                        Button.width(120);
                        Button.margin({ top: 20 });
                        Button.onClick(() => {
                            this.controller.refresh();
                            this.loading = true;
                            this.errorOccurred = false;
                        });
                    }, Button);
                    Button.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("旋转视图");
            Button.layoutWeight(1);
            Button.height(40);
            Button.backgroundColor("#3498db");
            Button.fontColor(Color.White);
            Button.onClick(() => {
                this.executeJavaScript("document.querySelector('canvas').dispatchEvent(new MouseEvent('mousedown', {buttons: 1}));");
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel("重置视图");
            Button.layoutWeight(1);
            Button.height(40);
            Button.margin({ left: 10 });
            Button.backgroundColor("#2ecc71");
            Button.fontColor(Color.White);
            Button.onClick(() => {
                this.executeJavaScript("window.location.reload();");
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
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
        }
        catch (error) {
            console.error(`Error running JavaScript, code: ${(error as BusinessError).code}, message: ${(error as BusinessError).message}`);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SplineModelViewer";
    }
}
registerNamedRoute(() => new SplineModelViewer(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/threeD", pageFullPath: "entry/src/main/ets/pages/threeD", integratedHsp: "false", moduleType: "followWithHap" });
