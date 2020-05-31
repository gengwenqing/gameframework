import PbUtils from "../proto/PbUtils";
import ProtoManager from "../proto/ProtoManager";
import Md5 from "../utils/Md5"

export default class NetworkUtils {
    public static sendRequest(data: string) {
        cc.log("vvvvvv:" + data);

        // this.dynamicLoadProto();

        // this.staticLoadProto();

        let CSLogin = ProtoManager.getInstance().lookupType("texaspoker.CSLogin");
        let DEVICE_TYPE = ProtoManager.getInstance().lookupEnum("texaspoker.DEVICE_TYPE");
        let TEXAS_CMD = ProtoManager.getInstance().lookupEnum("texaspoker.TEXAS_CMD");

        cc.log("cmd:" + TEXAS_CMD.values.Cmd_CSLogin);
        var payload = { 
            strID: "15100000002",
            strPWD: Md5.getInstance().hex_md5("qqqqqq"),//"343b1c4a3ea721b2d640fc870dbf36",
            strIosToken: "",
            strSSOToken: "861080044464238_D8H6R19630005300",
            strSysVersion: "28",
            strPhoneType: "Android",
            strScreenSize: "SPN-AL00",
            eDeviceType: DEVICE_TYPE.values.DEVICE_TYPE_ANDROID,
            sCountryCode: "86",
            sExtra: "nova 5i Pro==true==========\"sharyu_home\"==10000==Android28==zh==0",
            iLanguageType: 1,
            strPhoneLanguage: "zh-CN"
        };
        var message = CSLogin.create(payload); // or use .fromObject if conversion is necessary
        cc.log(`message = ${JSON.stringify(message)}`);

        var buffer = CSLogin.encode(message).finish();
        // cc.log(`buffer2 = ${Array.prototype.toString.call(buffer)}`);

       

        
        // let CSCreateCowBoyGameRoom = ProtoManager.getInstance().lookupType("texaspoker.CSCreateCowBoyGameRoom");
        // var payload1 = { 
        //     uuid: "201222", 
        //     sRoomName: "testRoomName"
        // };
        // var message1 = CSCreateCowBoyGameRoom.fromObject(payload1); // or use .fromObject if conversion is necessary
        // cc.log(`message = ${JSON.stringify(message1)}`);
        // var buffer1 = CSCreateCowBoyGameRoom.encode(message1).finish();
        // cc.log(`buffer1 = ${Array.prototype.toString.call(buffer1)}`);

        // if (cc.sys.isNative) {
        //     jsb.reflection.callStaticMethod(
        //         'com/illuminate/texaspoker/utils/NetworkUtil',
        //         'gameTcpAction',
        //         '(ILjava/lang/String;)V',
        //         TEXAS_CMD.Cmd_CSCreateCowBoyGameRoom,
        //         PbUtils.arrayBufferToBase64(buffer)
        //     );
        // }
    }

    /**
     * 发送 tcp消息
     * @param cmd 命令
     * @param data  数据
     */
    public static sendTcpMessage(cmd:any,data:any):void{
        if (cc.sys.isNative) {
            jsb.reflection.callStaticMethod(
                'com/illuminate/texaspoker/utils/NetworkUtil',
                'gameTcpAction',
                '(ILjava/lang/String;)V',
                cmd,
                PbUtils.arrayBufferToBase64(data)
            );
        }
    }

    public static sendGetFrontPageRequest() {
        let CSGetFrontPageInfoV4 = ProtoManager.getInstance().lookupType("texaspoker.CSGetFrontPageInfoV4");
        let TEXAS_CMD = ProtoManager.getInstance().lookupEnum("texaspoker.TEXAS_CMD");

        cc.log("cmd:" + TEXAS_CMD.values.Cmd_CSGetFrontPageInfoV4);
        var payload = { 
            uuid: cc.sys.localStorage.getItem("uuid"),
            iOffset: 0,
            iNum: 0
        };
        var message = CSGetFrontPageInfoV4.fromObject(payload); // or use .fromObject if conversion is necessary
        cc.log(`message = ${JSON.stringify(message)}`);

        var buffer = CSGetFrontPageInfoV4.encode(message).finish();

        if (cc.sys.isNative) {
            jsb.reflection.callStaticMethod(
                'com/illuminate/texaspoker/utils/NetworkUtil',
                'gameTcpAction',
                '(ILjava/lang/String;)V',
                TEXAS_CMD.values.Cmd_CSGetFrontPageInfoV4,
                PbUtils.arrayBufferToBase64(buffer)
            );
        }
    }

    public static getSplash() {
        let CSGetFlashPageInfos = ProtoManager.getInstance().lookupType("texaspoker.CSGetFlashPageInfos");
        let TEXAS_CMD = ProtoManager.getInstance().lookupEnum("texaspoker.TEXAS_CMD");

        cc.log("cmd:" + TEXAS_CMD.values.Cmd_CSGetFlashPageInfos);
        var payload = { 
            uuid: cc.sys.localStorage.getItem("uuid"),
            iScreenWidth: 720,
            iScreenHeight: 1280,
            iLanguageType: 1
        };
        var message = CSGetFlashPageInfos.fromObject(payload); // or use .fromObject if conversion is necessary
        cc.log(`message = ${JSON.stringify(message)}`);

        var buffer = CSGetFlashPageInfos.encode(message).finish();

        if (cc.sys.isNative) {
            jsb.reflection.callStaticMethod(
                'com/illuminate/texaspoker/utils/NetworkUtil',
                'gameHttpAction',
                '(ILjava/lang/String;)V',
                TEXAS_CMD.values.Cmd_CSGetFlashPageInfos,
                PbUtils.arrayBufferToBase64(buffer)
            );
        }
    }

    private static dynamicLoadProto() {
        var protobufHere = protobuf;//require("protobuf");//导入为插件，直接使用
        var startD = new Date();
        var startT = startD.getTime();
        protobufHere.load("proto/TexasPoker", function (err, root) {//Data/PbLobby.proto
            if (err)
                throw err;

            cc.log("加载protobuf完毕，开始测试protobuf...")

            startD = new Date();
            cc.log("load time:" + (startD.getTime() - startT));
            startT = startD.getTime();

            // Obtain a message type
            let CSLogin = root.lookupType("texaspoker.CSLogin");

            startD = new Date();
            cc.log("lookuptype time:" + (startD.getTime() - startT));
            startT = startD.getTime();

            let DEVICE_TYPE = root.lookupEnum("texaspoker.DEVICE_TYPE");
            cc.log("DEVICE_TYPE = " + DEVICE_TYPE);

            startD = new Date();
            cc.log("lookupenum time:" + (startD.getTime() - startT));
            startT = startD.getTime();

            // Exemplary payload
            var payload = { 
                strID: "testuser", 
                strPWD: "pwd", 
                strIosToken: "iostoken", 
                eDeviceType: DEVICE_TYPE.DEVICE_TYPE_ANDROID 
            };
            // cc.log(`payload = ${JSON.stringify(payload)}`);

            var message = CSLogin.create(payload); // or use .fromObject if conversion is necessary
            // cc.log(`message = ${JSON.stringify(message)}`);

            var buffer = CSLogin.encode(message).finish();
            // cc.log(`buffer2 = ${Array.prototype.toString.call(buffer)}`);

            startD = new Date();
            cc.log("encode time:" + (startD.getTime() - startT));
            startT = startD.getTime();

            if (cc.sys.isNative) {
                jsb.reflection.callStaticMethod(
                    'com/illuminate/texaspoker/utils/NetworkUtil',
                    'gameTcpAction',
                    '(ILjava/lang/String;)V',
                    1,
                    PbUtils.arrayBufferToBase64(buffer)
                );
            }
        });
    }
}