import BaseEventMgr from "./BaseEventMgr";
import BaseSingle from "../base/BaseSingle";

/**
 * 全局事件管理 
 * 用于模块之间的调用
 * @author parker
 * 2020-01-13
 */
export default class GlobalEventMgr extends BaseEventMgr {
    private static _instace: GlobalEventMgr = new GlobalEventMgr();
    public static getInstance(): GlobalEventMgr {
        return this._instace;
    }

    public constructor(id?: number) {
        super(id);
    }
}