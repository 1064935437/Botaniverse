if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RegisterPage_Params {
    username?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    notes?: string;
    errorMessage?: string;
    loading?: boolean;
}
import router from "@ohos:router";
import accountService from "@normalized:N&&&entry/src/main/ets/pages/test11&";
class RegisterPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__username = new ObservedPropertySimplePU('', this, "username");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__confirmPassword = new ObservedPropertySimplePU('', this, "confirmPassword");
        this.__email = new ObservedPropertySimplePU('', this, "email");
        this.__notes = new ObservedPropertySimplePU('', this, "notes");
        this.__errorMessage = new ObservedPropertySimplePU('', this, "errorMessage");
        this.__loading = new ObservedPropertySimplePU(false, this, "loading");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RegisterPage_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.confirmPassword !== undefined) {
            this.confirmPassword = params.confirmPassword;
        }
        if (params.email !== undefined) {
            this.email = params.email;
        }
        if (params.notes !== undefined) {
            this.notes = params.notes;
        }
        if (params.errorMessage !== undefined) {
            this.errorMessage = params.errorMessage;
        }
        if (params.loading !== undefined) {
            this.loading = params.loading;
        }
    }
    updateStateVars(params: RegisterPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__email.purgeDependencyOnElmtId(rmElmtId);
        this.__notes.purgeDependencyOnElmtId(rmElmtId);
        this.__errorMessage.purgeDependencyOnElmtId(rmElmtId);
        this.__loading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__confirmPassword.aboutToBeDeleted();
        this.__email.aboutToBeDeleted();
        this.__notes.aboutToBeDeleted();
        this.__errorMessage.aboutToBeDeleted();
        this.__loading.aboutToBeDeleted();
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
    private __confirmPassword: ObservedPropertySimplePU<string>;
    get confirmPassword() {
        return this.__confirmPassword.get();
    }
    set confirmPassword(newValue: string) {
        this.__confirmPassword.set(newValue);
    }
    private __email: ObservedPropertySimplePU<string>;
    get email() {
        return this.__email.get();
    }
    set email(newValue: string) {
        this.__email.set(newValue);
    }
    private __notes: ObservedPropertySimplePU<string>;
    get notes() {
        return this.__notes.get();
    }
    set notes(newValue: string) {
        this.__notes.set(newValue);
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('账号注册');
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ top: 50, bottom: 30 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
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
            // 确认密码输入
            TextInput.create({ placeholder: '请再次输入密码', text: this.confirmPassword });
            // 确认密码输入
            TextInput.type(InputType.Password);
            // 确认密码输入
            TextInput.onChange((value: string) => { this.confirmPassword = value; });
            // 确认密码输入
            TextInput.width('90%');
            // 确认密码输入
            TextInput.margin({ bottom: 20 });
            // 确认密码输入
            TextInput.padding(10);
            // 确认密码输入
            TextInput.backgroundColor('#F5F5F5');
            // 确认密码输入
            TextInput.borderRadius(8);
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 邮箱输入
            TextInput.create({ placeholder: '请输入邮箱', text: this.email });
            // 邮箱输入
            TextInput.type(InputType.Email);
            // 邮箱输入
            TextInput.onChange((value: string) => { this.email = value; });
            // 邮箱输入
            TextInput.width('90%');
            // 邮箱输入
            TextInput.margin({ bottom: 20 });
            // 邮箱输入
            TextInput.padding(10);
            // 邮箱输入
            TextInput.backgroundColor('#F5F5F5');
            // 邮箱输入
            TextInput.borderRadius(8);
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 备注输入
            TextInput.create({ placeholder: '备注信息（选填）', text: this.notes });
            // 备注输入
            TextInput.type(InputType.Normal);
            // 备注输入
            TextInput.onChange((value: string) => { this.notes = value; });
            // 备注输入
            TextInput.width('90%');
            // 备注输入
            TextInput.height(100);
            // 备注输入
            TextInput.margin({ bottom: 30 });
            // 备注输入
            TextInput.padding(10);
            // 备注输入
            TextInput.backgroundColor('#F5F5F5');
            // 备注输入
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
            // 注册按钮
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 注册按钮
            Button.createWithLabel(this.loading ? '注册中...' : '注册');
            // 注册按钮
            Button.width('90%');
            // 注册按钮
            Button.height(50);
            // 注册按钮
            Button.backgroundColor('#007DFF');
            // 注册按钮
            Button.fontColor('#FFFFFF');
            // 注册按钮
            Button.fontSize(18);
            // 注册按钮
            Button.onClick(() => this.handleRegister());
            // 注册按钮
            Button.enabled(!this.loading);
        }, Button);
        // 注册按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 已有账号，去登录
            Row.create();
            // 已有账号，去登录
            Row.margin({ top: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('已有账号？');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('去登录');
            Text.fontSize(14);
            Text.fontColor('#007DFF');
            Text.onClick(() => {
                router.pushUrl({
                    url: 'pages/LoginPage'
                });
            });
        }, Text);
        Text.pop();
        // 已有账号，去登录
        Row.pop();
        Column.pop();
        Column.pop();
    }
    async handleRegister() {
        if (!this.username) {
            this.errorMessage = '请输入用户名';
            return;
        }
        if (!this.password) {
            this.errorMessage = '请输入密码';
            return;
        }
        if (this.password !== this.confirmPassword) {
            this.errorMessage = '两次输入的密码不一致';
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (this.email && !emailRegex.test(this.email)) {
            this.errorMessage = '请输入有效的邮箱地址';
            return;
        }
        this.loading = true;
        this.errorMessage = '';
        try {
            const result = await accountService.registerAccount({
                platform: this.username,
                username: this.username,
                password: this.password,
                email: this.email,
                notes: this.notes
            });
            if (result.success) {
                router.pushUrl({
                    url: 'pages/LoginPage',
                    params: { message: '注册成功，请登录' }
                });
            }
            else {
                this.errorMessage = result.message;
            }
        }
        catch (error) {
            this.errorMessage = '注册失败，请稍后再试';
        }
        finally {
            this.loading = false;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "RegisterPage";
    }
}
registerNamedRoute(() => new RegisterPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/test22", pageFullPath: "entry/src/main/ets/pages/test22", integratedHsp: "false", moduleType: "followWithHap" });
