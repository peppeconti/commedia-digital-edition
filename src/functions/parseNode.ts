import { JsonNode } from "src/app/main-text/jsonNode.model";

interface NodeToJson {
    isText: boolean,
    text: string | null
    attributes: Array<{ name: string, value: string }> | null,
    tagName: string | null
    childNodes: Array<NodeToJson> | null,
}

export const parseNode = (node: Node) => {

    const nodeObj: NodeToJson = {
        isText: false,
        text: null,
        attributes: null,
        tagName: null,
        childNodes: null
    };
    
        nodeObj.tagName = (<Element>node).tagName;
        nodeObj.attributes = [];
        if ((<Element>node).attributes && (<Element>node).attributes.length > 0) {
            for (let i = 0; i < (<Element>node).attributes.length; i++) {
                nodeObj.attributes.push({ name: (<Element>node).attributes[i].name, value: (<Element>node).attributes[i].value });
            }
        }
        if (!node.childNodes || node.childNodes.length < 1 && node.nodeType === 3) {
            nodeObj.text = node.textContent;
            nodeObj.isText = true;
        } else {
            nodeObj.childNodes = [];
            for (let n = 0; n < node.childNodes.length; n++) {
                if (!(<Text>node.childNodes[n]).wholeText?.includes('\n')) {
                    nodeObj.childNodes.push(parseNode(node.childNodes[n]));
                }
            };
        }
    return <JsonNode>nodeObj;
}