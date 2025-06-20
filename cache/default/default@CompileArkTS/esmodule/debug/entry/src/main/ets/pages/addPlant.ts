if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AddPlantPage_Params {
    plantImage?: string;
    plantName?: string;
    plantType?: string;
    growthDays?: number;
    wateringFrequency?: string;
    lightRequirement?: string;
    notes?: string;
    taskTitle?: string;
    taskTime?: string;
}
import router from "@ohos:router";
// 添加任务数据接口
interface TaskData {
    title: string;
    plant: string;
    time: string;
    icon: Resource;
    plantImage: Resource | string;
}
// 添加路由参数接口
interface RouterParams {
    newTask: TaskData;
}
class AddPlantPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__plantImage = new ObservedPropertySimplePU('', this, "plantImage");
        this.__plantName = new ObservedPropertySimplePU('', this, "plantName");
        this.__plantType = new ObservedPropertySimplePU('', this, "plantType");
        this.__growthDays = new ObservedPropertySimplePU(7, this, "growthDays");
        this.__wateringFrequency = new ObservedPropertySimplePU('每天一次', this, "wateringFrequency");
        this.__lightRequirement = new ObservedPropertySimplePU('充足阳光', this, "lightRequirement");
        this.__notes = new ObservedPropertySimplePU(''
        // 添加任务相关状态变量
        , this, "notes");
        this.__taskTitle = new ObservedPropertySimplePU('', this, "taskTitle");
        this.__taskTime = new ObservedPropertySimplePU('', this, "taskTime");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AddPlantPage_Params) {
        if (params.plantImage !== undefined) {
            this.plantImage = params.plantImage;
        }
        if (params.plantName !== undefined) {
            this.plantName = params.plantName;
        }
        if (params.plantType !== undefined) {
            this.plantType = params.plantType;
        }
        if (params.growthDays !== undefined) {
            this.growthDays = params.growthDays;
        }
        if (params.wateringFrequency !== undefined) {
            this.wateringFrequency = params.wateringFrequency;
        }
        if (params.lightRequirement !== undefined) {
            this.lightRequirement = params.lightRequirement;
        }
        if (params.notes !== undefined) {
            this.notes = params.notes;
        }
        if (params.taskTitle !== undefined) {
            this.taskTitle = params.taskTitle;
        }
        if (params.taskTime !== undefined) {
            this.taskTime = params.taskTime;
        }
    }
    updateStateVars(params: AddPlantPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__plantImage.purgeDependencyOnElmtId(rmElmtId);
        this.__plantName.purgeDependencyOnElmtId(rmElmtId);
        this.__plantType.purgeDependencyOnElmtId(rmElmtId);
        this.__growthDays.purgeDependencyOnElmtId(rmElmtId);
        this.__wateringFrequency.purgeDependencyOnElmtId(rmElmtId);
        this.__lightRequirement.purgeDependencyOnElmtId(rmElmtId);
        this.__notes.purgeDependencyOnElmtId(rmElmtId);
        this.__taskTitle.purgeDependencyOnElmtId(rmElmtId);
        this.__taskTime.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__plantImage.aboutToBeDeleted();
        this.__plantName.aboutToBeDeleted();
        this.__plantType.aboutToBeDeleted();
        this.__growthDays.aboutToBeDeleted();
        this.__wateringFrequency.aboutToBeDeleted();
        this.__lightRequirement.aboutToBeDeleted();
        this.__notes.aboutToBeDeleted();
        this.__taskTitle.aboutToBeDeleted();
        this.__taskTime.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __plantImage: ObservedPropertySimplePU<string>;
    get plantImage() {
        return this.__plantImage.get();
    }
    set plantImage(newValue: string) {
        this.__plantImage.set(newValue);
    }
    private __plantName: ObservedPropertySimplePU<string>;
    get plantName() {
        return this.__plantName.get();
    }
    set plantName(newValue: string) {
        this.__plantName.set(newValue);
    }
    private __plantType: ObservedPropertySimplePU<string>;
    get plantType() {
        return this.__plantType.get();
    }
    set plantType(newValue: string) {
        this.__plantType.set(newValue);
    }
    private __growthDays: ObservedPropertySimplePU<number>;
    get growthDays() {
        return this.__growthDays.get();
    }
    set growthDays(newValue: number) {
        this.__growthDays.set(newValue);
    }
    private __wateringFrequency: ObservedPropertySimplePU<string>;
    get wateringFrequency() {
        return this.__wateringFrequency.get();
    }
    set wateringFrequency(newValue: string) {
        this.__wateringFrequency.set(newValue);
    }
    private __lightRequirement: ObservedPropertySimplePU<string>;
    get lightRequirement() {
        return this.__lightRequirement.get();
    }
    set lightRequirement(newValue: string) {
        this.__lightRequirement.set(newValue);
    }
    private __notes: ObservedPropertySimplePU<string>;
    get notes() {
        return this.__notes.get();
    }
    set notes(newValue: string) {
        this.__notes.set(newValue);
    }
    // 添加任务相关状态变量
    private __taskTitle: ObservedPropertySimplePU<string>;
    get taskTitle() {
        return this.__taskTitle.get();
    }
    set taskTitle(newValue: string) {
        this.__taskTitle.set(newValue);
    }
    private __taskTime: ObservedPropertySimplePU<string>;
    get taskTime() {
        return this.__taskTime.get();
    }
    set taskTime(newValue: string) {
        this.__taskTime.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#ffffff');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部栏
            Row.create();
            // 顶部栏
            Row.width('100%');
            // 顶部栏
            Row.padding({
                left: 16,
                right: 16,
                top: 8,
                bottom: 8
            });
            // 顶部栏
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777233, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(24);
            Image.height(24);
            Image.onClick(() => {
                const params = router.getParams() as Record<string, string>;
                if (params?.from === 'task') {
                    router.pushUrl({ url: 'pages/renwu' });
                }
                else {
                    router.back();
                }
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('添加植物');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        // 顶部栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 将整个内容区域放入滚动容器
            Scroll.create();
            // 将整个内容区域放入滚动容器
            Scroll.scrollable(ScrollDirection.Vertical);
            // 将整个内容区域放入滚动容器
            Scroll.edgeEffect(EdgeEffect.Spring);
            // 将整个内容区域放入滚动容器
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding(16);
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 图片上传区域
            Column.create();
            // 图片上传区域
            Column.width('100%');
            // 图片上传区域
            Column.height(200);
            // 图片上传区域
            Column.backgroundColor('#f3f4f6');
            // 图片上传区域
            Column.borderRadius(8);
            // 图片上传区域
            Column.margin({ top: 16 });
            // 图片上传区域
            Column.onClick(() => {
                router.pushUrl({
                    url: 'pages/Camera',
                    params: {
                        from: 'addPlant'
                    }
                });
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.plantImage === '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height('100%');
                        Column.justifyContent(FlexAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Image.width(40);
                        Image.height(40);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('点击上传植物图片');
                        Text.fontSize(14);
                        Text.margin({ top: 8 });
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.plantImage);
                        Image.width('100%');
                        Image.height(200);
                        Image.borderRadius(8);
                        Image.objectFit(ImageFit.Cover);
                    }, Image);
                });
            }
        }, If);
        If.pop();
        // 图片上传区域
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 植物信息表单
            TextInput.create({ placeholder: '请输入植物名称' });
            // 植物信息表单
            TextInput.width('100%');
            // 植物信息表单
            TextInput.height(48);
            // 植物信息表单
            TextInput.margin({ top: 16 });
            // 植物信息表单
            TextInput.onChange((value: string) => {
                this.plantName = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create([
                { value: '多肉植物' },
                { value: '观叶植物' },
                { value: '草本植物' }
            ]);
            Select.width('100%');
            Select.margin({ top: 16 });
            Select.selected(0);
            Select.onSelect((index: number) => {
                this.plantType = index.toString();
            });
        }, Select);
        Select.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 生长周期滑块
            Text.create('生长周期（天）');
            // 生长周期滑块
            Text.fontSize(14);
            // 生长周期滑块
            Text.margin({ top: 16 });
        }, Text);
        // 生长周期滑块
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Slider.create({
                min: 7,
                max: 365,
                step: 1,
                value: this.growthDays
            });
            Slider.width('100%');
            Slider.onChange((value: number) => {
                this.growthDays = value;
            });
        }, Slider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('7天');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('365天');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 浇水频率
            Row.create();
            // 浇水频率
            Row.width('100%');
            // 浇水频率
            Row.margin({ top: 16 });
            // 浇水频率
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Radio.create({ value: '每天一次', group: 'watering' });
            Radio.checked(true);
            Radio.onChange((value: boolean) => {
                if (value)
                    this.wateringFrequency = '每天一次';
            });
        }, Radio);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('每天一次');
            Text.fontSize(14);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Radio.create({ value: '每周2-3次', group: 'watering' });
            Radio.onChange((value: boolean) => {
                if (value)
                    this.wateringFrequency = '每周2-3次';
            });
        }, Radio);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('每周2-3次');
            Text.fontSize(14);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Radio.create({ value: '每周一次', group: 'watering' });
            Radio.onChange((value: boolean) => {
                if (value)
                    this.wateringFrequency = '每周一次';
            });
        }, Radio);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('每周一次');
            Text.fontSize(14);
        }, Text);
        Text.pop();
        // 浇水频率
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 光照需求
            Row.create();
            // 光照需求
            Row.width('100%');
            // 光照需求
            Row.margin({ top: 16 });
            // 光照需求
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Radio.create({ value: '充足阳光', group: 'light' });
            Radio.checked(true);
            Radio.onChange((value: boolean) => {
                if (value)
                    this.lightRequirement = '充足阳光';
            });
        }, Radio);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('充足阳光');
            Text.fontSize(14);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Radio.create({ value: '散射光', group: 'light' });
            Radio.onChange((value: boolean) => {
                if (value)
                    this.lightRequirement = '散射光';
            });
        }, Radio);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('散射光');
            Text.fontSize(14);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Radio.create({ value: '阴凉', group: 'light' });
            Radio.onChange((value: boolean) => {
                if (value)
                    this.lightRequirement = '阴凉';
            });
        }, Radio);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('阴凉');
            Text.fontSize(14);
        }, Text);
        Text.pop();
        // 光照需求
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 备注信息
            TextArea.create({ placeholder: '备注信息（选填）' });
            // 备注信息
            TextArea.width('100%');
            // 备注信息
            TextArea.height(100);
            // 备注信息
            TextArea.margin({ top: 16 });
            // 备注信息
            TextArea.onChange((value: string) => {
                this.notes = value;
            });
        }, TextArea);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 提交按钮
            Button.createWithLabel('确认添加');
            // 提交按钮
            Button.width('100%');
            // 提交按钮
            Button.height(48);
            // 提交按钮
            Button.margin({ top: 24, bottom: 24 });
            // 提交按钮
            Button.backgroundColor('#16a34a');
            // 提交按钮
            Button.onClick(() => {
                // 使用接口定义构造任务数据
                const taskData: TaskData = {
                    title: `给${this.plantName}${this.wateringFrequency}浇水`,
                    plant: this.plantName,
                    time: '今天 ' + new Date().getHours() + ':00',
                    icon: { "id": 16777273, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
                    plantImage: this.plantImage ? this.plantImage : { "id": 16777269, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }
                };
                // 构造符合接口的路由参数
                const routerParams: RouterParams = {
                    newTask: taskData
                };
                router.replaceUrl({
                    url: 'pages/renwu',
                    params: routerParams
                });
            });
        }, Button);
        // 提交按钮
        Button.pop();
        Column.pop();
        // 将整个内容区域放入滚动容器
        Scroll.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AddPlantPage";
    }
}
registerNamedRoute(() => new AddPlantPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/addPlant", pageFullPath: "entry/src/main/ets/pages/addPlant", integratedHsp: "false", moduleType: "followWithHap" });
