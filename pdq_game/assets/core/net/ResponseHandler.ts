// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import PbUtils from "../proto/PbUtils";
import ProtoManager from "../proto/ProtoManager";
import App from "../../Script/App";
import LoginFrameWork from "../../Script/LoginFrameWork/LoginFrameWork";
import LoginMainViewCtrl from "../../Script/LoginFrameWork/main/LoginMainViewCtrl";

export default class ResponseHandler {
    public static handleResponse(cmd: number, data: string) {
        cc.log("handleResponse:" + cmd);

        // this.testProtobuf(data);

        let TEXAS_CMD = ProtoManager.getInstance().lookupEnum("texaspoker.TEXAS_CMD");
        if (cmd == TEXAS_CMD.values.Cmd_SCLoginRsp) {
            let SCLoginRsp = ProtoManager.getInstance().lookupType("texaspoker.SCLoginRsp");
            let decoded = SCLoginRsp.decode(PbUtils.base64ToArrayBuffer(data));
            console.log(`decoded = ${JSON.stringify(decoded)}`);

            cc.sys.localStorage.setItem('uuid', decoded.stUserBaseInfoNet.uuid);
            cc.sys.localStorage.setItem('sAccessToken', decoded.sAccessToken);
            cc.sys.localStorage.setItem('sEncryptKey', decoded.sEncryptKey);

            App.GlobalEventMgr.dispatchEvent(LoginMainViewCtrl.LOGIN_SUCCEED,JSON.stringify(decoded));
        }
        else if (cmd == TEXAS_CMD.values.Cmd_SCGetFrontPageInfoV4Rsp) {
            let SCGetFrontPageInfoV4Rsp = ProtoManager.getInstance().lookupType("texaspoker.SCGetFrontPageInfoV4Rsp");
            let decoded = SCGetFrontPageInfoV4Rsp.decode(PbUtils.base64ToArrayBuffer(data));
            log.debug(`SCGetFrontPageInfoV4Rsp = ${JSON.stringify(decoded)}`);
        }
        else if (cmd == TEXAS_CMD.values.Cmd_SCGetFlashPageInfosRsp) {
            let SCGetFlashPageInfosRsp = ProtoManager.getInstance().lookupType("texaspoker.SCGetFlashPageInfosRsp");
            let decoded = SCGetFlashPageInfosRsp.decode(PbUtils.base64ToArrayBuffer(data));
            log.debug(`SCGetFlashPageInfosRsp = ${JSON.stringify(decoded)}`);
        }
    }

    public static testProtobuf(data: string) {
        // var filename1 = "test";

        // var self = this;
        // var protobufHere = protobuf;//require("protobuf");//导入为插件，直接使用
        // protobufHere.load(filename1, function (err, root) {//Data/PbLobby.proto
        //     if (err)
        //         throw err;

        //     cc.log("加载protobuf完毕，开始测试protobuf...")

        //     var cmd = root.lookupEnum("PbLobby.Cmd");
        //     cc.log(`cmd = ${JSON.stringify(cmd)}`);
        //     cc.log("CMD_KEEPALIVED_C2S = " + cmd.values.CMD_KEEPALIVED_C2S);

        //     //lookup 等价于 lookupTypeOrEnum 
        //     //不同的是 lookup找不到返回null,lookupTypeOrEnum找不到则是抛出异常
        //     var type1 = root.lookup("PbLobby.Cmd1");
        //     cc.log("type1 = " + type1);
        //     var type2 = root.lookup("PbLobby.Test1");
        //     cc.log("type2 = " + type2);

        //     // Obtain a message type
        //     var Test1Message = root.lookupType("PbLobby.Test1");
        //     Test1Message.id = 123456;
        //     cc.log("Test1Message = " + Test1Message);

        //     // Exemplary payload
        //     var payload = { id: 123456, name: "hello protobuf" };
        //     //var payload = { ids: 1,name:"hello protobuf" };
        //     cc.log(`payload = ${JSON.stringify(payload)}`);

        //     //检查数据格式，测试了下发现没什么卵用
        //     // Verify the payload if necessary (i.e. when possibly incomplete or invalid)
        //     // var errMsg = Test1Message.verify(payload);
        //     // if (errMsg){
        //     //     cc.log("errMsg = "+errMsg);
        //     //     throw Error(errMsg);
        //     // }

        //     //过滤掉一些message中的不存在的字段
        //     // Create a new message
        //     var message = Test1Message.create(payload); // or use .fromObject if conversion is necessary
        //     cc.log(`message = ${JSON.stringify(message)}`);

        //     // Encode a message to an Uint8Array (browser) or Buffer (node)
            
        //     var buffer = Test1Message.encode(message).finish();
        //     cc.log(`buffer2 = ${Array.prototype.toString.call(buffer)}`);
        //     // ... do something with buffer

        //     // Decode an Uint8Array (browser) or Buffer (node) to a message
        //     var decoded = Test1Message.decode(PbUtils.base64ToArrayBuffer(data));
        //     cc.log("decoded1 111111111111= " + decoded.id);
        //     cc.log(`decoded2 = ${JSON.stringify(decoded)}`);
        //     // ... do something with message

        //     // If the application uses length-delimited buffers, there is also encodeDelimited and decodeDelimited.

        //     //一般情况下，也不需要下面的转换
        //     // Maybe convert the message back to a plain object
        //     var object = Test1Message.toObject(decoded, {
        //         longs: String,
        //         enums: String,
        //         bytes: String,
        //         // see ConversionOptions
        //     });
        //     cc.log("object = " + JSON.stringify(object));
        // });
    }


}

cc["ResponseHandler"] = ResponseHandler;