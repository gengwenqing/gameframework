import BaseEventMgr from "./BaseEventMgr";
/**
 * view 事件
 * 用于 viewCtrl 和 view之间的事件通知
 * @author parker
 * 2020-01-13
 */
export default class ViewEventMgr extends BaseEventMgr {
  
    public constructor(id?:number){
        super(id);
    }
}