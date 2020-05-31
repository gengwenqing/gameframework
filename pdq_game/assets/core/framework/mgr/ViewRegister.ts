import BaseSingle from "../base/BaseSingle";
import BaseViewCtrl from "../base/BaseViewCtrl";
import BaseView from "../base/BaseView";

/**
 * view注册管理
 * 
 * exp:
 *    this.registerView(key:CLUB,{xxxViewCtrl,xxxView})
 * @author parker
 * 2010-01-10
 */

export default class ViewRegister {

    private viewMap: any = {};
    /**
     * 注册view
     * @param key   key名字
     * @param viewCtrl view的逻辑控制类
     * @param view    view的视图控制类
     */
    public register(key: string, viewCtrl: new () => BaseViewCtrl, view: new () => BaseView, layer: Layerdef = Layerdef.LAYER_POP): void {
        this.viewMap[key] = { "ctrlCls": viewCtrl, "viewCls": view, "layer": layer };
    }

    /**
     * 根据key获取视图 cls
     * @param key 视图key
     */
    public getComCls(key: string): any {
        for (const eleKey in this.viewMap) {
            if (this.viewMap.hasOwnProperty(key)) {
                if(key === eleKey){
                   return this.viewMap[eleKey];
                }
            }
        }
        return null;
    }

}

export class Layerdef {
    public static LAYER_POP: string = "layerPop";
    public static LAYER_MAIN: string = "layerMain";
    public static LAYER_TIPS: string = "layerTips";
}