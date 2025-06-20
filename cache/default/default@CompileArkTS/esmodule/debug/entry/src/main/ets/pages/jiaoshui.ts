if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WaterDetailsPage_Params {
}
import router from "@ohos:router";
class WaterDetailsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WaterDetailsPage_Params) {
    }
    updateStateVars(params: WaterDetailsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F5F5F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏
            Row.create();
            // 标题栏
            Row.width('100%');
            // 标题栏
            Row.height(56);
            // 标题栏
            Row.backgroundColor('#FFFFFF');
            // 标题栏
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777233, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.margin({ left: 16 });
            Image.onClick(() => {
                router.pushUrl({
                    url: 'pages/faxian'
                });
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('浇水细节介绍');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 16 });
        }, Text);
        Text.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 内容区域
            Scroll.create();
            // 内容区域
            Scroll.width('100%');
            // 内容区域
            Scroll.layoutWeight(1);
            // 内容区域
            Scroll.scrollable(ScrollDirection.Vertical);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 知识图片 1
            Image.create({ "id": 16777300, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            // 知识图片 1
            Image.width('90%');
            // 知识图片 1
            Image.height(420);
            // 知识图片 1
            Image.borderRadius(12);
            // 知识图片 1
            Image.margin({ top: 16 });
            // 知识图片 1
            Image.objectFit(ImageFit.Cover);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 知识图片 2
            Image.create({ "id": 16777301, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            // 知识图片 2
            Image.width('90%');
            // 知识图片 2
            Image.height(420);
            // 知识图片 2
            Image.borderRadius(12);
            // 知识图片 2
            Image.margin({ top: 16 });
            // 知识图片 2
            Image.objectFit(ImageFit.Cover);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 知识图片 3
            Image.create({ "id": 16777302, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            // 知识图片 3
            Image.width('90%');
            // 知识图片 3
            Image.height(420);
            // 知识图片 3
            Image.borderRadius(12);
            // 知识图片 3
            Image.margin({ top: 16 });
            // 知识图片 3
            Image.objectFit(ImageFit.Cover);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 知识图片 4
            Image.create({ "id": 16777303, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            // 知识图片 4
            Image.width('90%');
            // 知识图片 4
            Image.height(420);
            // 知识图片 4
            Image.borderRadius(12);
            // 知识图片 4
            Image.margin({ top: 16, bottom: 16 });
            // 知识图片 4
            Image.objectFit(ImageFit.Cover);
        }, Image);
        Column.pop();
        // 内容区域
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "WaterDetailsPage";
    }
}
registerNamedRoute(() => new WaterDetailsPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/jiaoshui", pageFullPath: "entry/src/main/ets/pages/jiaoshui", integratedHsp: "false", moduleType: "followWithHap" });
