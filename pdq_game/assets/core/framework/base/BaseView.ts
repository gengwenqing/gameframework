
/**
 * 视图基类
 * @author parker
 * 2010-01-10
 */
export default class BaseView extends cc.Component {

    public uiEles: UIContiner;
    /**
     * 初始化  
     * 把节点上的UI 绑定到这个类中
     */
    private __init__(): void {
        this.uiEles = new UIContiner();
        this.uiEles.resolveNode(this.node);
    }
}

/**
 * 节点列表类
 * @author parker
 * 2020-01-13
 */
export class UIContiner {
    /**节点列表 */
    public uiEleList: any = {};

    /**分解节点 */
    public resolveNode(node: cc.Node) {
        for (let i: number = 0; i < node.childrenCount; i++) {
            this.setEle(node.children[i]);
        }
    }
    /**设置节点信息 */
    public setEle(node: cc.Node): void {
        if (node) {
            this.uiEleList[node.name] = node
        }
    }
    /**获取 节点列表 */
    public getEle(str: string): void {
        return this.uiEleList[str];
    }

}