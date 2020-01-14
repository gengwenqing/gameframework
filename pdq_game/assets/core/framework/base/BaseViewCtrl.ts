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

    public constructor() {
        super();
    }

    /**
     * 创建时候,将管理器注入到viewCtrl
     * @param mgrs 管理器组
     */
    private __init__(mgrs: Mgrs): void {
        this.eventMgr = mgrs.viewEventMgr;
        this.netMsgMgr = mgrs.netMsgMgr;
        this.modelMgr = mgrs.modelMgr;

        this.init();
    }

    protected init(): void {

    }

    public viewDidAppear(): void {

    }
}