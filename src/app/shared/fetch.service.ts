import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonNode } from "./jsonNode.model";

@Injectable()

export class ServiceFetch {

    constructor(private http: HttpClient) {

    }

    fetchData() {
        return this.http.get('assets/data/divina_commedia.xml', {
            headers: new HttpHeaders()
                .set('Content-Type', 'text/xml')
                .append('Access-Control-Allow-Methods', 'GET')
                .append('Access-Control-Allow-Origin', '*')
                .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
            responseType: 'text'
        })
    }

    parseNode(node: Node) {
        const nodeObj: JsonNode = {
            text: null,
            attributes: null,
            tagName: null,
            childNodes: null,
            isText: false
        };
            nodeObj.tagName = (<Element>node).tagName;
            nodeObj.attributes = [];
            if ((<Element>node).attributes && (<Element>node).attributes.length > 0) {
                for (let i = 0; i < (<Element>node).attributes.length; i++) {
                    nodeObj.attributes.push({ name: (<Element>node).attributes[i].name, value: (<Element>node).attributes[i].value });
                }
            }
            if (!node.childNodes || node.childNodes.length < 1 && node.textContent !== '') {
                nodeObj.text = node.textContent;
                nodeObj.isText = true;
            } else {
                nodeObj.childNodes = [];
                for (let n = 0; n < node.childNodes.length; n++) {
                        nodeObj.childNodes.push(this.parseNode(node.childNodes[n]));
                };
        }
        return <JsonNode>nodeObj;
    }
}