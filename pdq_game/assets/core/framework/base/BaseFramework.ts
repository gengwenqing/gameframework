import UIMgr from "../mgr/UIMgr";
import NetMsgMgr from "../mgr/NetMsgMgr";
import ModelBase from "./BaseModel";
import ModelMgr from "../mgr/ModelMgr";
import ViewRegister from "../mgr/ViewRegister";
import RegisterDef from "../RegisterDef";
import ViewEventMgr from "../Event/ViewEventMgr";
import BaseModel from "./BaseModel";

/**
 * framework 基类
 * @author parker
 * 2020-01-10
 */

export default class BaseFramework extends cc.Component {
    /**frameWork唯一标识 */
    public id: number;
    /**ui管理 */
    public uiMgr: UIMgr;
    /**通知管理 */
    public viewEvent: ViewEventMgr;
    /**网络协议管理 */
    public netMsgMgr: NetMsgMgr;
    /**数据管理 */
    public modelMgr: ModelMgr;
    /**视图注册类 */
    public viewRegister: ViewRegister;

    /**需要下发的属性对象 */
    public mgrs: Mgrs;

    /**初始化 */
    private __init__(rootNode, model): void {
        this.viewEvent = new ViewEventMgr(this.id);
        this.netMsgMgr = new NetMsgMgr();
        this.modelMgr = new ModelMgr(model);
        this.viewRegister = new ViewRegister();
        this.mgrs = new Mgrs(this.viewEvent, this.netMsgMgr, this.modelMgr);
        this.uiMgr = new UIMgr(this.viewRegister, this.mgrs, rootNode);
        this.registerView();
        this.init();
    }
    /**注册该framework下的所有视图 */
    protected registerView(): void {

    }

    protected init(): void {

    }

    /**删除供外部强行调用 */
    private __destroy__(): void {
        //管理器的删除
        //this.uiMgr.destory()
        //this.notify.destory();
        //this.netMsgMgr.destory();
        //this.modelMgr.destroy();
        //this.mode.destroy();
        this.destroy();
    }

    /**
     * 子类实现,删除自己对应的资源和事件 等
     */
    public destroy(): boolean {
        return false;
    }

}

/**
 * 管理封装  
 * 用于下发到viewCtrl
 * @author parker
 * 2020-01-13
 */
export class Mgrs {
    /**通知管理 */
    public viewEventMgr: ViewEventMgr;
    /**网络协议管理 */
    public netMsgMgr: NetMsgMgr;
    /**数据管理 */
    public modelMgr: ModelMgr;

    public constructor(veMgr: ViewEventMgr, nmMgr: NetMsgMgr, mMgr: ModelMgr) {
        this.viewEventMgr = veMgr;
        this.netMsgMgr = nmMgr;
        this.modelMgr = mMgr;
    }
}

