if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    imgSrc?: string;
    videoSrc?: string;
}
import camera from "@ohos:multimedia.camera";
import picker from "@ohos:multimedia.cameraPicker";
import fileIo from "@ohos:file.fs";
import fileUri from "@ohos:file.fileuri";
import router from "@ohos:router";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__imgSrc = new ObservedPropertySimplePU('', this, "imgSrc");
        this.__videoSrc = new ObservedPropertySimplePU('', this, "videoSrc");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.imgSrc !== undefined) {
            this.imgSrc = params.imgSrc;
        }
        if (params.videoSrc !== undefined) {
            this.videoSrc = params.videoSrc;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__imgSrc.purgeDependencyOnElmtId(rmElmtId);
        this.__videoSrc.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__imgSrc.aboutToBeDeleted();
        this.__videoSrc.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __imgSrc: ObservedPropertySimplePU<string>;
    get imgSrc() {
        return this.__imgSrc.get();
    }
    set imgSrc(newValue: string) {
        this.__imgSrc.set(newValue);
    }
    private __videoSrc: ObservedPropertySimplePU<string>;
    get videoSrc() {
        return this.__videoSrc.get();
    }
    set videoSrc(newValue: string) {
        this.__videoSrc.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部栏
            Row.create();
            // 顶部栏
            Row.width('100%');
            // 顶部栏
            Row.justifyContent(FlexAlign.SpaceBetween);
            // 顶部栏
            Row.padding({
                left: 16,
                right: 16,
                top: 8,
                bottom: 8
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777233, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.onClick(() => {
                const params = router.getParams() as Record<string, string>;
                if (params?.from === 'addPlant') {
                    router.pushUrl({ url: 'pages/addPlant' });
                }
                else {
                    router.back();
                }
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('相机界面');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#166534');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 添加一个占位view以保持标题居中
            Row.create();
            // 添加一个占位view以保持标题居中
            Row.width(24);
        }, Row);
        // 添加一个占位view以保持标题居中
        Row.pop();
        // 顶部栏
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
            // 图片显示区域
            Column.create();
            // 图片显示区域
            Column.width('90%');
            // 图片显示区域
            Column.padding(16);
            // 图片显示区域
            Column.backgroundColor('#ffffff');
            // 图片显示区域
            Column.borderRadius(16);
            // 图片显示区域
            Column.margin({ top: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('拍摄的照片');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('＃556B2F');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.imgSrc);
            Image.width('100%');
            Image.height(200);
            Image.backgroundColor(Color.Black);
            Image.margin(5);
            Image.borderRadius(8);
        }, Image);
        // 图片显示区域
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 视频显示区域
            Column.create();
            // 视频显示区域
            Column.width('90%');
            // 视频显示区域
            Column.padding(16);
            // 视频显示区域
            Column.backgroundColor('#ffffff');
            // 视频显示区域
            Column.borderRadius(16);
            // 视频显示区域
            Column.margin({ top: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('拍摄的视频');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor('＃556B2F');
            Text.margin({ top: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Video.create({ src: this.videoSrc });
            Video.width('100%');
            Video.height(200);
            Video.autoPlay(true);
            Video.margin(5);
            Video.borderRadius(8);
        }, Video);
        // 视频显示区域
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 拍照和录像按钮
            Button.createWithLabel("Test Picker Photo&Video");
            // 拍照和录像按钮
            Button.fontSize(20);
            // 拍照和录像按钮
            Button.fontWeight(FontWeight.Bold);
            // 拍照和录像按钮
            Button.backgroundColor('#16a34a');
            // 拍照和录像按钮
            Button.fontColor('#ffffff');
            // 拍照和录像按钮
            Button.width('80%');
            // 拍照和录像按钮
            Button.padding(12);
            // 拍照和录像按钮
            Button.borderRadius(8);
            // 拍照和录像按钮
            Button.margin({ top: 16 });
            // 拍照和录像按钮
            Button.onClick(async () => {
                let pathDir = getContext().filesDir;
                let fileName = `${new Date().getTime()}`;
                let filePath = pathDir + `/${fileName}.tmp`;
                fileIo.createRandomAccessFileSync(filePath, fileIo.OpenMode.CREATE);
                let uri = fileUri.getUriFromPath(filePath);
                let pickerProfile: picker.PickerProfile = {
                    cameraPosition: camera.CameraPosition.CAMERA_POSITION_BACK,
                    saveUri: uri
                };
                let result: picker.PickerResult = await picker.pick(getContext(), [picker.PickerMediaType.PHOTO, picker.PickerMediaType.VIDEO], pickerProfile);
                console.info(`picker resultCode: ${result.resultCode},resultUri: ${result.resultUri},mediaType: ${result.mediaType}`);
                if (result.resultCode == 0) {
                    if (result.mediaType === picker.PickerMediaType.PHOTO) {
                        this.imgSrc = result.resultUri;
                    }
                    else {
                        this.videoSrc = result.resultUri;
                    }
                }
            });
        }, Button);
        // 拍照和录像按钮
        Button.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/Camera", pageFullPath: "entry/src/main/ets/pages/Camera", integratedHsp: "false", moduleType: "followWithHap" });
