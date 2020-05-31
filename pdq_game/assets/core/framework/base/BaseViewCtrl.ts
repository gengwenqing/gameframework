import BaseView from "./BaseView";
import { Mgrs } from "./BaseFramework";
import ViewEventMgr from "../Event/ViewEventMgr";
import NetMsgMgr from "../mgr/NetMsgMgr";
import ModelMgr from "../mgr/ModelMgr";
import UIMgr from "../mgr/UIMgr";

/**
 * 视图控制基础类;
 * @author parker
 * 2010-01-10
 */
export default class BaseViewCtrl extends cc.Component {
    /**组件类 */
    public view: BaseView;
    /**事件管理 */
    public eventMgr: ViewEventMgr;
    /**网络协议处理 */
    public netMsgMgr: NetMsgMgr;
    /**数据管理 */
    public modelMgr: ModelMgr;
    /**UI管理器 */
    public uiMgr: UIMgr;

    public constructor() {
        console.log("构建baseviewCtrl类");
        super();
    }

    /**
     * 创建时候,将管理器注入到viewCtrl
     * @param mgrs 管理器组
     */
    private __init__(mgrs: Mgrs, uiMgr: UIMgr): void {
        this.eventMgr = mgrs.viewEventMgr;
        this.netMsgMgr = mgrs.netMsgMgr;
        this.modelMgr = mgrs.modelMgr;
        this.uiMgr = uiMgr;
        this.view.event = this.eventMgr;
        this.init();
    }

    protected init(): void {

    }

    /**面板显示出来以后 */
    protected viewDidAppear(): void {

    }

    public onDestroy(): void {
        // super.onDestroy();
        this.destoryUi();
    }

    /**子类实现,删除监听事件,time函数,等其他 */
    public destoryUi():void{

    }

}