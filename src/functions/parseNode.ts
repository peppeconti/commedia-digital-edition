import { CustomNode } from "src/app/main-text/customNode.model";

interface NodeToJson {
    text: string | null
    attributes: Array<{ name: string, value: string }> | null,
    tagName: string | null
    childNodes: Array<NodeToJson> | null,
}

export const parseNode = (node: Node) => {
    const nodeObj: NodeToJson = {
        text: null,
        attributes: null,
        tagName: null,
        childNodes: null
    };
    if (node.nodeType === 3 && node.textContent != '') {
        nodeObj.text = node.textContent;
    } else {
        nodeObj.tagName = (<Element>node).tagName;
        nodeObj.attributes = [];
        if ((<Element>node).attributes && (<Element>node).attributes.length > 0) {
            for (let i = 0; i < (<Element>node).attributes.length; i++) {
                nodeObj.attributes.push({ name: (<Element>node).attributes[i].name, value: (<Element>node).attributes[i].value });
            }
        }
        if (!node.childNodes || node.childNodes.length < 1) {
            nodeObj.text = node.textContent;
        } else {
            nodeObj.childNodes = [];
            for (let n = 0; n < node.childNodes.length; n++) {
                nodeObj.childNodes.push(parseNode(node.childNodes[n]));
            };
        }
    }
    return <CustomNode>nodeObj;
}