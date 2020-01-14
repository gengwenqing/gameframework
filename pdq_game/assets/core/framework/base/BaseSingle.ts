/**
 * 单例基类
 * @author parker
 * 2020-1-10;
 */

export default class BaseSingle {
    
    public static getInstance(...args): any {
        let Class: any = this;
        if (!Class._instance) {
            Class._instance = new Class(...args);
        }
        return Class._instance;
    }
}