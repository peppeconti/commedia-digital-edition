export class Rule {
    constructor(public element: string | null, public select_attr: Array<{name: string, value: string}> | null, public attributes_transform: Array<{start: string, target: string}> | null, public attributes: Array<{name: string, value: string}> | null, public target: string | null, public before: string| null, public after: string | null, public content: Array<{type: string, name: string}> | null, public events: Array<{name: string, execute: Function}> | null, public ex_function: Function | null) {
    }
  }