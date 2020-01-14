import BaseSingle from "../base/BaseSingle";

/**
 * 事件管理
 * @author parker
 * 2020-01-13
 */
export default class BaseEventMgr {
    /**事件管理的唯一表示 */
    private id: number;
    /**事件组 */
    private _eventList: Event[] = [];

    public constructor(id?: number) {
        if (id) {
            this.id = id;
        }
    }
    /**
     * 监听事件 
     * @param key 事件key
     * @param cb  回调函数
     * @param thisObj 执行域
     * @param args 参数
     */
    public addEventListener(key: string, cb: Function, thisObj: any, args?: any): void {
        let evt: Event = new Event(key, cb, thisObj, args);

        for (const iterator of this._eventList) {
            if (iterator.eventKey == key) {
                console.log("事件已经注册过了,不能重复注册");
                return;
            }
        }
        this._eventList.push(evt);
    }

    /**
     * 触发事件
     * @param key 事件key
     * @param args 参数
     */
    public dispatchEvent(key: string, args: any): void {
        for (const iterator of this._eventList) {
            if (iterator.eventKey == key) {
                let _args: any;
                if (args) {
                    _args = args;
                } else {
                    _args = iterator.args;
                }
                iterator.eventCb.apply(iterator.thisObj, [_args]);
            }
        }
    }

    /**
     * 删除事件监听
     * @param key 事件key
     */
    public removeEvent(key: string): void {
        for (let i: number = 0; i < this._eventList.length; i++) {
            if (this._eventList[i].eventKey == key) {
                this._eventList[i].destroy();
                this._eventList.splice(i, 1);
            }
        }
    }

    /**
     * 删除所有事件监听
     */
    public removeAll(): void {
        for (let i: number = 0; i < this._eventList.length; i++) {
            if (this._eventList[i].eventKey) {
                this._eventList[i].destroy();
                this._eventList.splice(i, 1);
            }
        }
    }
}

/**
 * 事件类
 * @author parker
 * 2010-01-13
 */
class Event {
    public eventKey: string = "";
    public eventCb: Function;
    public thisObj: any;
    public args: any;

    public constructor(key, cb, thisObj, args) {
        this.eventKey = key;
        this.eventCb = cb;
        this.args = args;
        this.thisObj = thisObj;
    }

    /**
     * 销毁事件 
     */
    public destroy(): void {
        this.args = null;
        this.eventKey = "";
        this.eventCb = null;
        this.thisObj = null;
    }
}