if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MessagePage_Params {
    currentTab?: number;
    tabTitles?: string[];
}
import router from "@ohos:router";
class MessagePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentTab = new ObservedPropertySimplePU(0, this, "currentTab");
        this.tabTitles = ['提醒', '私信'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MessagePage_Params) {
        if (params.currentTab !== undefined) {
            this.currentTab = params.currentTab;
        }
        if (params.tabTitles !== undefined) {
            this.tabTitles = params.tabTitles;
        }
    }
    updateStateVars(params: MessagePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentTab.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentTab.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentTab: ObservedPropertySimplePU<number>;
    get currentTab() {
        return this.__currentTab.get();
    }
    set currentTab(newValue: number) {
        this.__currentTab.set(newValue);
    }
    private tabTitles: string[];
    TabBuilder(title: string, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(60);
            Column.alignItems(HorizontalAlign.Center);
            Column.onClick(() => {
                this.currentTab = index;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontColor(this.currentTab === index ? '#333333' : '#666666');
            Text.fontSize(16);
            Text.fontWeight(this.currentTab === index ? FontWeight.Medium : FontWeight.Regular);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentTab === index) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Divider.create();
                        Divider.width(24);
                        Divider.height(2);
                        Divider.color('#333333');
                        Divider.margin({ top: 4 });
                    }, Divider);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#f5f5f5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部导航栏
            Row.create();
            // 顶部导航栏
            Row.width('100%');
            // 顶部导航栏
            Row.height(56);
            // 顶部导航栏
            Row.padding({ left: 16, right: 16 });
            // 顶部导航栏
            Row.backgroundColor('#FFFFFF');
            // 顶部导航栏
            Row.justifyContent(FlexAlign.Start);
            // 顶部导航栏
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777233, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.onClick(() => router.back());
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('50%');
            Row.margin({ left: 80 });
            Row.justifyContent(FlexAlign.SpaceAround);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const title = _item;
                this.TabBuilder.bind(this)(title, index);
            };
            this.forEachUpdateFunction(elmtId, this.tabTitles, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        // 顶部导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 内容区域
            Stack.create();
            // 内容区域
            Stack.backgroundColor('#FFFFFF');
            // 内容区域
            Stack.layoutWeight(1);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentTab === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 全部已读按钮
                        Text.create('全部已读');
                        // 全部已读按钮
                        Text.fontSize(14);
                        // 全部已读按钮
                        Text.fontColor('#999999');
                        // 全部已读按钮
                        Text.margin({ top: 8, right: 16, bottom: 8 });
                        // 全部已读按钮
                        Text.alignSelf(ItemAlign.End);
                    }, Text);
                    // 全部已读按钮
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 空状态提示
                        Column.create();
                        // 空状态提示
                        Column.width('100%');
                        // 空状态提示
                        Column.height('100%');
                        // 空状态提示
                        Column.justifyContent(FlexAlign.Center);
                        // 空状态提示
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Image.width(100);
                        Image.height(100);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无提醒');
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    // 空状态提示
                    Column.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 添加私信标签页的全部已读按钮
                        Text.create('全部已读');
                        // 添加私信标签页的全部已读按钮
                        Text.fontSize(14);
                        // 添加私信标签页的全部已读按钮
                        Text.fontColor('#999999');
                        // 添加私信标签页的全部已读按钮
                        Text.margin({ top: 8, right: 16, bottom: 8 });
                        // 添加私信标签页的全部已读按钮
                        Text.alignSelf(ItemAlign.End);
                    }, Text);
                    // 添加私信标签页的全部已读按钮
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 空状态提示
                        Column.create();
                        // 空状态提示
                        Column.width('100%');
                        // 空状态提示
                        Column.height('100%');
                        // 空状态提示
                        Column.justifyContent(FlexAlign.Center);
                        // 空状态提示
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777292, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Image.width(100);
                        Image.height(100);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无私信');
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    // 空状态提示
                    Column.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        // 内容区域
        Stack.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "MessagePage";
    }
}
registerNamedRoute(() => new MessagePage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/message", pageFullPath: "entry/src/main/ets/pages/message", integratedHsp: "false", moduleType: "followWithHap" });
