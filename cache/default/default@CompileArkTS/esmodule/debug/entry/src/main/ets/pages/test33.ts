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
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 页面标题
            Text.create('账号登录');
            // 页面标题
            Text.fontSize(28);
            // 页面标题
            Text.fontWeight(FontWeight.Bold);
            // 页面标题
            Text.margin({ top: 50, bottom: 30 });
        }, Text);
        // 页面标题
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
            // 表单区域
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 表单区域
            Column.create();
            // 表单区域
            Column.width('100%');
            // 表单区域
            Column.padding({ left: 20, right: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 用户名输入
            TextInput.create({ placeholder: '请输入用户名', text: this.username });
            // 用户名输入
            TextInput.type(InputType.Normal);
            // 用户名输入
            TextInput.onChange((value: string) => { this.username = value; });
            // 用户名输入
            TextInput.width('90%');
            // 用户名输入
            TextInput.margin({ bottom: 20 });
            // 用户名输入
            TextInput.padding(10);
            // 用户名输入
            TextInput.backgroundColor('#F5F5F5');
            // 用户名输入
            TextInput.borderRadius(8);
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 密码输入
            TextInput.create({ placeholder: '请输入密码', text: this.password });
            // 密码输入
            TextInput.type(InputType.Password);
            // 密码输入
            TextInput.onChange((value: string) => { this.password = value; });
            // 密码输入
            TextInput.width('90%');
            // 密码输入
            TextInput.margin({ bottom: 20 });
            // 密码输入
            TextInput.padding(10);
            // 密码输入
            TextInput.backgroundColor('#F5F5F5');
            // 密码输入
            TextInput.borderRadius(8);
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 错误提示
            if (this.errorMessage) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.errorMessage);
                        Text.fontSize(14);
                        Text.fontColor('#FF0000');
                        Text.margin({ bottom: 20 });
                    }, Text);
                    Text.pop();
                });
            }
            // 登录按钮
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 登录按钮
            Button.createWithLabel(this.loading ? '登录中...' : '登录');
            // 登录按钮
            Button.width('90%');
            // 登录按钮
            Button.height(50);
            // 登录按钮
            Button.backgroundColor('#007DFF');
            // 登录按钮
            Button.fontColor('#FFFFFF');
            // 登录按钮
            Button.fontSize(18);
            // 登录按钮
            Button.onClick(() => this.handleLogin());
            // 登录按钮
            Button.enabled(!this.loading);
        }, Button);
        // 登录按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 没有账号，去注册
            Row.create();
            // 没有账号，去注册
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('没有账号？');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('去注册');
            Text.fontSize(14);
            Text.fontColor('#007DFF');
            Text.onClick(() => {
                router.pushUrl({
                    url: 'pages/RegisterPage'
                });
            });
        }, Text);
        Text.pop();
        // 没有账号，去注册
        Row.pop();
        // 表单区域
        Column.pop();
        Column.pop();
    }
    // 处理登录逻辑
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
            // 调用登录服务
            const result = await accountService.login(this.username, this.password);
            if (result.success) {
                // 登录成功，跳转到社区页面
                router.pushUrl({
                    url: 'pages/shequ',
                    params: {
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
registerNamedRoute(() => new LoginPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/test33", pageFullPath: "entry/src/main/ets/pages/test33", integratedHsp: "false", moduleType: "followWithHap" });
