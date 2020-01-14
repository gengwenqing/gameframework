import RegisterDef from "../RegisterDef";
import ViewRegister from "./ViewRegister";
import BaseViewCtrl from "../base/BaseViewCtrl";
import BaseView from "../base/BaseView";
import { Mgrs } from "../base/BaseFramework";

/**
 * UI管理类
 * @author parker
 * 2020-01-10
 */
export default class UIMgr {
    private _viewRegister: ViewRegister;
    private mgrs: Mgrs;
    private rootNode: cc.Node;

    private _cacheList: any = {};
    public constructor(viewRegister: ViewRegister, mgrs: Mgrs, rootNode: cc.Node) {
        this._viewRegister = viewRegister;
        this.mgrs = mgrs;
        this.rootNode = rootNode;
    }
    /**
     * 弹出面板
     * @param key 弹出面板的key
     */
    public show(key: string): void {
        let clsObj = this._viewRegister.getComCls(key);
        let layer = clsObj[2];
        let node: cc.Node = this.getCache(key);
        if (node) {
            this.rootNode.getChildByName(layer).addChild(node);
        } else {
            this.createUi(key);
        }
    }

    /**
     * 创建Ui
     * @param key 
     */
    private createUi(key: string): cc.Node {
        let clsObj = this._viewRegister.getComCls(key);
        let viewCtrlCls = clsObj["ctrlCls"];
        let viewCls = clsObj["viewCls"];
        let layer = clsObj["layer"];
        let path = viewCls.PATH;

        cc.loader.loadRes(path, cc.Prefab, (err, res) => {
            if (err) {
                console.log("加载资源失败");
            } else {
                let viewNode: cc.Node = cc.instantiate(res);
                let view = viewNode.addComponent(viewCls);
                let viewCtrl:any = viewNode.addComponent(viewCtrlCls);
                view["__init__"]();
                viewCtrl["__init__"](this.mgrs);
                viewCtrl.view = view;
                this.addCache(key, viewNode);
                this.rootNode.getChildByName(layer).addChild(viewNode);
                return viewNode;
            }
        });
        return null;
    }

    /**关闭界面 */
    public close(key: string): void {
        let clsObj = this._viewRegister.getComCls(key);
        let viewCtrlCls = clsObj[0];
        let viewCls = clsObj[1];
        let layer = clsObj[2];
        let node = this.getCache(key);
        if (node) {
            this.rootNode.getChildByName(layer).removeChild(node);
        } else {
            console.log("您的关闭的界面 尚未打开");
        }
    }

    /**加载到缓存中 */
    private addCache(key: string, viewNode: cc.Node): void {
        if (!this._cacheList.hasOwnProperty(key)) {
            this._cacheList[key] = viewNode;
        } else {
            console.log("缓存中已经有了.");
        }
    }

    /**清理缓存 */
    private clearCache(key: string): void {
        for (const key in this._cacheList) {
            if (this._cacheList.hasOwnProperty(key)) {
                delete this._cacheList[key];
            }
        }
    }

    /**从缓存里面拿 */
    private getCache(key: string): cc.Node {
        for (const key in this._cacheList) {
            if (this._cacheList.hasOwnProperty(key)) {
                return this._cacheList[key];
            }
        }
        return null;
    }

}

