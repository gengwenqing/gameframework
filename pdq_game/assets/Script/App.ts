import FrameWorkMgr from "../core/framework/mgr/FrameWorkMgr";
import HallFrameWork from "./HallFrameWork";
import GlobalEventMgr from "../core/framework/Event/GlobalEventMgr";
import HallModel from "../core/model/HallModel";

/**
 * 游戏入口
 * @author parker
 * 2020-01-13
 */
const { ccclass } = cc._decorator;

@ccclass
export default class App extends cc.Component {
    /**框架管理器 */
    public static get FrameWorkMgr(): FrameWorkMgr {
        return FrameWorkMgr.getInstance();
    }

    /**全局事件管理器 */
    public static get GlobalEventMgr(): GlobalEventMgr {
        return GlobalEventMgr.getInstance();
    }

    /**启动 */
    public start(): void {
        App.FrameWorkMgr.run(HallFrameWork, HallFrameWork.PATH, HallModel);

        App.GlobalEventMgr.addEventListener("updateLevel", (...agrs) => {
            console.log(agrs);
        }, this);

        App.GlobalEventMgr.dispatchEvent("updateLevel", "12");
    }

    /**销毁*/
    public destroy(): boolean {
        super.destroy();
        App.FrameWorkMgr.nuLoad(HallFrameWork);
        return true;
    }
}