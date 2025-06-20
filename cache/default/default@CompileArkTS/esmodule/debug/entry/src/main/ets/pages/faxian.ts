if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Recommand_Params {
    RecommandList?: IRecommand[];
}
interface FaXianPage_Params {
    activeTab?: number;
    phoneNumber?: string;
    tabItems?: string[];
}
import router from "@ohos:router";
// 定义推荐内容接口
interface IRecommand {
    id: string;
    imageSrc: Resource;
    url: string;
}
class RecommandItem {
    id: string;
    imageSrc: Resource;
    url: string;
    constructor(id: string, imageSrc: Resource, url: string) {
        this.id = id;
        this.imageSrc = imageSrc;
        this.url = url;
    }
}
class FaXianPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__activeTab = new ObservedPropertySimplePU(2, this, "activeTab");
        this.__phoneNumber = new ObservedPropertySimplePU('', this, "phoneNumber");
        this.tabItems = ['社区', '任务', '发现', '我的'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FaXianPage_Params) {
        if (params.activeTab !== undefined) {
            this.activeTab = params.activeTab;
        }
        if (params.phoneNumber !== undefined) {
            this.phoneNumber = params.phoneNumber;
        }
        if (params.tabItems !== undefined) {
            this.tabItems = params.tabItems;
        }
    }
    updateStateVars(params: FaXianPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__activeTab.purgeDependencyOnElmtId(rmElmtId);
        this.__phoneNumber.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__activeTab.aboutToBeDeleted();
        this.__phoneNumber.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __activeTab: ObservedPropertySimplePU<number>;
    get activeTab() {
        return this.__activeTab.get();
    }
    set activeTab(newValue: number) {
        this.__activeTab.set(newValue);
    }
    private __phoneNumber: ObservedPropertySimplePU<string>;
    get phoneNumber() {
        return this.__phoneNumber.get();
    }
    set phoneNumber(newValue: string) {
        this.__phoneNumber.set(newValue);
    }
    readonly tabItems: string[];
    aboutToAppear() {
        try {
            const params = router.getParams() as Record<string, string>;
            this.phoneNumber = params?.phoneNumber ?? '';
        }
        catch (err) {
            console.error('获取参数失败:', err);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#f8fafc');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部标题栏
            Row.create();
            // 顶部标题栏
            Row.width('100%');
            // 顶部标题栏
            Row.justifyContent(FlexAlign.SpaceBetween);
            // 顶部标题栏
            Row.padding({ left: 16, right: 16, top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Botaniverse');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#166534');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777231, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(32);
            Image.height(32);
            Image.borderRadius(16);
        }, Image);
        // 顶部标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.edgeEffect(EdgeEffect.Spring);
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 推荐轮播
            Column.create();
            // 推荐轮播
            Column.width('100%');
            // 推荐轮播
            Column.margin({ top: 8, bottom: 8 });
            // 推荐轮播
            Column.padding({ top: 8, bottom: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('今日推荐');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#556B2F');
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new Recommand(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/faxian.ets", line: 65, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "Recommand" });
        }
        // 推荐轮播
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 我的植物展示
            Column.create();
            // 我的植物展示
            Column.width('90%');
            // 我的植物展示
            Column.padding(16);
            // 我的植物展示
            Column.backgroundColor('#ffffff');
            // 我的植物展示
            Column.borderRadius(16);
            // 我的植物展示
            Column.margin({ top: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('我的植物');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('45%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777269, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width('100%');
            Image.height(160);
            Image.borderRadius(8);
            Image.objectFit(ImageFit.Cover);
            Image.onClick(() => {
                router.pushUrl({
                    url: 'pages/threeD',
                    params: {
                        from: 'faxian' // 标记来源页面
                    }
                });
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(8);
            Column.backgroundColor('#00000060');
            Column.position({ y: 120 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('多肉植物');
            Text.fontColor('#ffffff');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('生长期 - 14天');
            Text.fontSize(12);
            Text.fontColor('#ffffff');
        }, Text);
        Text.pop();
        Column.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('45%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777234, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width('100%');
            Image.height(160);
            Image.borderRadius(8);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(8);
            Column.backgroundColor('#00000060');
            Column.position({ y: 120 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('罗勒');
            Text.fontColor('#ffffff');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('生长期 - 21天');
            Text.fontSize(12);
            Text.fontColor('#ffffff');
        }, Text);
        Text.pop();
        Column.pop();
        Stack.pop();
        Row.pop();
        // 我的植物展示
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 花艺知识分享
            Column.create();
            // 花艺知识分享
            Column.width('90%');
            // 花艺知识分享
            Column.padding(16);
            // 花艺知识分享
            Column.backgroundColor('#ffffff');
            // 花艺知识分享
            Column.borderRadius(16);
            // 花艺知识分享
            Column.margin({ top: 16, bottom: 60 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('花艺知识分享');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
            Text.alignSelf(ItemAlign.Start);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('45%');
            Column.backgroundColor('#f0fdf4');
            Column.padding(12);
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777291, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width('100%');
            Image.height(120);
            Image.borderRadius(8);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('植物浇水技巧');
            Text.fontSize(16);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('了解不同植物的浇水需求');
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('45%');
            Column.backgroundColor('#f0fdf4');
            Column.padding(12);
            Column.borderRadius(8);
            Column.onClick(() => {
                router.pushUrl({
                    url: 'pages/xiujian',
                    params: {
                        from: 'faxian' // 标记来源页面
                    }
                });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777290, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width('100%');
            Image.height(120);
            Image.borderRadius(8);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('修剪技巧');
            Text.fontSize(16);
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('掌握植物修剪的基本方法');
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        // 花艺知识分享
        Column.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部导航栏
            Row.create();
            // 底部导航栏
            Row.width('100%');
            // 底部导航栏
            Row.backgroundColor('#ffffff');
            // 底部导航栏
            Row.position({ y: '93%' });
            // 底部导航栏
            Row.justifyContent(FlexAlign.SpaceAround);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.onClick(() => {
                        if (index === 0) {
                            router.pushUrl({ url: 'pages/shequ' });
                        }
                        else if (index === 1) {
                            router.pushUrl({ url: 'pages/renwu' });
                        }
                        else if (index === 2) {
                            this.activeTab = index;
                        }
                        else if (index === 3) {
                            router.pushUrl({ url: 'pages/wode' });
                        }
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(index === this.activeTab ? { "id": -1, "type": -1, params: [`app.media.tab_${item}_active`], "bundleName": "com.example.myapplication", "moduleName": "entry" } : { "id": -1, "type": -1, params: [`app.media.tab_${item}_normal`], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                    Image.width(24);
                    Image.height(36);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item);
                    Text.fontSize(12);
                    Text.fontColor(index === this.activeTab ? '#16a34a' : '#666666');
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.tabItems, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        // 底部导航栏
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "FaXianPage";
    }
}
class Recommand extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__RecommandList = new ObservedPropertyObjectPU([
            new RecommandItem('pic0', { "id": 16777260, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }, 'https://ppbc.iplant.cn/tu/2079193'),
            new RecommandItem('pic1', { "id": 16777261, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }, 'https://ppbc.iplant.cn/tu/1039291'),
            new RecommandItem('pic2', { "id": 16777262, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }, 'https://ppbc.iplant.cn/tu/1237552'),
            new RecommandItem('pic3', { "id": 16777263, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }, 'https://ppbc.iplant.cn/tu/149948'),
            new RecommandItem('pic4', { "id": 16777264, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }, 'https://ppbc.iplant.cn/tu/20746313'),
            new RecommandItem('pic5', { "id": 16777265, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }, 'https://ppbc.iplant.cn/tu/1208382')
        ], this, "RecommandList");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Recommand_Params) {
        if (params.RecommandList !== undefined) {
            this.RecommandList = params.RecommandList;
        }
    }
    updateStateVars(params: Recommand_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__RecommandList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__RecommandList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __RecommandList: ObservedPropertyObjectPU<IRecommand[]>;
    get RecommandList() {
        return this.__RecommandList.get();
    }
    set RecommandList(newValue: IRecommand[]) {
        this.__RecommandList.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create();
            Swiper.autoPlay(true);
            Swiper.loop(true);
            Swiper.indicator(new DotIndicator()
                .color('#1a000000')
                .selectedColor('#0A59F7'));
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(item.imageSrc);
                    Image.objectFit(ImageFit.Contain);
                    Image.width('100%');
                    Image.padding({ top: 11, left: 16, right: 16 });
                    Image.borderRadius(16);
                }, Image);
            };
            this.forEachUpdateFunction(elmtId, this.RecommandList, forEachItemGenFunction, (item: IRecommand): string => item.id, true, false);
        }, ForEach);
        ForEach.pop();
        Swiper.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new FaXianPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/faxian", pageFullPath: "entry/src/main/ets/pages/faxian", integratedHsp: "false", moduleType: "followWithHap" });
