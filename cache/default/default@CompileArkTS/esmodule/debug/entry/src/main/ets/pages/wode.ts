if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WodePage_Params {
    avatarUrl?: string;
    nickname?: string;
    description?: string;
    isNightMode?: boolean;
    activeTab?: number;
    isEditingName?: boolean;
    tempNickname?: string;
    tabItems?: string[];
}
import router from "@ohos:router";
import userStore from "@normalized:N&&&entry/src/main/ets/pages/userStore&";
import promptAction from "@ohos:promptAction";
class WodePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__avatarUrl = new ObservedPropertySimplePU('/images/default_avatar.png', this, "avatarUrl");
        this.__nickname = new ObservedPropertySimplePU(userStore.getUsername() || '未设置昵称', this, "nickname");
        this.__description = new ObservedPropertySimplePU('这个人很懒，什么都没写~', this, "description");
        this.__isNightMode = new ObservedPropertySimplePU(false, this, "isNightMode");
        this.__activeTab = new ObservedPropertySimplePU(3 // 修改初始值为3，表示"我的"页面
        , this, "activeTab");
        this.__isEditingName = new ObservedPropertySimplePU(false // 添加编辑状态
        , this, "isEditingName");
        this.__tempNickname = new ObservedPropertySimplePU('' // 临时存储编辑的昵称
        , this, "tempNickname");
        this.tabItems = ['社区', '任务', '发现', '我的'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WodePage_Params) {
        if (params.avatarUrl !== undefined) {
            this.avatarUrl = params.avatarUrl;
        }
        if (params.nickname !== undefined) {
            this.nickname = params.nickname;
        }
        if (params.description !== undefined) {
            this.description = params.description;
        }
        if (params.isNightMode !== undefined) {
            this.isNightMode = params.isNightMode;
        }
        if (params.activeTab !== undefined) {
            this.activeTab = params.activeTab;
        }
        if (params.isEditingName !== undefined) {
            this.isEditingName = params.isEditingName;
        }
        if (params.tempNickname !== undefined) {
            this.tempNickname = params.tempNickname;
        }
        if (params.tabItems !== undefined) {
            this.tabItems = params.tabItems;
        }
    }
    updateStateVars(params: WodePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__avatarUrl.purgeDependencyOnElmtId(rmElmtId);
        this.__nickname.purgeDependencyOnElmtId(rmElmtId);
        this.__description.purgeDependencyOnElmtId(rmElmtId);
        this.__isNightMode.purgeDependencyOnElmtId(rmElmtId);
        this.__activeTab.purgeDependencyOnElmtId(rmElmtId);
        this.__isEditingName.purgeDependencyOnElmtId(rmElmtId);
        this.__tempNickname.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__avatarUrl.aboutToBeDeleted();
        this.__nickname.aboutToBeDeleted();
        this.__description.aboutToBeDeleted();
        this.__isNightMode.aboutToBeDeleted();
        this.__activeTab.aboutToBeDeleted();
        this.__isEditingName.aboutToBeDeleted();
        this.__tempNickname.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __avatarUrl: ObservedPropertySimplePU<string>;
    get avatarUrl() {
        return this.__avatarUrl.get();
    }
    set avatarUrl(newValue: string) {
        this.__avatarUrl.set(newValue);
    }
    private __nickname: ObservedPropertySimplePU<string>;
    get nickname() {
        return this.__nickname.get();
    }
    set nickname(newValue: string) {
        this.__nickname.set(newValue);
    }
    private __description: ObservedPropertySimplePU<string>;
    get description() {
        return this.__description.get();
    }
    set description(newValue: string) {
        this.__description.set(newValue);
    }
    private __isNightMode: ObservedPropertySimplePU<boolean>;
    get isNightMode() {
        return this.__isNightMode.get();
    }
    set isNightMode(newValue: boolean) {
        this.__isNightMode.set(newValue);
    }
    private __activeTab: ObservedPropertySimplePU<number>; // 修改初始值为3，表示"我的"页面
    get activeTab() {
        return this.__activeTab.get();
    }
    set activeTab(newValue: number) {
        this.__activeTab.set(newValue);
    }
    private __isEditingName: ObservedPropertySimplePU<boolean>; // 添加编辑状态
    get isEditingName() {
        return this.__isEditingName.get();
    }
    set isEditingName(newValue: boolean) {
        this.__isEditingName.set(newValue);
    }
    private __tempNickname: ObservedPropertySimplePU<string>; // 临时存储编辑的昵称
    get tempNickname() {
        return this.__tempNickname.get();
    }
    set tempNickname(newValue: string) {
        this.__tempNickname.set(newValue);
    }
    private tabItems: string[];
    MenuListItem(icon: Resource, title: string, arrow: boolean = true, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 16, right: 16 });
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.backgroundColor('#FFFFFF');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(icon);
            Image.width(24);
            Image.height(24);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(title);
            Text.fontSize(16);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (arrow) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Image.width(20);
                        Image.height(20);
                        Image.fillColor('#999999');
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    aboutToAppear() {
        // 每次页面显示时更新用户名
        this.nickname = userStore.getUsername() || '未设置昵称';
    }
    // 添加保存昵称的方法
    saveNickname() {
        if (this.tempNickname.trim() === '') {
            promptAction.showToast({ message: '昵称不能为空' });
            return;
        }
        userStore.setUsername(this.tempNickname.trim());
        this.nickname = this.tempNickname.trim();
        this.isEditingName = false;
        promptAction.showToast({ message: '昵称修改成功' });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.backgroundColor('#f5f5f5');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部个人信息
            Stack.create();
            // 顶部个人信息
            Stack.height(400);
            // 顶部个人信息
            Stack.backgroundColor('#FFFFFF');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 背景图片
            Image.create('/images/profile_bg.jpg');
            // 背景图片
            Image.width('100%');
            // 背景图片
            Image.height(160);
            // 背景图片
            Image.objectFit(ImageFit.Cover);
            // 背景图片
            Image.blur(2);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 个人信息居中显示
            Column.create();
            // 个人信息居中显示
            Column.alignItems(HorizontalAlign.Center);
            // 个人信息居中显示
            Column.backgroundColor('#FFFFFF');
            // 个人信息居中显示
            Column.padding({ top: 20, bottom: 20 });
            // 个人信息居中显示
            Column.position({ x: '50%', y: '50%' });
            // 个人信息居中显示
            Column.translate({ x: '-50%', y: '-30%' });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777232, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(100);
            Image.height(100);
            Image.borderRadius(50);
            Image.border({ width: 2, color: '#FFFFFF' });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.nickname);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('#333333');
            Text.margin({ top: 8 });
            Text.onClick(() => {
                this.tempNickname = this.nickname;
                this.isEditingName = true;
            });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('ID: 12345678');
            Text.fontSize(14);
            Text.fontColor('#333333');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.description);
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        // 个人信息居中显示
        Column.pop();
        // 顶部个人信息
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.width('100%');
            Scroll.scrollable(ScrollDirection.Vertical);
            Scroll.edgeEffect(EdgeEffect.Spring);
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.padding({ bottom: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 我的收藏
            Column.create();
            // 我的收藏
            Column.backgroundColor('#FFFFFF');
            // 我的收藏
            Column.borderRadius(12);
            // 我的收藏
            Column.margin({ top: 12 });
            // 我的收藏
            Column.onClick(() => {
                router.pushUrl({
                    url: 'pages/collect'
                });
            });
        }, Column);
        this.MenuListItem.bind(this)({ "id": 16777238, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }, '我的收藏');
        // 我的收藏
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 消息通知
            Column.create();
            // 消息通知
            Column.backgroundColor('#FFFFFF');
            // 消息通知
            Column.borderRadius(12);
            // 消息通知
            Column.margin({ top: 12 });
            // 消息通知
            Column.onClick(() => {
                router.pushUrl({
                    url: 'pages/message'
                });
            });
        }, Column);
        this.MenuListItem.bind(this)({ "id": 16777252, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }, '消息通知');
        // 消息通知
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 设置
            Column.create();
            // 设置
            Column.backgroundColor('#FFFFFF');
            // 设置
            Column.borderRadius(12);
            // 设置
            Column.margin({ top: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(56);
            Row.padding({ left: 16, right: 16 });
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.backgroundColor('#FFFFFF');
            Row.onClick(() => {
                router.pushUrl({
                    url: 'pages/shezhi',
                    params: {
                        from: 'wode'
                    }
                });
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777220, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('设置');
            Text.fontSize(16);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(20);
            Image.height(20);
            Image.fillColor('#999999');
        }, Image);
        Row.pop();
        // 设置
        Column.pop();
        Column.pop();
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部导航栏
            Row.create();
            // 底部导航栏
            Row.width('100%');
            // 底部导航栏
            Row.height(56);
            // 底部导航栏
            Row.backgroundColor('#ffffff');
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
                        if (index === 0) { // 社区
                            router.pushUrl({
                                url: 'pages/shequ'
                            });
                        }
                        else if (index === 1) { // 任务
                            router.pushUrl({
                                url: 'pages/renwu'
                            });
                        }
                        else if (index === 2) { // 发现
                            router.pushUrl({
                                url: 'pages/faxian'
                            });
                        }
                        else if (index === 3) { // 我的
                            this.activeTab = index; // 保持在我的页面
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 添加编辑昵称的对话框
            if (this.isEditingName) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height('100%');
                        Column.backgroundColor('rgba(0,0,0,0.5)');
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('80%');
                        Column.padding(20);
                        Column.backgroundColor(Color.White);
                        Column.borderRadius(12);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('修改昵称');
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Medium);
                        Text.margin({ bottom: 16 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.tempNickname });
                        TextInput.width('100%');
                        TextInput.height(40);
                        TextInput.margin({ bottom: 20 });
                        TextInput.onChange((value) => {
                            this.tempNickname = value;
                        });
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.justifyContent(FlexAlign.SpaceAround);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('取消');
                        Button.width(120);
                        Button.backgroundColor('#F5F5F5');
                        Button.fontColor('#333333');
                        Button.onClick(() => {
                            this.isEditingName = false;
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('确定');
                        Button.width(120);
                        Button.onClick(() => {
                            this.saveNickname();
                        });
                    }, Button);
                    Button.pop();
                    Row.pop();
                    Column.pop();
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
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "WodePage";
    }
}
registerNamedRoute(() => new WodePage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/wode", pageFullPath: "entry/src/main/ets/pages/wode", integratedHsp: "false", moduleType: "followWithHap" });
