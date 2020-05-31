import BaseModel from "../framework/base/BaseModel";

/**
 * 大厅Model
 * @author parker
 * 2020-01-13
 */
export default class HallModel extends BaseModel {
    /**用户信息 */
    public _userInfo: UserInfo;

    public constructor() {
        super();
    }

    public init(): void {
        this._userInfo = new UserInfo();
        this._userInfo.age = 50;
        this._userInfo.sex = 1;
        this._userInfo.name = "parker";
    }

    public get userInfo(): UserInfo {
        return this._userInfo;
    }

}

export class UserInfo {
    public constructor() {

    }
    /**年龄 */
    public age: number;
    /**名字 */
    public name: string;
    /**性别 */
    public sex: number;
}