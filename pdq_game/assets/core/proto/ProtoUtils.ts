import BaseSingle from "../framework/base/BaseSingle";

/**
 * proto buff封装
 * @author parker
 * 2020-01-24
 */
export default class ProtoUtils extends BaseSingle {
    /**存储proto buff根信息,用于后面查询数据用 */
    private roots: any = {};

    public load(fileName: string): void {
        protobuf.load(fileName, (err, root) => {
            if (err) {
                throw err;
            }

            this.roots[fileName] = root;
            console.log("root=" + root);
            console.log(root);

            // var cmd = root.lookupEnum("texaspoker.USER_GAME_STATE");
            // console.log(`cmd = ${JSON.stringify(cmd)}`);
            // console.log("USER_GAME_STATE_STANDBY = " + cmd.values.USER_GAME_STATE_STANDBY);
        });
    }

    /**
     * 查找 enum属性
     * @param fileName    文件名
     * @param packgeName  包名
     * @param enumKey     枚举key
     */
    public lookupEnum(fileName: string, packgeName: string, enumKey: string): any {
        let result: any = null;
        result = this.roots[fileName].lookupEnum(packgeName + "." + enumKey);
        return result;
    }
}