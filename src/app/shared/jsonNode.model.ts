export class JsonNode {
    constructor(public tagName: string | null, public isText: boolean, public text: string | null, public attributes: Array<{name: string, value: string}> | null, public childNodes: Array<JsonNode> | null) {
    }
  }