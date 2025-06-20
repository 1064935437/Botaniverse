if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TaskPage_Params {
    activeTab?: number;
    selectedFilter?: number;
    isManageMode?: boolean;
    selectedTasks?: Set<number>;
    tasks?: TaskItem[];
    tabItems?: string[];
    filterItems?: string[];
}
import router from "@ohos:router";
class TaskItem {
    id: number;
    icon: Resource;
    title: string;
    time: string;
    plant: string;
    plantImage: Resource;
    completed: boolean;
    constructor(id: number, icon: Resource, title: string, time: string, plant: string, plantImage: Resource, completed: boolean = false) {
        this.id = id;
        this.icon = icon;
        this.title = title;
        this.time = time;
        this.plant = plant;
        this.plantImage = plantImage;
        this.completed = completed;
    }
}
interface NewTaskParams {
    title: string;
    time: string;
    plant: string;
    icon?: Resource;
    plantImage?: Resource;
}
interface RouterParams {
    newTask?: NewTaskParams;
}
interface AddPlantParams {
    from: string;
}
class TaskPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__activeTab = new ObservedPropertySimplePU(1, this, "activeTab");
        this.__selectedFilter = new ObservedPropertySimplePU(0, this, "selectedFilter");
        this.__isManageMode = new ObservedPropertySimplePU(false, this, "isManageMode");
        this.__selectedTasks = new ObservedPropertyObjectPU(new Set(), this, "selectedTasks");
        this.__tasks = new ObservedPropertyObjectPU([
            new TaskItem(1, { "id": 16777273, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }, '给多肉浇水', '2024-06-16 15:00', '多肉植物', { "id": 16777269, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }),
            new TaskItem(2, { "id": 16777266, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }, '修剪罗勒叶片', '2024-06-17 10:00', '罗勒', { "id": 16777234, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" })
        ], this, "tasks");
        this.tabItems = ['社区', '任务', '发现', '我的'];
        this.filterItems = ['全部', '待办', '已完成', '已过期'];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TaskPage_Params) {
        if (params.activeTab !== undefined) {
            this.activeTab = params.activeTab;
        }
        if (params.selectedFilter !== undefined) {
            this.selectedFilter = params.selectedFilter;
        }
        if (params.isManageMode !== undefined) {
            this.isManageMode = params.isManageMode;
        }
        if (params.selectedTasks !== undefined) {
            this.selectedTasks = params.selectedTasks;
        }
        if (params.tasks !== undefined) {
            this.tasks = params.tasks;
        }
        if (params.tabItems !== undefined) {
            this.tabItems = params.tabItems;
        }
        if (params.filterItems !== undefined) {
            this.filterItems = params.filterItems;
        }
    }
    updateStateVars(params: TaskPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__activeTab.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedFilter.purgeDependencyOnElmtId(rmElmtId);
        this.__isManageMode.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedTasks.purgeDependencyOnElmtId(rmElmtId);
        this.__tasks.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__activeTab.aboutToBeDeleted();
        this.__selectedFilter.aboutToBeDeleted();
        this.__isManageMode.aboutToBeDeleted();
        this.__selectedTasks.aboutToBeDeleted();
        this.__tasks.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __activeTab: ObservedPropertySimplePU<number>;
    get activeTab() {
        return this.__activeTab.get();
    }
    set activeTab(newValue: number) {
        this.__activeTab.set(newValue);
    }
    private __selectedFilter: ObservedPropertySimplePU<number>;
    get selectedFilter() {
        return this.__selectedFilter.get();
    }
    set selectedFilter(newValue: number) {
        this.__selectedFilter.set(newValue);
    }
    private __isManageMode: ObservedPropertySimplePU<boolean>;
    get isManageMode() {
        return this.__isManageMode.get();
    }
    set isManageMode(newValue: boolean) {
        this.__isManageMode.set(newValue);
    }
    private __selectedTasks: ObservedPropertyObjectPU<Set<number>>;
    get selectedTasks() {
        return this.__selectedTasks.get();
    }
    set selectedTasks(newValue: Set<number>) {
        this.__selectedTasks.set(newValue);
    }
    private __tasks: ObservedPropertyObjectPU<TaskItem[]>;
    get tasks() {
        return this.__tasks.get();
    }
    set tasks(newValue: TaskItem[]) {
        this.__tasks.set(newValue);
    }
    aboutToAppear() {
        try {
            const params = router.getParams() as RouterParams;
            if (params?.newTask) {
                const newTask: NewTaskParams = params.newTask;
                this.tasks = [...this.tasks, new TaskItem(this.tasks.length + 1, newTask.icon ?? { "id": 16777273, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }, newTask.title, newTask.time, newTask.plant, newTask.plantImage ?? { "id": 16777269, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" }, false)];
            }
        }
        catch (error) {
            console.error('添加任务失败:', error);
        }
    }
    readonly tabItems: string[];
    readonly filterItems: string[];
    getFilteredTasks(): TaskItem[] {
        const now = new Date();
        switch (this.selectedFilter) {
            case 0: // 全部
                return this.tasks;
            case 1: // 待办
                return this.tasks.filter(task => !task.completed && new Date(task.time) >= now);
            case 2: // 已完成
                return this.tasks.filter(task => task.completed);
            case 3: // 已过期
                return this.tasks.filter(task => !task.completed && new Date(task.time) < now);
            default:
                return this.tasks;
        }
    }
    TaskContent(task: TaskItem, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(task.icon);
            Image.width(24);
            Image.height(24);
            Image.fillColor('#16a34a');
            Image.margin({ right: 12 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(task.title);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Medium);
            Text.decoration({ type: task.completed ? TextDecorationType.LineThrough : TextDecorationType.None });
            Text.fontColor(task.completed ? '#999999' : '#333333');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(task.time);
            Text.fontSize(12);
            Text.fontColor(new Date(task.time) < new Date() && !task.completed ? '#ef4444' : '#666666');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(task.plantImage);
            Image.width(24);
            Image.height(24);
            Image.borderRadius(12);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(task.plant);
            Text.fontSize(12);
            Text.fontColor('#666666');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#f8fafc');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部栏
            Row.create();
            // 顶部栏
            Row.width('100%');
            // 顶部栏
            Row.justifyContent(FlexAlign.SpaceBetween);
            // 顶部栏
            Row.padding({ left: 16, right: 16, top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('任务');
            Text.fontSize(28);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.backgroundColor('transparent');
            Button.onClick(() => {
                this.isManageMode = !this.isManageMode;
                if (!this.isManageMode) {
                    this.selectedTasks.clear();
                }
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.isManageMode ? '完成' : '管理');
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Normal);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        Button.pop();
        // 顶部栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 搜索栏
            Row.create();
            // 搜索栏
            Row.width('90%');
            // 搜索栏
            Row.padding(12);
            // 搜索栏
            Row.backgroundColor('#f1f5f9');
            // 搜索栏
            Row.borderRadius(8);
            // 搜索栏
            Row.margin({ top: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777267, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
            Image.width(20);
            Image.height(20);
            Image.fillColor('#666666');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '搜索任务或植物' });
            TextInput.backgroundColor('transparent');
            TextInput.placeholderColor('#999999');
            TextInput.fontSize(14);
            TextInput.margin({ left: 8 });
        }, TextInput);
        // 搜索栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 筛选标签
            Row.create();
            // 筛选标签
            Row.width('90%');
            // 筛选标签
            Row.margin({ top: 16, bottom: 16 });
            // 筛选标签
            Row.justifyContent(FlexAlign.SpaceAround);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item);
                    Text.fontSize(14);
                    Text.fontColor(this.selectedFilter === index ? '#ffffff' : '#666666');
                    Text.backgroundColor(this.selectedFilter === index ? '#16a34a' : 'transparent');
                    Text.padding({ left: 12, right: 12, top: 6, bottom: 6 });
                    Text.borderRadius(16);
                    Text.onClick(() => {
                        this.selectedFilter = index;
                    });
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.filterItems, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        // 筛选标签
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 任务列表
            List.create();
            // 任务列表
            List.width('90%');
            // 任务列表
            List.height('100%');
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const task = _item;
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
                        ListItem.backgroundColor(task.completed ? '#f3f4f6' : '#ffffff');
                        ListItem.opacity(task.completed ? 0.8 : 1);
                        ListItem.borderRadius(12);
                        ListItem.margin({ bottom: 12 });
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width('100%');
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.padding(16);
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (this.isManageMode) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Checkbox.create();
                                        Checkbox.select(this.selectedTasks.has(task.id));
                                        Checkbox.selectedColor('#16a34a');
                                        Checkbox.margin({ right: 12 });
                                        Checkbox.onChange((value: boolean) => {
                                            if (value) {
                                                this.selectedTasks.add(task.id);
                                            }
                                            else {
                                                this.selectedTasks.delete(task.id);
                                            }
                                        });
                                    }, Checkbox);
                                    Checkbox.pop();
                                });
                            }
                            // 修改这里：删除 TaskContent 上的 layoutWeight
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                });
                            }
                        }, If);
                        If.pop();
                        // 修改这里：删除 TaskContent 上的 layoutWeight
                        this.TaskContent.bind(this)(task);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (!this.isManageMode) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Checkbox.create({ name: task.id.toString(), group: 'tasks' });
                                        Checkbox.select(task.completed);
                                        Checkbox.selectedColor('#16a34a');
                                        Checkbox.onChange((value: boolean) => {
                                            task.completed = value;
                                            this.tasks = [...this.tasks];
                                        });
                                    }, Checkbox);
                                    Checkbox.pop();
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
            this.forEachUpdateFunction(elmtId, this.getFilteredTasks(), forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 任务列表
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 管理模式下的底部操作栏
            if (this.isManageMode) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.height(50);
                        Row.padding({ left: 16, right: 16 });
                        Row.backgroundColor('#ffffff');
                        Row.justifyContent(FlexAlign.SpaceBetween);
                        Row.position({ y: '93%' });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Checkbox.create();
                        Checkbox.select(this.selectedTasks.size === this.tasks.length);
                        Checkbox.selectedColor('#16a34a');
                        Checkbox.onChange((value: boolean) => {
                            if (value) {
                                this.tasks.forEach(task => this.selectedTasks.add(task.id));
                            }
                            else {
                                this.selectedTasks.clear();
                            }
                        });
                    }, Checkbox);
                    Checkbox.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('全选');
                        Text.fontSize(14);
                        Text.fontColor('#666666');
                        Text.margin({ left: 8 });
                    }, Text);
                    Text.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('完成选中');
                        Button.backgroundColor('#16a34a');
                        Button.fontSize(14);
                        Button.height(32);
                        Button.margin({ right: 12 });
                        Button.onClick(() => {
                            this.tasks = this.tasks.map(task => {
                                if (this.selectedTasks.has(task.id)) {
                                    task.completed = true;
                                }
                                return task;
                            });
                            this.selectedTasks.clear();
                        });
                    }, Button);
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('删除');
                        Button.backgroundColor('#ef4444');
                        Button.fontSize(14);
                        Button.height(32);
                        Button.onClick(() => {
                            this.tasks = this.tasks.filter(task => !this.selectedTasks.has(task.id));
                            this.selectedTasks.clear();
                        });
                    }, Button);
                    Button.pop();
                    Row.pop();
                    Row.pop();
                });
            }
            // 浮动添加按钮
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 浮动添加按钮
            if (!this.isManageMode) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithChild({ type: ButtonType.Circle });
                        Button.width(56);
                        Button.height(56);
                        Button.backgroundColor('#16a34a');
                        Button.position({ x: '80%', y: '85%' });
                        Button.onClick(() => {
                            const params: AddPlantParams = {
                                from: 'task'
                            };
                            router.pushUrl({
                                url: 'pages/addPlant',
                                params: params
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
                    Button.pop();
                });
            }
            // 底部导航栏
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 底部导航栏
            if (!this.isManageMode) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.backgroundColor('#ffffff');
                        Row.position({ y: '93%' });
                        Row.justifyContent(FlexAlign.SpaceAround);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = (_item, index: number) => {
                            const item = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.onClick(() => {
                                    if (index === 0) {
                                        router.pushUrl({ url: 'pages/shequ' });
                                    }
                                    else if (index === 1) {
                                        this.activeTab = index;
                                    }
                                    else if (index === 2) {
                                        router.pushUrl({ url: 'pages/faxian' });
                                    }
                                    else if (index === 3) {
                                        router.pushUrl({ url: 'pages/wode' });
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
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "TaskPage";
    }
}
registerNamedRoute(() => new TaskPage(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/renwu", pageFullPath: "entry/src/main/ets/pages/renwu", integratedHsp: "false", moduleType: "followWithHap" });
