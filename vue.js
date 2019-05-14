class Vue {
  constructor(options) {
    this.$options = options;
    this._data = options.data;
    this.compile(options.el);
  }

  compile(el) {
    let element = document.querySelector(el);
    console.log(element);
    this.compileNode(element);
  }

  compileNode(element) {
    let childNodes = element.childNodes;
    // console.log(childNodes);

    Array.from(childNodes).forEach((node) => {
      //文本
      if (node.nodeType === 3) {

        let nodeContent = node.textContent;
        //处理有空格的情况
        let reg = /\{\{\s*(\S*)\s*\}\}/;

        if (reg.test(nodeContent)) {
          //分组第一个
          console.log(RegExp.$1);
          node.textContent = this._data[RegExp.$1];

        }
        //标签
      } else if (node.nodeType === 1) {

      }

      if (node.childNodes.length > 0) {
        this.compileNode(node);
      }

    });
  }
}

//多层改值 递归

//监听值的更改
