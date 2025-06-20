if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PermissionPage_Params {
    cameraEnabled?: boolean;
    albumEnabled?: boolean;
    locationEnabled?: boolean;
    notificationEnabled?: boolean;
}
import router from "@ohos:router";
// 定义权限项接口
interface PermissionItemOptions {
    icon: Resource;
    title: string;
    subTitle: string;
    enabled: boolean;
    onChange: (isOn: boolean) => void;
}
class PermissionPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__cameraEnabled = new ObservedPropertySimplePU(false, this, "cameraEnabled");
        this.__albumEnabled = new ObservedPropertySimplePU(false, this, "albumEnabled");
        this.__locationEnabled = new ObservedPropertySimplePU(false, this, "locationEnabled");
        this.__notificationEnabled = new ObservedPropertySimplePU(false, this, "notificationEnabled");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PermissionPage_Params) {
        if (params.cameraEnabled !== undefined) {
            this.cameraEnabled = params.cameraEnabled;
        }
        if (params.albumEnabled !== undefined) {
            this.albumEnabled = params.albumEnabled;
        }
        if (params.locationEnabled !== undefined) {
            this.locationEnabled = params.locationEnabled;
        }
        if (params.notificationEnabled !== undefined) {
            this.notificationEnabled = params.notificationEnabled;
        }
    }
    updateStateVars(params: PermissionPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__cameraEnabled.purgeDependencyOnElmtId(rmElmtId);
        this.__albumEnabled.purgeDependencyOnElmtId(rmElmtId);
        this.__locationEnabled.purgeDependencyOnElmtId(rmElmtId);
        this.__notificationEnabled.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__cameraEnabled.aboutToBeDeleted();
        this.__albumEnabled.aboutToBeDeleted();
        this.__locationEnabled.aboutToBeDeleted();
        this.__notificationEnabled.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __cameraEnabled: ObservedPropertySimplePU<boolean>;
    get cameraEnabled() {
        return this.__cameraEnabled.get();
    }
    set cameraEnabled(newValue: boolean) {
        this.__cameraEnabled.set(newValue);
    }
    private __albumEnabled: ObservedPropertySimplePU<boolean>;
    get albumEnabled() {
        return this.__albumEnabled.get();
    }
    set albumEnabled(newValue: boolean) {
        this.__albumEnabled.set(newValue);
    }
    private __locationEnabled: ObservedPropertySimplePU<boolean>;
    get locationEnabled() {
        return this.__locationEnabled.get();
    }
    set locationEnabled(newValue: boolean) {
        this.__locationEnabled.set(newValue);
    }
    private __notificationEnabled: ObservedPropertySimplePU<boolean>;
    get notificationEnabled() {
        return this.__notificationEnabled.get();
    }
    set notificationEnabled(newValue: boolean) {
        this.__notificationEnabled.set(newValue);
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
            Text.create('权限管理');
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
            Column.margin({ top: -270 });
        }, Column);
        // 相机权限
        this.PermissionItem.bind(this)(makeBuilderParameterProxy("PermissionItem", { icon: () => ({ "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }), title: () => '相机权限', subTitle: () => '用于拍摄照片和视频', enabled: () => (this["__cameraEnabled"] ? this["__cameraEnabled"] : this["cameraEnabled"]), onChange: () => (isOn: boolean) => {
                this.cameraEnabled = isOn;
            } }));
        // 相册权限
        this.PermissionItem.bind(this)(makeBuilderParameterProxy("PermissionItem", { icon: () => ({ "id": 16777293, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }), title: () => '相册权限', subTitle: () => '用于访问和保存照片', enabled: () => (this["__albumEnabled"] ? this["__albumEnabled"] : this["albumEnabled"]), onChange: () => (isOn: boolean) => {
                this.albumEnabled = isOn;
            } }));
        // 位置信息
        this.PermissionItem.bind(this)(makeBuilderParameterProxy("PermissionItem", { icon: () => ({ "id": 16777294, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }), title: () => '位置信息', subTitle: () => '用于获取当前位置信息', enabled: () => (this["__locationEnabled"] ? this["__locationEnabled"] : this["locationEnabled"]), onChange: () => (isOn: boolean) => {
                this.locationEnabled = isOn;
            } }));
        // 消息推送
        this.PermissionItem.bind(this)(makeBuilderParameterProxy("PermissionItem", { icon: () => ({ "id": 16777252, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }), title: () => '消息推送', subTitle: () => '接收重要消息和活动通知', enabled: () => (this["__notificationEnabled"] ? this["__notificationEnabled"] : this["notificationEnabled"]), onChange: () => (isOn: boolean) => {
                this.notificationEnabled = isOn;
            } }));
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 权限设置说明
            Text.create('开启权限即代表您同意我们访问和使用相关功能，您可以随时在这里管理这些权限');
            // 权限设置说明
            Text.fontSize(14);
            // 权限设置说明
            Text.fontColor('#999999');
            // 权限设置说明
            Text.margin({ top: 24, left: 16, right: 16 });
            // 权限设置说明
            Text.textAlign(TextAlign.Center);
        }, Text);
        // 权限设置说明
        Text.pop();
        Column.pop();
        // 内容区域
        Scroll.pop();
        Column.pop();
    }
    PermissionItem(options: PermissionItemOptions, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
            Row.backgroundColor('#FFFFFF');
            Row.borderRadius(8);
            Row.margin({ left: 12, right: 12, top: 12 });
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
            Text.create(options.subTitle);
            Text.fontSize(14);
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Switch, isOn: options.enabled });
            Toggle.width(40);
            Toggle.height(24);
            Toggle.selectedColor('#16A34A');
            Toggle.onChange(options.onChange);
        }, Toggle);
        Toggle.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "PermissionPage";
    }
}
registerNamedRoute(() => new PermissionPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/quanxian", pageFullPath: "entry/src/main/ets/pages/quanxian", integratedHsp: "false", moduleType: "followWithHap" });
