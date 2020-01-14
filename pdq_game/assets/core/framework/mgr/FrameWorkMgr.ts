import FrameworkBase from "../base/BaseFramework";
import BaseSingle from "../base/BaseSingle";
import BaseModel from "../base/BaseModel";

/**
 * framework管理器
 * @author parker
 * 2010-01-11
 */
export default class FrameWorkMgr extends BaseSingle {
    private fwList: any = {};
    /**
     * 启动framework
     */
    public run(fwCls: new (rootNode, model?: BaseModel) => FrameworkBase, prefabPath: string, model?: new () => BaseModel): void {
        let frameWork: FrameworkBase;
        cc.loader.loadRes(prefabPath, cc.Prefab, (error, res) => {
            if (error) {
                console.log("资源加载失败");
                return;
            } else {
                let viewNode = cc.instantiate(res);
                let fw = viewNode.addComponent(fwCls);
                fw.__init__(viewNode, model);
                this.fwList[fw.toString()] = viewNode;
                cc.director.getScene().getChildByName("Canvas").addChild(viewNode);
            }
        })

    }

    /**
     * 卸载framework
     * @param fw 
     */
    public nuLoad(_fw: new (rootNode) => FrameworkBase): void {
        let fwName = _fw.toString();
        let fw = this.getFW(fwName);
        fw["__destory__"]();
        cc.loader.release(fwName);
    }

    /**
     * 获取挂载类
     * @param key 
     */
    private getFW(key: string): FrameworkBase {
        if (this.fwList[key]) {
            return this.fwList[key];
        }
        return null;
    }
}