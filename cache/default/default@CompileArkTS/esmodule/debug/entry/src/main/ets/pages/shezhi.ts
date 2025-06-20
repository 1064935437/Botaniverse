if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LogoutDialog_Params {
    controller?: CustomDialogController;
}
interface SettingsPage_Params {
    notificationEnabled?: boolean;
    themeMode?: string;
    dialogController?: CustomDialogController;
}
import router from "@ohos:router";
interface ListItemOptions {
    icon: Resource;
    title: string;
    subTitle?: string;
    showArrow?: boolean;
    showSwitch?: boolean;
    onClick?: () => void;
}
class SettingsPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__notificationEnabled = new ObservedPropertySimplePU(true, this, "notificationEnabled");
        this.__themeMode = new ObservedPropertySimplePU('浅色模式', this, "themeMode");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new LogoutDialog(this, {}, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/shezhi.ets", line: 19, col: 14 });
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {};
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Bottom,
            customStyle: true
        }, this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SettingsPage_Params) {
        if (params.notificationEnabled !== undefined) {
            this.notificationEnabled = params.notificationEnabled;
        }
        if (params.themeMode !== undefined) {
            this.themeMode = params.themeMode;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    updateStateVars(params: SettingsPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__notificationEnabled.purgeDependencyOnElmtId(rmElmtId);
        this.__themeMode.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__notificationEnabled.aboutToBeDeleted();
        this.__themeMode.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __notificationEnabled: ObservedPropertySimplePU<boolean>;
    get notificationEnabled() {
        return this.__notificationEnabled.get();
    }
    set notificationEnabled(newValue: boolean) {
        this.__notificationEnabled.set(newValue);
    }
    private __themeMode: ObservedPropertySimplePU<string>;
    get themeMode() {
        return this.__themeMode.get();
    }
    set themeMode(newValue: string) {
        this.__themeMode.set(newValue);
    }
    private dialogController: CustomDialogController;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Bottom });
        }, Stack);
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
                router.pushUrl({
                    url: 'pages/wode'
                });
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('设置');
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
            Scroll.layoutWeight(1);
            // 内容区域
            Scroll.scrollable(ScrollDirection.Vertical);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.margin({ top: -350 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 主题设置
            Row.create();
            // 主题设置
            Row.width('100%');
            // 主题设置
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
            // 主题设置
            Row.backgroundColor('#FFFFFF');
            // 主题设置
            Row.margin({ top: 12, left: 12, right: 12 });
            // 主题设置
            Row.borderRadius(8);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777270, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#16A34A');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
            Column.flexGrow(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('主题设置');
            Text.fontSize(16);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.themeMode);
            Text.fontSize(14);
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.themeMode === '浅色模式' ? '切换深色' : '切换浅色');
            Button.height(32);
            Button.fontSize(14);
            Button.fontColor('#16A34A');
            Button.backgroundColor('#F0F9F0');
            Button.borderRadius(16);
            Button.onClick(() => {
                this.themeMode = this.themeMode === '浅色模式' ? '深色模式' : '浅色模式';
                router.pushUrl({
                    url: 'pages/shense'
                });
            });
        }, Button);
        Button.pop();
        // 主题设置
        Row.pop();
        // 权限管理
        this.ListItem.bind(this)(makeBuilderParameterProxy("ListItem", { icon: () => ({ "id": 16777289, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }), title: () => '权限管理', subTitle: () => '相机、相册、位置信息、推送权限', showArrow: () => true, onClick: () => () => {
                router.pushUrl({
                    url: 'pages/quanxian'
                });
            } }));
        // 关于与版本信息
        this.ListItem.bind(this)(makeBuilderParameterProxy("ListItem", { icon: () => ({ "id": 16777288, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }), title: () => '关于与版本信息', subTitle: () => 'App 版本号、更新日志、开发者信息', showArrow: () => true, onClick: () => () => {
                router.pushUrl({
                    url: 'pages/banben'
                });
            } }));
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 退出登录按钮
            Button.createWithLabel('退出登录');
            // 退出登录按钮
            Button.width('90%');
            // 退出登录按钮
            Button.height(48);
            // 退出登录按钮
            Button.margin({ top: 32 });
            // 退出登录按钮
            Button.fontColor('#FF4D4F');
            // 退出登录按钮
            Button.fontSize(16);
            // 退出登录按钮
            Button.backgroundColor('#FFFFFF');
            // 退出登录按钮
            Button.borderRadius(24);
            // 退出登录按钮
            Button.onClick(() => {
                this.dialogController.open();
            });
        }, Button);
        // 退出登录按钮
        Button.pop();
        Column.pop();
        // 内容区域
        Scroll.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 浮动客服按钮
            Button.createWithChild({ type: ButtonType.Circle });
            // 浮动客服按钮
            Button.width(56);
            // 浮动客服按钮
            Button.height(56);
            // 浮动客服按钮
            Button.margin({ bottom: 24, right: 24 });
            // 浮动客服按钮
            Button.backgroundColor('#16A34A');
            // 浮动客服按钮
            Button.onClick(() => {
                router.pushUrl({
                    url: 'pages/kefu'
                });
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777287, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
        }, Image);
        // 浮动客服按钮
        Button.pop();
        Stack.pop();
    }
    ListItem(options: ListItemOptions, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
            Row.backgroundColor('#FFFFFF');
            Row.borderRadius(8);
            Row.margin({ left: 12, right: 12, top: 12 });
            Row.onClick(() => {
                options.onClick?.();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(options.icon);
            Image.width(24);
            Image.height(24);
            Image.fillColor('#16A34A');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
            Column.flexGrow(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(options.title);
            Text.fontSize(16);
            Text.fontColor('#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (options.subTitle) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(options.subTitle);
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (options.showSwitch) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Toggle.create({ type: ToggleType.Switch, isOn: this.notificationEnabled });
                        Toggle.width(40);
                        Toggle.height(24);
                        Toggle.selectedColor('#16A34A');
                        Toggle.onChange((isOn: boolean) => {
                            this.notificationEnabled = isOn;
                        });
                    }, Toggle);
                    Toggle.pop();
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
            if (options.showArrow) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777229, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
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
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "SettingsPage";
    }
}
class LogoutDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LogoutDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: LogoutDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
            Column.backgroundColor('#F5F5F5');
            Column.borderRadius(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('确认退出');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ top: 16, bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('退出后需要重新登录才能使用完整功能');
            Text.fontSize(16);
            Text.fontColor('#666666');
            Text.margin({ bottom: 24 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('退出登录');
            Button.width('100%');
            Button.height(56);
            Button.fontSize(18);
            Button.fontColor('#FF4D4F');
            Button.backgroundColor('#FFFFFF');
            Button.borderRadius(28);
            Button.onClick(() => {
                this.controller.close();
                router.pushUrl({
                    url: 'pages/Index'
                });
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.width('100%');
            Button.height(56);
            Button.fontSize(18);
            Button.fontColor('#333333');
            Button.backgroundColor('#FFFFFF');
            Button.borderRadius(28);
            Button.margin({ top: 8, bottom: 8 });
            Button.onClick(() => {
                this.controller.close();
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new SettingsPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/shezhi", pageFullPath: "entry/src/main/ets/pages/shezhi", integratedHsp: "false", moduleType: "followWithHap" });
