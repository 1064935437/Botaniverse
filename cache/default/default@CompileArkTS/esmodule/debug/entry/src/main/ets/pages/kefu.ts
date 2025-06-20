if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface CustomerServicePage_Params {
    inputText?: string;
    commonQuestions?: string[];
}
import router from "@ohos:router";
class CustomerServicePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__inputText = new ObservedPropertySimplePU('', this, "inputText");
        this.__commonQuestions = new ObservedPropertyObjectPU([
            '如何修改个人信息？',
            '怎么更换头像？',
            '如何解绑手机号？',
            '忘记密码怎么办？',
            '如何注销账号？'
        ], this, "commonQuestions");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CustomerServicePage_Params) {
        if (params.inputText !== undefined) {
            this.inputText = params.inputText;
        }
        if (params.commonQuestions !== undefined) {
            this.commonQuestions = params.commonQuestions;
        }
    }
    updateStateVars(params: CustomerServicePage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__inputText.purgeDependencyOnElmtId(rmElmtId);
        this.__commonQuestions.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__inputText.aboutToBeDeleted();
        this.__commonQuestions.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __inputText: ObservedPropertySimplePU<string>;
    get inputText() {
        return this.__inputText.get();
    }
    set inputText(newValue: string) {
        this.__inputText.set(newValue);
    }
    private __commonQuestions: ObservedPropertyObjectPU<string[]>;
    get commonQuestions() {
        return this.__commonQuestions.get();
    }
    set commonQuestions(newValue: string[]) {
        this.__commonQuestions.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
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
            Text.create('在线客服');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 16 });
        }, Text);
        Text.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 聊天区域
            Scroll.create();
            // 聊天区域
            Scroll.layoutWeight(1);
            // 聊天区域
            Scroll.backgroundColor('#F5F7FA');
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 欢迎消息
            Row.create();
            // 欢迎消息
            Row.width('100%');
            // 欢迎消息
            Row.padding(16);
            // 欢迎消息
            Row.alignItems(VerticalAlign.Top);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777287, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(40);
            Image.height(40);
            Image.margin({ right: 12 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('您好，我是智能客服小助手，请问有什么可以帮您？');
            Text.fontSize(16);
            Text.fontColor('#333333');
            Text.backgroundColor('#F0F0F0');
            Text.padding(12);
            Text.borderRadius(8);
        }, Text);
        Text.pop();
        Column.pop();
        // 欢迎消息
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 常见问题推荐
            Column.create();
            // 常见问题推荐
            Column.width('100%');
            // 常见问题推荐
            Column.padding(16);
            // 常见问题推荐
            Column.backgroundColor('#FFFFFF');
            // 常见问题推荐
            Column.borderRadius(12);
            // 常见问题推荐
            Column.margin(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('常见问题');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ bottom: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const question = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(question);
                    Button.width('100%');
                    Button.height(44);
                    Button.fontSize(14);
                    Button.fontColor('#333333');
                    Button.backgroundColor('#F5F5F5');
                    Button.margin({ bottom: 8 });
                    Button.borderRadius(22);
                    Button.onClick(() => {
                        this.inputText = question;
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.commonQuestions, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 常见问题推荐
        Column.pop();
        Column.pop();
        // 聊天区域
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部输入框
            Row.create();
            // 底部输入框
            Row.width('100%');
            // 底部输入框
            Row.padding(16);
            // 底部输入框
            Row.backgroundColor('#FFFFFF');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请输入您的问题', text: this.inputText });
            TextInput.width('80%');
            TextInput.height(40);
            TextInput.backgroundColor('#F5F5F5');
            TextInput.borderRadius(20);
            TextInput.padding({ left: 16, right: 16 });
            TextInput.onChange((value: string) => {
                this.inputText = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发送');
            Button.width(72);
            Button.height(40);
            Button.fontSize(16);
            Button.fontColor('#FFFFFF');
            Button.backgroundColor('#16A34A');
            Button.borderRadius(20);
            Button.margin({ left: 8 });
            Button.onClick(() => {
                if (this.inputText.trim() !== '') {
                    console.info('发送消息:', this.inputText);
                    this.inputText = '';
                }
            });
        }, Button);
        Button.pop();
        // 底部输入框
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "CustomerServicePage";
    }
}
registerNamedRoute(() => new CustomerServicePage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/kefu", pageFullPath: "entry/src/main/ets/pages/kefu", integratedHsp: "false", moduleType: "followWithHap" });
