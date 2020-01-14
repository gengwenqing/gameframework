import HallViewDef from "./HallViewDef"
import ClubViewCtrl from "./club/ClubViewCtrl"
import ClubView from "./club/ClubView"
import BaseFramework from "../core/framework/base/BaseFramework";
import { Layerdef } from "../core/framework/mgr/ViewRegister";
import HallModel from "../core/model/HallModel";
import BaseModel from "../core/framework/base/BaseModel";

/**
 * 大厅基础类
 * @author parker
 * 2010-01-12
 */

export default class HallFrameWork extends BaseFramework {

    /**路径唯一 */
    public static PATH: string = "MainFrameWork";

    /**注册该framework下的所有视图 */
    protected registerView(): void {
        super.registerView();
        console.log((this.modelMgr.model as HallModel).userInfo.age + "年龄");
        console.log((this.modelMgr.model as HallModel).userInfo.name + "名字");
        console.log((this.modelMgr.model as HallModel).userInfo.sex + "性别");
        this.viewRegister.register(HallViewDef.HALL_CLUB, ClubViewCtrl, ClubView, Layerdef.LAYER_POP);
        this.uiMgr.show(HallViewDef.HALL_CLUB);
    }
}