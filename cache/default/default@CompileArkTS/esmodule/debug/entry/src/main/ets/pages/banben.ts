if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface VersionInfoPage_Params {
}
import router from "@ohos:router";
class VersionInfoPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VersionInfoPage_Params) {
    }
    updateStateVars(params: VersionInfoPage_Params) {
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
            Column.backgroundColor('#F5F7FA');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏
            Row.create();
            // 标题栏
            Row.width('100%');
            // 标题栏
            Row.height(56);
            // 标题栏
            Row.padding({ left: 16 });
            // 标题栏
            Row.backgroundColor('#FFFFFF');
            // 标题栏
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777233, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('关于植境');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 16 });
        }, Text);
        Text.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
            Scroll.scrollable(ScrollDirection.Vertical);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // App Logo
            Image.create({ "id": 16777295, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            // App Logo
            Image.width(120);
            // App Logo
            Image.height(120);
            // App Logo
            Image.margin({ top: 32, bottom: 16 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // App 名称和版本号
            Text.create('植境');
            // App 名称和版本号
            Text.fontSize(24);
            // App 名称和版本号
            Text.fontWeight(FontWeight.Bold);
            // App 名称和版本号
            Text.margin({ bottom: 8 });
        }, Text);
        // App 名称和版本号
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Version 1.0.0');
            Text.fontSize(16);
            Text.fontColor('#666666');
            Text.margin({ bottom: 32 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 更新日志
            Column.create();
            // 更新日志
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('更新日志');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.width('100%');
            Text.padding({ left: 16, top: 16, bottom: 12 });
            Text.backgroundColor('#F5F7FA');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.UpdateItem.bind(this)('2025.06.12', [
            '新增智能植物识别功能',
            '优化养护提醒系统',
            '增加社区互动功能',
            '界面视觉升级'
        ]);
        this.UpdateItem.bind(this)('2025.05.15', [
            '首次发布',
            '植物图鉴功能',
            '基础养护指南',
            '天气提醒功能'
        ]);
        Column.pop();
        // 更新日志
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 开发者信息
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('开发者信息');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.width('100%');
            Text.padding({ left: 16, top: 16, bottom: 12 });
            Text.backgroundColor('#F5F7FA');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(16);
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.InfoItem.bind(this)('开发团队', '植境科技');
        this.InfoItem.bind(this)('联系邮箱', 'support@zhijing.com');
        this.InfoItem.bind(this)('官方网站', 'www.zhijing.com');
        this.InfoItem.bind(this)('企业地址', '深圳市南山区科技园');
        Column.pop();
        // 开发者信息
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    InfoItem(title: string, content: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.padding({ top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(16);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(content);
            Text.fontSize(16);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        Row.pop();
    }
    UpdateItem(date: string, updates: string[], parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(date);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.alignItems(VerticalAlign.Top);
                    Row.margin({ bottom: 4 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('•');
                    Text.fontSize(14);
                    Text.fontColor('#666666');
                    Text.margin({ right: 8 });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item);
                    Text.fontSize(14);
                    Text.fontColor('#666666');
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, updates, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "VersionInfoPage";
    }
}
registerNamedRoute(() => new VersionInfoPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/banben", pageFullPath: "entry/src/main/ets/pages/banben", integratedHsp: "false", moduleType: "followWithHap" });
