import BaseModel from "../base/BaseModel";
/**
 * 管理数据类
 * @autor parker
 * 2020-01-10
 */
export default class ModelMgr {
    /**该模块对应数据 */
    public model: BaseModel;

    public constructor(modelCls?: new () => BaseModel) {
        if(modelCls){
            this.model = new modelCls();
        }
    }
}   