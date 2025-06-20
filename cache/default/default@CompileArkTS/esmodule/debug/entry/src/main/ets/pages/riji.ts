if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface EditPost_Params {
    content?: string;
    selectedImages?: Array<string>;
    location?: string;
    isPublic?: boolean;
    maxImageCount?: number;
    context?;
}
import router from "@ohos:router";
import picker from "@ohos:file.picker";
import type common from "@ohos:app.ability.common";
// 添加新帖子数据接口
interface NewPostData {
    content: string;
    images: string[];
    location: string;
}
// 添加路由参数接口
interface RouterParams {
    newPost: NewPostData;
}
class EditPost extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__content = new ObservedPropertySimplePU('', this, "content");
        this.__selectedImages = new ObservedPropertyObjectPU([], this, "selectedImages");
        this.__location = new ObservedPropertySimplePU('', this, "location");
        this.__isPublic = new ObservedPropertySimplePU(true, this, "isPublic");
        this.maxImageCount = 9;
        this.context = getContext(this) as common.UIAbilityContext;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: EditPost_Params) {
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.selectedImages !== undefined) {
            this.selectedImages = params.selectedImages;
        }
        if (params.location !== undefined) {
            this.location = params.location;
        }
        if (params.isPublic !== undefined) {
            this.isPublic = params.isPublic;
        }
        if (params.maxImageCount !== undefined) {
            this.maxImageCount = params.maxImageCount;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    updateStateVars(params: EditPost_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__content.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedImages.purgeDependencyOnElmtId(rmElmtId);
        this.__location.purgeDependencyOnElmtId(rmElmtId);
        this.__isPublic.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__content.aboutToBeDeleted();
        this.__selectedImages.aboutToBeDeleted();
        this.__location.aboutToBeDeleted();
        this.__isPublic.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __content: ObservedPropertySimplePU<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private __selectedImages: ObservedPropertyObjectPU<Array<string>>;
    get selectedImages() {
        return this.__selectedImages.get();
    }
    set selectedImages(newValue: Array<string>) {
        this.__selectedImages.set(newValue);
    }
    private __location: ObservedPropertySimplePU<string>;
    get location() {
        return this.__location.get();
    }
    set location(newValue: string) {
        this.__location.set(newValue);
    }
    private __isPublic: ObservedPropertySimplePU<boolean>;
    get isPublic() {
        return this.__isPublic.get();
    }
    set isPublic(newValue: boolean) {
        this.__isPublic.set(newValue);
    }
    private maxImageCount: number;
    private context;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部导航栏
            Row.create();
            // 顶部导航栏
            Row.width('100%');
            // 顶部导航栏
            Row.padding({ left: 16, right: 16 });
            // 顶部导航栏
            Row.height(56);
            // 顶部导航栏
            Row.justifyContent(FlexAlign.SpaceBetween);
            // 顶部导航栏
            Row.alignItems(VerticalAlign.Center);
            // 顶部导航栏
            Row.backgroundColor(Color.White);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777243, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.onClick(() => {
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('发布动态');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发布');
            Button.fontSize(16);
            Button.fontColor('#16A34A');
            Button.backgroundColor(0x00000000);
            Button.onClick(() => {
                this.publishPost();
            });
        }, Button);
        Button.pop();
        // 顶部导航栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.layoutWeight(1);
            Scroll.backgroundColor('#F5F5F5');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 文本输入区
            TextArea.create({ placeholder: '分享此刻的想法...' });
            // 文本输入区
            TextArea.height(200);
            // 文本输入区
            TextArea.fontSize(16);
            // 文本输入区
            TextArea.backgroundColor(Color.White);
            // 文本输入区
            TextArea.margin({ top: -120 });
            // 文本输入区
            TextArea.onChange((value: string) => {
                this.content = value;
            });
        }, TextArea);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 图片选择网格
            Grid.create();
            // 图片选择网格
            Grid.columnsTemplate('1fr 1fr 1fr');
            // 图片选择网格
            Grid.rowsGap(8);
            // 图片选择网格
            Grid.columnsGap(8);
            // 图片选择网格
            Grid.padding(16);
            // 图片选择网格
            Grid.height(240);
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index?: number) => {
                const image = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Stack.create();
                        }, Stack);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(image);
                            Image.width('100%');
                            Image.height('100%');
                            Image.borderRadius(8);
                            Image.objectFit(ImageFit.Cover);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 16777246, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                            Image.width(20);
                            Image.height(20);
                            Image.position({ x: '85%', y: '5%' });
                            Image.onClick(() => {
                                if (index !== undefined) {
                                    this.removeImage(index);
                                }
                            });
                        }, Image);
                        Stack.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.selectedImages, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedImages.length < this.maxImageCount) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        const itemCreation2 = (elmtId, isInitialRender) => {
                            GridItem.create(() => { }, false);
                        };
                        const observedDeepRender = () => {
                            this.observeComponentCreation2(itemCreation2, GridItem);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                                Column.height('100%');
                                Column.justifyContent(FlexAlign.Center);
                                Column.backgroundColor('#F5F5F5');
                                Column.borderRadius(8);
                                Column.onClick(() => {
                                    this.selectImages();
                                });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 16777241, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                                Image.width(32);
                                Image.height(32);
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('添加图片');
                                Text.fontSize(12);
                                Text.margin({ top: 4 });
                            }, Text);
                            Text.pop();
                            Column.pop();
                            GridItem.pop();
                        };
                        observedDeepRender();
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 图片选择网格
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部功能区
            Column.create();
            // 底部功能区
            Column.backgroundColor(Color.White);
            // 底部功能区
            Column.margin({ top: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.onClick(() => {
                this.selectLocation();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777248, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.location || '所在位置');
            Text.fontSize(14);
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('#F0F0F0');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.onClick(() => {
                this.showPrivacySelector();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('谁可以看');
            Text.fontSize(14);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.isPublic ? '公开' : '仅自己可见');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(16);
            Image.height(16);
            Image.margin({ left: 4 });
        }, Image);
        Row.pop();
        Row.pop();
        // 底部功能区
        Column.pop();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    async selectImages() {
        try {
            let photoPickerObj: picker.PhotoViewPicker = new picker.PhotoViewPicker();
            let photoResult: picker.PhotoSelectResult = await photoPickerObj.select({
                MIMEType: picker.PhotoViewMIMETypes.IMAGE_TYPE,
                maxSelectNumber: this.maxImageCount - this.selectedImages.length
            });
            if (photoResult && photoResult.photoUris) {
                this.selectedImages = this.selectedImages.concat(photoResult.photoUris);
            }
        }
        catch (err) {
            console.error(`选择图片失败: ${err.message}`);
        }
    }
    removeImage(index: number) {
        this.selectedImages = this.selectedImages.filter((_, i) => i !== index);
    }
    selectLocation() {
        // TODO: 实现位置选择功能
    }
    showPrivacySelector() {
        // TODO: 实现隐私设置
    }
    publishPost() {
        if (this.content.trim() !== '' || this.selectedImages.length > 0) {
            // 构建符合接口的新帖子数据
            const newPost: NewPostData = {
                content: this.content,
                images: this.selectedImages,
                location: this.location
            };
            // 构造符合接口的路由参数
            const params: RouterParams = {
                newPost: newPost
            };
            router.replaceUrl({
                url: 'pages/shequ',
                params: params
            });
        }
        else {
            console.info('发布内容不能为空');
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "EditPost";
    }
}
registerNamedRoute(() => new EditPost(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/riji", pageFullPath: "entry/src/main/ets/pages/riji", integratedHsp: "false", moduleType: "followWithHap" });
