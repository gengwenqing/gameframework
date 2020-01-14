/**
 * webSocket 
 * 单连接scoket ,目前只有一个连接需求, 如果多个的话, 可以进行一个socketManager管理
 * 来对所有socket 管理
 * @author parker
 * 2020-01-10
 */
export default class Socket {

    /**地址 */
    private _host: string;
    /**端口号 */
    private _port: string;
    /**地址+端口号 */
    private _url: string;
    /**当前的socket */
    private _curSocket: WebSocket;
    /**连接是否成功 */
    private _isConnectSucc: boolean = false;

    public constructor() {
        this.init();
    }

    /**
     * 初始化数据
     */
    private init(): void {
        this._host = "";
        this._port = "";
        this._url = "";
        this._isConnectSucc = false;
    }

    /**
     * 开始连接
     * @param host 地址
     * @param port 端口
     */
    public connect(host: string, port: any): void {
        this._host = host;
        this._port = port;

        this._url = host + ":" + port;
        let ws: WebSocket = new WebSocket(this._url)
        ws.onopen = (evt) => {
            console.log("握手成功");
            this._isConnectSucc = true;
            this._curSocket = ws;
        };

        ws.onmessage = (evt) => {
            console.log("接收到服务器消息:" + evt.data);
            /**利用事件分发出去*/
        };

        ws.onclose = (evt) => {
            console.log("关闭code:" + evt.code);
            console.log("关闭原因:" + evt.reason);
            console.log("关闭");
        }
    }

    /**
     *  readonly CLOSED: number;
        readonly CLOSING: number;
        readonly CONNECTING: number;
        readonly OPEN: number;
     */
    public get CLOSED(): any {
        return this._curSocket.CLOSED;
    }

    public get CLOSING(): number {
        return this._curSocket.CLOSING;
    }

    public get CONNECTING(): any {
        return this._curSocket.CONNECTING;
    }

    public get OPEN(): number {
        return this._curSocket.OPEN;
    }

    /**
     * 发送消息
     * @param msg  消息体
     */
    public sendMsg(msg: string): void {
        if (this._curSocket.OPEN == this._curSocket.readyState) {
            this._curSocket.send(msg);
        } else {
            console.log("连接状态有问题");
        }
    }

    /**
     * 关闭当前连接
     */
    public close() {
        this._curSocket.close();
    }
}