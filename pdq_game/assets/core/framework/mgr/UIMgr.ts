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
        let layer = clsObj["layer"];
        let node: cc.Node = this.getCache(key);
        if (node) {
            let curLayer = this.rootNode.getChildByName(layer);
            if (node.parent == curLayer) {
                // 不可重复. 还有一种tips是可重复出现,  可不放入缓存中,每次都生成一个新的对象;
                node.setSiblingIndex(node.parent.childrenCount);
                return;
            }
            let view = node.addComponent(clsObj["viewCls"]);
            let viewCtrl: any = node.addComponent(clsObj["ctrlCls"]);
            viewCtrl.view = view;
            view["__init__"]();
            viewCtrl["__init__"](this.mgrs, this);
            viewCtrl.viewDidAppear();
            this.rootNode.getChildByName(layer).addChild(node);
            node.setSiblingIndex(node.parent.childrenCount);

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
                let viewCtrl: any = viewNode.addComponent(viewCtrlCls);
                viewCtrl.view = view;
                view["__init__"]();
                viewCtrl["__init__"](this.mgrs, this);
                this.rootNode.getChildByName(layer).addChild(viewNode);
                viewNode.setSiblingIndex(viewNode.parent.childrenCount);
                viewCtrl.viewDidAppear();
                this.addCache(key, viewNode);
                return viewNode;
            }
        });
        return null;
    }

    /**
   * 创建Ui
   * @param key 
   */
    public createNodeCom(key: string, cbFun?: Function, thisObj?: any): void {
        let clsObj = this._viewRegister.getComCls(key);
        let viewCtrlCls = clsObj["ctrlCls"];
        let viewCls = clsObj["viewCls"];
        let path = viewCls.PATH;

        cc.loader.loadRes(path, cc.Prefab, (err, res) => {
            if (err) {
                console.log("加载资源失败");
            } else {
                let viewNode: cc.Node = cc.instantiate(res);
                let view = viewNode.addComponent(viewCls);
                let viewCtrl: any = viewNode.addComponent(viewCtrlCls);
                viewCtrl.view = view;
                view["__init__"]();
                viewCtrl["__init__"](this.mgrs, this);
                cbFun.apply(thisObj, [viewNode]);
            }
        });
    }


    /**关闭界面 */
    public close(key: string): void {
        let clsObj = this._viewRegister.getComCls(key);
        let viewCtrlCls = clsObj["ctrlCls"];
        let viewCls = clsObj["viewCls"];
        let layer = clsObj["layer"];
        let node = this.getCache(key);
        if (node) {
            node.removeComponent(viewCtrlCls);
            node.removeComponent(viewCls);
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
        for (const elekey in this._cacheList) {
            if (this._cacheList.hasOwnProperty(key)) {
                if (elekey === key) {
                    return this._cacheList[elekey];
                }
            }
        }
        return null;
    }

}

