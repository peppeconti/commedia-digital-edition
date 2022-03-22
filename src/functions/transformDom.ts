/*nodeSubstitution(stringElement: string, xmlElement: Node, e: Rule) {
    const parser: DOMParser = new DOMParser();
    const newElement: Document = parser.parseFromString(stringElement, "application/xml");
    const dd: ChildNode | null = newElement.firstChild;
    (<Element>dd).innerHTML = e.content || (<Element>xmlElement).innerHTML;
    // console.log(dd);
    if (xmlElement.parentNode) {
      xmlElement.parentNode.replaceChild((<Node>dd), xmlElement);
    }
  }

  attributes(attributesArray: Array<Array<string>>, element: Node) {
    let newAttributes = "";
    attributesArray.forEach((attr, index) => {
      if (attr[0]) {
        newAttributes = newAttributes + `${attr[1]}="${(<Element>element).attributes[index].nodeValue}"` + ' ';
      } else {
        newAttributes = newAttributes + `${attr[1]}` + ' ';
      }
    });
    return newAttributes.trim();
  }

  transformXMLDom(rules: Array<Rule>, XMLDom: Document) {
    rules.forEach(e => {
      const element: NodeList = XMLDom.querySelectorAll(`${e.match}`);
      const elementArray: Array<Node> = Array.from(element);
      elementArray.forEach(xmlElement => {
        const stringEl = `<${e.target} ${this.attributes(e.attributes, xmlElement)}></${e.target}>`;
        this.nodeSubstitution(stringEl, xmlElement, e);
      })
    });
  }
  
  
  interface Rule {
  match: string,
  attributes: Array<Array<string>>,
  target: string,
  before: string,
  after: string,
  content: string
}

  
  */