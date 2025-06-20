if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Triangle_Params {
}
interface ChatWindow_Params {
    userInput?: string;
    chatHistory?: ChatMessage[];
    isLoading?: boolean;
    errorMessage?: string;
    API_PASSWORD?: string;
    API_URL?: string;
}
import http from "@ohos:net.http";
// base64Encode 函数必须放在 import 之后
function base64Encode(str: string): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let encoded = '';
    let c1: number, c2: number, c3: number;
    let i = 0;
    while (i < str.length) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == str.length) {
            encoded += chars.charAt(c1 >> 2);
            encoded += chars.charAt((c1 & 0x3) << 4);
            encoded += '==';
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == str.length) {
            encoded += chars.charAt(c1 >> 2);
            encoded += chars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            encoded += chars.charAt((c2 & 0xF) << 2);
            encoded += '=';
            break;
        }
        c3 = str.charCodeAt(i++);
        encoded += chars.charAt(c1 >> 2);
        encoded += chars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        encoded += chars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        encoded += chars.charAt(c3 & 0x3F);
    }
    return encoded;
}
// 聊天消息类型
interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}
// 讯飞星火API响应类型
interface XunfeiMessage {
    role: string;
    content: string;
}
interface XunfeiChoice {
    message: XunfeiMessage;
}
interface XunfeiResponse {
    choices: XunfeiChoice[];
}
// 请求头类型
interface HttpHeaders {
    'Content-Type': string;
    'Authorization': string;
}
// http请求参数类型
interface HttpRequestOptions {
    method: http.RequestMethod;
    header: HttpHeaders;
    extraData: string;
}
// 讯飞星火API请求体类型
interface XunfeiRequestBody {
    model: string;
    messages: XunfeiMessage[];
    temperature: number;
    max_tokens: number;
}
interface ErrorWithMessage {
    message?: string;
}
class ChatWindow extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__userInput = new ObservedPropertySimplePU('', this, "userInput");
        this.__chatHistory = new ObservedPropertyObjectPU([], this, "chatHistory");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.__errorMessage = new ObservedPropertySimplePU('', this, "errorMessage");
        this.API_PASSWORD = 'WQqZwuZLPmEVrnWSDRLt:oOWpKcByfsLFRhNODaHi';
        this.API_URL = 'https://spark-api-open.xf-yun.com/v2/chat/completions';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ChatWindow_Params) {
        if (params.userInput !== undefined) {
            this.userInput = params.userInput;
        }
        if (params.chatHistory !== undefined) {
            this.chatHistory = params.chatHistory;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.errorMessage !== undefined) {
            this.errorMessage = params.errorMessage;
        }
        if (params.API_PASSWORD !== undefined) {
            this.API_PASSWORD = params.API_PASSWORD;
        }
        if (params.API_URL !== undefined) {
            this.API_URL = params.API_URL;
        }
    }
    updateStateVars(params: ChatWindow_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__userInput.purgeDependencyOnElmtId(rmElmtId);
        this.__chatHistory.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__errorMessage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__userInput.aboutToBeDeleted();
        this.__chatHistory.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__errorMessage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __userInput: ObservedPropertySimplePU<string>;
    get userInput() {
        return this.__userInput.get();
    }
    set userInput(newValue: string) {
        this.__userInput.set(newValue);
    }
    private __chatHistory: ObservedPropertyObjectPU<ChatMessage[]>;
    get chatHistory() {
        return this.__chatHistory.get();
    }
    set chatHistory(newValue: ChatMessage[]) {
        this.__chatHistory.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __errorMessage: ObservedPropertySimplePU<string>;
    get errorMessage() {
        return this.__errorMessage.get();
    }
    set errorMessage(newValue: string) {
        this.__errorMessage.set(newValue);
    }
    // 讯飞星火API配置
    private readonly API_PASSWORD: string;
    private readonly API_URL: string;
    // 生成Basic Auth
    private getBasicAuth(): string {
        const base64: string = base64Encode(this.API_PASSWORD);
        return `Basic ${base64}`;
    }
    // 发送消息到讯飞星火
    private async sendToXunfei() {
        if (!this.userInput.trim() || this.isLoading)
            return;
        this.errorMessage = '';
        try {
            this.isLoading = true;
            const userMessage: ChatMessage = {
                role: 'user',
                content: this.userInput
            };
            // 添加用户消息到历史记录
            this.chatHistory = [...this.chatHistory, userMessage];
            this.userInput = '';
            // 构造请求体
            const messages: XunfeiMessage[] = this.chatHistory.map((msg: ChatMessage): XunfeiMessage => {
                return {
                    role: msg.role,
                    content: msg.content
                };
            });
            const requestData: XunfeiRequestBody = {
                model: "spark-x1",
                messages: messages,
                temperature: 0.7,
                max_tokens: 2048
            };
            const headers: HttpHeaders = {
                'Content-Type': 'application/json',
                'Authorization': this.getBasicAuth()
            };
            const options: HttpRequestOptions = {
                method: http.RequestMethod.POST,
                header: headers,
                extraData: JSON.stringify(requestData)
            };
            const httpRequest = http.createHttp();
            const response = await httpRequest.request(this.API_URL, options);
            if (response.responseCode === 200) {
                const result: XunfeiResponse = JSON.parse(response.result.toString());
                if (result.choices && result.choices.length > 0) {
                    const aiMessage: ChatMessage = {
                        role: 'assistant',
                        content: result.choices[0].message.content
                    };
                    this.chatHistory = [...this.chatHistory, aiMessage];
                }
                else {
                    this.errorMessage = `讯飞星火API响应异常`;
                }
            }
            else {
                this.errorMessage = `请求失败: ${response.responseCode}`;
            }
        }
        catch (error) {
            let msg = '';
            if (typeof error === 'object' && error !== null) {
                msg = (error as ErrorWithMessage).message ?? String(error);
            }
            else {
                msg = String(error);
            }
            this.errorMessage = `发生错误: ${msg}`;
        }
        finally {
            this.isLoading = false;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.padding(15);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部标题栏
            Text.create('种植知识AI智能问答');
            // 顶部标题栏
            Text.fontSize(24);
            // 顶部标题栏
            Text.fontWeight(FontWeight.Bold);
            // 顶部标题栏
            Text.margin({ top: 16, bottom: 12 });
            // 顶部标题栏
            Text.width('100%');
            // 顶部标题栏
            Text.textAlign(TextAlign.Center);
        }, Text);
        // 顶部标题栏
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 聊天历史显示区域
            List.create();
            // 聊天历史显示区域
            List.width('100%');
            // 聊天历史显示区域
            List.height('85%');
            // 聊天历史显示区域
            List.margin({ top: 10, bottom: 10 });
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const message = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        itemCreation2(elmtId, isInitialRender);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.width('100%');
                        ListItem.margin({ top: 8, bottom: 8 });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.justifyContent(message.role === 'user' ? FlexAlign.End : FlexAlign.Start);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.padding(12);
                            Column.borderRadius(12);
                            Column.backgroundColor(message.role === 'user' ? '#dcfce7' : '#f0fdf4');
                            Column.overlay(() => {
                                if (message.role === 'user') {
                                    return Triangle()
                                        .width(10)
                                        .height(10)
                                        .backgroundColor('#e6f7ff')
                                        .position({ x: '100%', y: '50%' })
                                        .margin({ right: -5 })
                                        .rotate({ angle: 45 });
                                }
                                else {
                                    return Triangle()
                                        .width(10)
                                        .height(10)
                                        .backgroundColor('#f5f5f5')
                                        .position({ x: -5, y: '50%' })
                                        .margin({ left: -5 })
                                        .rotate({ angle: 45 });
                                }
                            });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(message.role === 'user' ? '用户' : '科大讯飞AI');
                            Text.fontSize(14);
                            Text.fontColor('#666');
                            Text.margin({ bottom: 4 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(message.content);
                            Text.fontSize(16);
                        }, Text);
                        Text.pop();
                        Column.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (message.role === 'user') {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // 请确保 resources/base/media 目录下有 avatar_default.png
                                        Image.create({ "id": 16777232, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                                        // 请确保 resources/base/media 目录下有 avatar_default.png
                                        Image.width(40);
                                        // 请确保 resources/base/media 目录下有 avatar_default.png
                                        Image.height(40);
                                        // 请确保 resources/base/media 目录下有 avatar_default.png
                                        Image.margin({ left: 10 });
                                        // 请确保 resources/base/media 目录下有 avatar_default.png
                                        Image.borderRadius(20);
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
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.chatHistory, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 聊天历史显示区域
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 错误消息显示
            if (this.errorMessage) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.errorMessage);
                        Text.fontSize(14);
                        Text.fontColor('#f5222d');
                        Text.width('100%');
                        Text.textAlign(TextAlign.Center);
                        Text.margin({ bottom: 10 });
                    }, Text);
                    Text.pop();
                });
            }
            // 加载指示器
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 加载指示器
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.color('#1890ff');
                        LoadingProgress.width(30);
                        LoadingProgress.height(30);
                        LoadingProgress.margin({ bottom: 10 });
                    }, LoadingProgress);
                });
            }
            // 输入区域
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 输入区域
            Row.create();
            // 输入区域
            Row.width('90%');
            // 输入区域
            Row.margin({ bottom: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create();
            TextInput.type(InputType.Normal);
            TextInput.width('80%');
            TextInput.height(40);
            TextInput.margin({ right: 10 });
            TextInput.borderRadius(20);
            TextInput.backgroundColor('#f5f5f5');
            TextInput.padding({ left: 15 });
            TextInput.onChange((value: string) => {
                this.userInput = value;
            });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('发送');
            Button.width('20%');
            Button.height(40);
            Button.onClick((): Promise<void> => this.sendToXunfei());
            Button.backgroundColor('#16a34a');
            Button.fontColor('#ffffff');
            Button.borderRadius(20);
        }, Button);
        Button.pop();
        // 输入区域
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ChatWindow";
    }
}
class Triangle extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Triangle_Params) {
    }
    updateStateVars(params: Triangle_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Polygon.create();
            Polygon.width(10);
            Polygon.height(10);
            Polygon.points([[0, 0], [10, 0], [0, 10]]);
        }, Polygon);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
registerNamedRoute(() => new ChatWindow(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/AIxunfei", pageFullPath: "entry/src/main/ets/pages/AIxunfei", integratedHsp: "false", moduleType: "followWithHap" });
