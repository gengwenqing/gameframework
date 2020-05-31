import ViewEventMgr from "../Event/ViewEventMgr";

/**
 * 视图基类
 * @author parker
 * 2010-01-10
 */
export default class BaseView extends cc.Component {

    /**事件 */
    public event: ViewEventMgr;

    constructor() {
        super();
    }

    /**
     * 初始化  
     * 把节点上的UI 绑定到这个类中
     */
    private __init__(): void {
        this.resolveNode(this, this.node, "");
        this.init();
    }

    private resolveNode(thisObj: any, root: cc.Node, path) {
        for (let i = 0; i < root.childrenCount; i++) {
            thisObj[path + root.children[i].name] = root.children[i];
            this.resolveNode(thisObj, root.children[i], path + root.children[i].name + "/");
        }
    }

    /**初始化 */
    public init(): void {

    }

}