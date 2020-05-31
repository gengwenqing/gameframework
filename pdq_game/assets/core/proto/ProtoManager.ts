// import { texaspoker } from "./proto";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// var texaspoker = {};

const { ccclass, property } = cc._decorator;

@ccclass
export default class ProtoManager {
    private static _instance: ProtoManager = null;

    public static getInstance(): ProtoManager {
        if (this._instance == null) {
            this._instance = new ProtoManager();
        }
        return this._instance;
    }

    private protoRoot: any;
    private protoArray: string[] = [
        "TexasPoker",
        "TexasPokerBull",
        "TexasPokerCaribbeanStud",
        "TexasPokerCmd",
        "TexasPokerCommon",
        "TexasPokerCowBoy",
        "TexasPokerCRB",
        "TexasPokerFlopLotto",
        "TexasPokerHarbour",
        "TexasPokerHttp",
        "TexasPokerHttpBill",
        "TexasPokerHttpBillBull",
        "TexasPokerHttpBillCowBoy",
        "TexasPokerHttpBillCRB",
        "TexasPokerHttpBillMTT",
        "TexasPokerHttpBillOFC",
        "TexasPokerHttpClub",
        "TexasPokerHttpLeague",
        "TexasPokerHttpMsg",
        "TexasPokerHttpTransaction",
        "TexasPokerHttpUser",
        "TexasPokerHttpVoice",
        "TexasPokerMiniGame",
        "TexasPokerMTT",
        "TexasPokerOFC",
        "TexasPokerRedAndBlack",
    ];
    private curIdx: number;

    public loadAllProto(cbCom: Function, thisObj: any) {
        this.curIdx = 0;

        let self = this;
        this.loadProto(null, function (err, root) {
            if (err) {
                cc.log("load proto failed...");
            } else {
                self.init(root);
                cbCom.apply(thisObj);
            }
        });
    }

    private loadProto(prevRoot: any, callback: any) {
        let self = this;
        cc.log("processing:" + self.protoArray[self.curIdx]);
        protobuf.load("proto/" + self.protoArray[self.curIdx], prevRoot, function (err, root) {
            if (err) {
                cc.log(err);
                callback(err, null);
            } else {
                self.curIdx = self.curIdx + 1;
                if (self.curIdx < self.protoArray.length) {
                    self.loadProto(root, callback);
                } else {
                    callback(err, root);
                }
            }
        });
    }

    private init(root: any) {
        cc.log("load proto succeed...");
        this.protoRoot = root;
        // texaspoker["CSLogin"] = this.lookupType("CSLogin");
        // texaspoker["DEVICE_TYPE"] = this.lookupEnum("DEVICE_TYPE");
    }

    public lookupType(name: string) {
        return this.protoRoot.lookupType(name);
    }

    public lookupEnum(name: string) {
        return this.protoRoot.lookupEnum(name);
    }
}
