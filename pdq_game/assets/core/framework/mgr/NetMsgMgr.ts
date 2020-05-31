import App from "../../../Script/App";
import GlobalEventDef from "../GlobalEventDef";

/**
 * NetMsgMgr 网络消息处理类
 * @author parker
 * 2020-01-10
 */
export default class NetMsgMgr {

    public constructor() {
        App.GlobalEventMgr.addEventListener(GlobalEventDef.DISPENSE_MESSAGE, this.disposeFunc, this);
        /**模拟服务器消息 */
        App.GlobalEventMgr.dispatchEvent(GlobalEventDef.DISPENSE_MESSAGE, "服务器下发消息内容:.........");
    }

    /**处理消息 */
    private disposeFunc(...args): void {
        console.log([args]);
    }
}