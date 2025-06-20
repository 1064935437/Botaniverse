if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoginPage_Params {
    username?: string;
    password?: string;
    errorMessage?: string;
    loading?: boolean;
    loginMessage?: string;
}
import router from "@ohos:router";
import accountService from "@normalized:N&&&entry/src/main/ets/pages/test11&";
import userStore from "@normalized:N&&&entry/src/main/ets/pages/userStore&";
class LoginPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__username = new ObservedPropertySimplePU('', this, "username");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__errorMessage = new ObservedPropertySimplePU('', this, "errorMessage");
        this.__loading = new ObservedPropertySimplePU(false, this, "loading");
        this.__loginMessage = new ObservedPropertySimplePU('', this, "loginMessage");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoginPage_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.errorMessage !== undefined) {
            this.errorMessage = params.errorMessage;
        }
        if (params.loading !== undefined) {
            this.loading = params.loading;
        }
        if (params.loginMessage !== undefined) {
            this.loginMessage = params.loginMessage;
        }
    }
    updateStateVars(params: LoginPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__errorMessage.purgeDependencyOnElmtId(rmElmtId);
        this.__loading.purgeDependencyOnElmtId(rmElmtId);
        this.__loginMessage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__errorMessage.aboutToBeDeleted();
        this.__loading.aboutToBeDeleted();
        this.__loginMessage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __username: ObservedPropertySimplePU<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    private __password: ObservedPropertySimplePU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    private __errorMessage: ObservedPropertySimplePU<string>;
    get errorMessage() {
        return this.__errorMessage.get();
    }
    set errorMessage(newValue: string) {
        this.__errorMessage.set(newValue);
    }
    private __loading: ObservedPropertySimplePU<boolean>;
    get loading() {
        return this.__loading.get();
    }
    set loading(newValue: boolean) {
        this.__loading.set(newValue);
    }
    private __loginMessage: ObservedPropertySimplePU<string>;
    get loginMessage() {
        return this.__loginMessage.get();
    }
    set loginMessage(newValue: string) {
        this.__loginMessage.set(newValue);
    }
    aboutToAppear() {
        // 获取注册成功后的提示信息
        const params = router.getParams() as Record<string, string>;
        if (params && params.message) {
            this.loginMessage = params.message;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#ffffff');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部品牌区域 - 保留原始风格
            Image.create({ "id": 16777231, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            // 顶部品牌区域 - 保留原始风格
            Image.width(150);
            // 顶部品牌区域 - 保留原始风格
            Image.height(150);
            // 顶部品牌区域 - 保留原始风格
            Image.borderRadius(50);
            // 顶部品牌区域 - 保留原始风格
            Image.margin({ top: 80 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Botaniverse');
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#166534');
            Text.margin({ top: 16, bottom: 60 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 登录提示信息
            if (this.loginMessage) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.loginMessage);
                        Text.fontSize(14);
                        Text.fontColor('#008000');
                        Text.margin({ bottom: 20 });
                    }, Text);
                    Text.pop();
                });
            }
            // 表单区域 - 使用原始风格
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 表单区域 - 使用原始风格
            Column.create();
            // 表单区域 - 使用原始风格
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户名输入
            TextInput.create({ placeholder: '请输入用户名', text: this.username });
            // 用户名输入
            TextInput.type(InputType.Normal);
            // 用户名输入
            TextInput.onChange((value: string) => { this.username = value; });
            // 用户名输入
            TextInput.width('85%');
            // 用户名输入
            TextInput.height(45);
            // 用户名输入
            TextInput.backgroundColor('rgba(220, 252, 231, 0.6)');
            // 用户名输入
            TextInput.borderRadius(8);
            // 用户名输入
            TextInput.margin({ bottom: 8 });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 密码输入
            TextInput.create({ placeholder: '请输入密码', text: this.password });
            // 密码输入
            TextInput.type(InputType.Password);
            // 密码输入
            TextInput.onChange((value: string) => { this.password = value; });
            // 密码输入
            TextInput.width('85%');
            // 密码输入
            TextInput.height(45);
            // 密码输入
            TextInput.backgroundColor('rgba(220, 252, 231, 0.6)');
            // 密码输入
            TextInput.borderRadius(8);
            // 密码输入
            TextInput.margin({ bottom: 40 });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 错误提示
            if (this.errorMessage) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.errorMessage);
                        Text.fontSize(12);
                        Text.fontColor('#dc2626');
                        Text.margin({ bottom: 8 });
                    }, Text);
                    Text.pop();
                });
            }
            // 登录按钮 - 使用原始风格
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 登录按钮 - 使用原始风格
            Button.createWithLabel(this.loading ? '登录中...' : '登 录');
            // 登录按钮 - 使用原始风格
            Button.width('85%');
            // 登录按钮 - 使用原始风格
            Button.height(45);
            // 登录按钮 - 使用原始风格
            Button.backgroundColor('#16a34a');
            // 登录按钮 - 使用原始风格
            Button.fontColor('#FFFFFF');
            // 登录按钮 - 使用原始风格
            Button.fontSize(18);
            // 登录按钮 - 使用原始风格
            Button.borderRadius(8);
            // 登录按钮 - 使用原始风格
            Button.opacity(0.9);
            // 登录按钮 - 使用原始风格
            Button.onClick(() => this.handleLogin());
            // 登录按钮 - 使用原始风格
            Button.enabled(!this.loading);
        }, Button);
        // 登录按钮 - 使用原始风格
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部链接 - 保留原始风格
            Row.create();
            // 底部链接 - 保留原始风格
            Row.width('85%');
            // 底部链接 - 保留原始风格
            Row.justifyContent(FlexAlign.SpaceBetween);
            // 底部链接 - 保留原始风格
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('注册账号');
            Text.fontColor('#16a34a');
            Text.onClick(() => {
                router.pushUrl({
                    url: 'pages/zhuce'
                });
            });
        }, Text);
        Text.pop();
        // 底部链接 - 保留原始风格
        Row.pop();
        // 表单区域 - 使用原始风格
        Column.pop();
        Column.pop();
    }
    // 处理登录逻辑 - 保留改进后的功能
    async handleLogin() {
        // 验证表单
        if (!this.username) {
            this.errorMessage = '请输入用户名';
            return;
        }
        if (!this.password) {
            this.errorMessage = '请输入密码';
            return;
        }
        // 显示加载状态
        this.loading = true;
        this.errorMessage = '';
        try {
            const result = await accountService.login(this.username, this.password);
            if (result.success) {
                // 保存用户名到全局状态
                userStore.setUsername(this.username);
                router.pushUrl({
                    url: 'pages/shequ',
                    params: {
                        username: this.username,
                        user: result.user
                    }
                });
            }
            else {
                // 登录失败，显示错误信息
                this.errorMessage = result.message;
            }
        }
        catch (error) {
            this.errorMessage = '登录失败，请稍后再试';
        }
        finally {
            // 隐藏加载状态
            this.loading = false;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "LoginPage";
    }
}
registerNamedRoute(() => new LoginPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
