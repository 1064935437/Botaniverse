if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ShequPage_Params {
    subNavItems?: string[];
    currentSubNav?: number;
    tabItems?: string[];
    activeTab?: number;
    posts?: Post[];
}
import router from "@ohos:router";
// 定义帖子类型接口
interface Post {
    avatar: Resource;
    userName: string;
    postDate: string;
    title: string;
    content: string;
    images: Resource[];
    likes: number;
    comments: number;
    collections: number;
}
// 修改新帖子参数接口
interface NewPost {
    content: string;
    images: Resource[]; // 改为 Resource 类型
    location?: string;
}
interface RouterParams {
    newPost?: NewPost;
}
class ShequPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.subNavItems = ['推荐', '热门', '关注', '最新'];
        this.__currentSubNav = new ObservedPropertySimplePU(0
        // 底部导航数据
        , this, "currentSubNav");
        this.tabItems = ['社区', '任务', '发现', '我的'];
        this.__activeTab = new ObservedPropertySimplePU(0 // 确保在社区页时为0
        // 社区帖子数据
        , this, "activeTab");
        this.posts = [
            {
                avatar: { "id": 16777271, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
                userName: '绿色农场主',
                postDate: '2024-03-20',
                title: '春季蔬菜种植技巧分享',
                content: '今天给大家分享一下春季蔬菜种植的一些经验，希望对大家有帮助...',
                images: [{ "id": 16777256, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }, { "id": 16777257, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }],
                likes: 128,
                comments: 32,
                collections: 45
            },
            {
                avatar: { "id": 16777272, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
                userName: '田园达人',
                postDate: '2024-03-19',
                title: '防治小麦赤霉病经验',
                content: '最近天气多变，小麦容易染上赤霉病，分享一下我的防治方法...',
                images: [{ "id": 16777258, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }],
                likes: 256,
                comments: 64,
                collections: 89
            }
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ShequPage_Params) {
        if (params.subNavItems !== undefined) {
            this.subNavItems = params.subNavItems;
        }
        if (params.currentSubNav !== undefined) {
            this.currentSubNav = params.currentSubNav;
        }
        if (params.tabItems !== undefined) {
            this.tabItems = params.tabItems;
        }
        if (params.activeTab !== undefined) {
            this.activeTab = params.activeTab;
        }
        if (params.posts !== undefined) {
            this.posts = params.posts;
        }
    }
    updateStateVars(params: ShequPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentSubNav.purgeDependencyOnElmtId(rmElmtId);
        this.__activeTab.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentSubNav.aboutToBeDeleted();
        this.__activeTab.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 副标题导航数据
    private subNavItems: string[];
    private __currentSubNav: ObservedPropertySimplePU<number>;
    get currentSubNav() {
        return this.__currentSubNav.get();
    }
    set currentSubNav(newValue: number) {
        this.__currentSubNav.set(newValue);
    }
    // 底部导航数据
    private tabItems: string[];
    private __activeTab: ObservedPropertySimplePU<number>; // 确保在社区页时为0
    get activeTab() {
        return this.__activeTab.get();
    }
    set activeTab(newValue: number) {
        this.__activeTab.set(newValue);
    }
    // 社区帖子数据
    private posts: Post[];
    aboutToAppear() {
        try {
            const params = router.getParams() as RouterParams;
            if (params?.newPost) {
                const now = new Date();
                // 添加新帖子到列表开头
                this.posts.unshift({
                    avatar: { "id": 16777271, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" },
                    userName: '我的账号',
                    postDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
                    title: '',
                    content: params.newPost.content,
                    images: params.newPost.images,
                    likes: 0,
                    comments: 0,
                    collections: 0
                });
            }
        }
        catch (error) {
            console.error('添加新帖子失败:', error);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Bottom });
            Stack.width('100%');
            Stack.height('100%');
            Stack.backgroundColor('#f5f5f5');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部搜索栏
            Row.create();
            // 顶部搜索栏
            Row.width('100%');
            // 顶部搜索栏
            Row.padding(16);
            // 顶部搜索栏
            Row.backgroundColor('#ffffff');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 搜索框
            Row.create();
            // 搜索框
            Row.layoutWeight(1);
            // 搜索框
            Row.padding({ left: 12, right: 12 });
            // 搜索框
            Row.height(36);
            // 搜索框
            Row.borderRadius(18);
            // 搜索框
            Row.backgroundColor('#f5f5f5');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777249, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(20);
            Image.height(20);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '搜索帖子内容...' });
            TextInput.width('100%');
            TextInput.height(36);
            TextInput.backgroundColor('#f5f5f5');
            TextInput.margin({ left: 8 });
            TextInput.placeholderColor('#999999');
        }, TextInput);
        // 搜索框
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // AI问答按钮
            Button.createWithLabel('AI问答');
            // AI问答按钮
            Button.height(36);
            // AI问答按钮
            Button.fontSize(14);
            // AI问答按钮
            Button.fontColor('#16a34a');
            // AI问答按钮
            Button.backgroundColor(0x00000000);
            // AI问答按钮
            Button.margin({ left: 12 });
            // AI问答按钮
            Button.onClick(() => {
                router.pushUrl({
                    url: 'pages/AIxunfei'
                });
            });
        }, Button);
        // AI问答按钮
        Button.pop();
        // 顶部搜索栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 副标题导航
            Row.create();
            // 副标题导航
            Row.width('100%');
            // 副标题导航
            Row.padding(16);
            // 副标题导航
            Row.backgroundColor('#ffffff');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item);
                    Text.fontSize(14);
                    Text.fontWeight(this.currentSubNav === index ? FontWeight.Bold : FontWeight.Normal);
                    Text.fontColor(this.currentSubNav === index ? '#16a34a' : '#666666');
                    Text.margin({ right: 20 });
                    Text.onClick(() => {
                        this.currentSubNav = index;
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.subNavItems, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        // 副标题导航
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 社区帖子列表
            List.create();
            // 社区帖子列表
            List.width('100%');
            // 社区帖子列表
            List.layoutWeight(1);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const post = _item;
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
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.padding(16);
                            Column.backgroundColor('#ffffff');
                            Column.borderRadius(8);
                            Column.margin({ bottom: 8 });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // 用户信息行
                            Row.create();
                            // 用户信息行
                            Row.width('100%');
                            // 用户信息行
                            Row.padding({ top: 12, bottom: 12 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(post.avatar);
                            Image.width(40);
                            Image.height(40);
                            Image.borderRadius(20);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.alignItems(HorizontalAlign.Start);
                            Column.margin({ left: 12 });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(post.userName);
                            Text.fontSize(16);
                            Text.fontWeight(FontWeight.Medium);
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(post.postDate);
                            Text.fontSize(12);
                            Text.fontColor('#999999');
                        }, Text);
                        Text.pop();
                        Column.pop();
                        // 用户信息行
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // 帖子内容
                            Text.create(post.title);
                            // 帖子内容
                            Text.fontSize(18);
                            // 帖子内容
                            Text.fontWeight(FontWeight.Bold);
                            // 帖子内容
                            Text.margin({ bottom: 8 });
                            // 帖子内容
                            Text.alignSelf(ItemAlign.Start);
                        }, Text);
                        // 帖子内容
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(post.content);
                            Text.fontSize(14);
                            Text.margin({ bottom: 12 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // 图片网格
                            Grid.create();
                            // 图片网格
                            Grid.columnsTemplate('1fr 1fr 1fr');
                            // 图片网格
                            Grid.columnsGap(8);
                            // 图片网格
                            Grid.rowsGap(8);
                            // 图片网格
                            Grid.margin({ bottom: 12 });
                        }, Grid);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            ForEach.create();
                            const forEachItemGenFunction = _item => {
                                const image = _item;
                                {
                                    const itemCreation2 = (elmtId, isInitialRender) => {
                                        GridItem.create(() => { }, false);
                                    };
                                    const observedDeepRender = () => {
                                        this.observeComponentCreation2(itemCreation2, GridItem);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Image.create(image);
                                            Image.width('100%');
                                            Image.height(100);
                                            Image.borderRadius(8);
                                        }, Image);
                                        GridItem.pop();
                                    };
                                    observedDeepRender();
                                }
                            };
                            this.forEachUpdateFunction(elmtId, post.images, forEachItemGenFunction);
                        }, ForEach);
                        ForEach.pop();
                        // 图片网格
                        Grid.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            // 互动数据行
                            Row.create();
                            // 互动数据行
                            Row.width('100%');
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 16777247, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                            Image.width(16);
                            Image.height(16);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(post.likes.toString());
                            Text.fontSize(14);
                            Text.margin({ left: 4 });
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ left: 16 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 16777245, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                            Image.width(16);
                            Image.height(16);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(post.comments.toString());
                            Text.fontSize(14);
                            Text.margin({ left: 4 });
                        }, Text);
                        Text.pop();
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.margin({ left: 16 });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 16777244, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                            Image.width(16);
                            Image.height(16);
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(post.collections.toString());
                            Text.fontSize(14);
                            Text.margin({ left: 4 });
                        }, Text);
                        Text.pop();
                        Row.pop();
                        // 互动数据行
                        Row.pop();
                        Column.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.posts, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 社区帖子列表
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部导航栏
            Row.create();
            // 底部导航栏
            Row.width('100%');
            // 底部导航栏
            Row.height(56);
            // 底部导航栏
            Row.backgroundColor('#ffffff');
            // 底部导航栏
            Row.justifyContent(FlexAlign.SpaceAround);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.onClick(() => {
                        if (index === 0) { // 社区
                            this.activeTab = index; // 保持在社区页面
                        }
                        else if (index === 1) { // 任务
                            router.pushUrl({
                                url: 'pages/renwu'
                            });
                        }
                        else if (index === 2) { // 发现
                            router.pushUrl({
                                url: 'pages/faxian'
                            });
                        }
                        else if (index === 3) { // 我的
                            router.pushUrl({
                                url: 'pages/wode'
                            });
                        }
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(index === this.activeTab ? { "id": -1, "type": -1, params: [`app.media.tab_${item}_active`], "bundleName": "com.example.myapplication", "moduleName": "entry" } : { "id": -1, "type": -1, params: [`app.media.tab_${item}_normal`], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                    Image.width(24);
                    Image.height(36);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item);
                    Text.fontSize(12);
                    Text.fontColor(index === this.activeTab ? '#16a34a' : '#666666');
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.tabItems, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        // 底部导航栏
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 悬浮发布按钮
            Button.createWithChild({ type: ButtonType.Circle });
            // 悬浮发布按钮
            Button.width(56);
            // 悬浮发布按钮
            Button.height(56);
            // 悬浮发布按钮
            Button.backgroundColor('#16a34a');
            // 悬浮发布按钮
            Button.position({ x: '80%', y: '85%' });
            // 悬浮发布按钮
            Button.onClick(() => {
                router.pushUrl({
                    url: 'pages/riji'
                });
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('+');
            Text.fontSize(30);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#ffffff');
        }, Text);
        Text.pop();
        // 悬浮发布按钮
        Button.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ShequPage";
    }
}
registerNamedRoute(() => new ShequPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/shequ", pageFullPath: "entry/src/main/ets/pages/shequ", integratedHsp: "false", moduleType: "followWithHap" });
