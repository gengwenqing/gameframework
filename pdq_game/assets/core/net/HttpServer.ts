/**
 * http封装
 * @author parker
 * 2020-01-10
 */
export default class HttpServer extends XMLHttpRequest {

    /**发送成功的回调函数 */
    private cbComplete: Function;

    public constructor(methodType: string, url: string, data: any, cbComplete: Function) {
        super();
        // new();
        this.responseType = "";
        this.cbComplete = cbComplete;
        this.open(methodType, url);
        this.onerror = this.onErrorHandler;
        this.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        let msg: string = JSON.stringify(data);
        this.send(msg);

        this.onLoadEndHandler = this.onloadend;
        this.onLoadStartHandler = this.onloadstart;
        this.onProgressHandler = this.onprogress;
        this.onTimeOutHanndler = this.ontimeout;
    }

    /**
     * 开始
     * @param e 
     */
    private onLoadStartHandler(e: ProgressEvent): void {

    }

    /**
     * 发送Error
     * @param e 
     */
    private onErrorHandler(e: ProgressEvent): void {

    }

    /**
     * 发送结束
     * @param e 
     */
    private onLoadEndHandler(e: ProgressEvent): void {
        this.cbComplete && this.cbComplete(this.responseText);
        this.destroy();
    }

    /**
     * 发送数据
     * @param e 
     */
    private onProgressHandler(e: ProgressEvent): void {

    }

    /**
     * 发送超时
     * @param e 
     */
    private onTimeOutHanndler(e: ProgressEvent): void {

    }

    private destroy(): void {
        this.onloadend = null;
        this.onloadstart = null;
        this.onprogress = null;
        this.ontimeout = null;
    }

}