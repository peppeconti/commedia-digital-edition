export class CustomNode {
    constructor(public tagName: string | null, public text: string | null, public attributes: [{name: string, value: string}] | null, public childNodes: [CustomNode] | null) {
    }
  }