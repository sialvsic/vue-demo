class Vue {
  constructor(options) {
    this.$options = options;
    this._data = options.data;

    this.observer(this._data);
    this.compile(options.el);
  }

  compile(el) {
    let element = document.querySelector(el);
    console.log(element);
    this.compileNode(element);
  }

  observer(data) {
    Object.keys(data).forEach((key) => {
      let value = data[key];

      let dep = new Dep();

      Object.defineProperty(data, key, {
        configurable: true,
        enumerable: true,
        get() {
          if (Dep.target) {
            dep.addSub(Dep.target);
          }
          return value;
        },
        set(newValue) {
          if (newValue !== value) {
            value = newValue;
            dep.notify(newValue);
          }
        },
      });
    });
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
          console.log(RegExp.$1); //下标
          node.textContent = this._data[RegExp.$1];

          new Watcher(this, RegExp.$1, (newValue) => {
            node.textContent = newValue;
          });

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

//监听值的更改   劫持 通知

//发布订阅
class Dep {
  constructor() {
    this.subsribe = [];
  }

  addSub(sub) {
    this.subsribe.push(sub);
  }

  notify(newValue) {
    this.subsribe.forEach((sub) => {
      sub.update(newValue);
    });
  }
}

class Watcher {
  constructor(vm, exp, cb) {
    Dep.target = this;  //防止Watcher 重复添加

    vm._data[exp]; //为了触发get

    this.cb = cb;
    Dep.target = null; //放置重复添加
  }

  update(newValue) {
    console.log('更新', newValue);
    this.cb(newValue);

  }
}

// let dep = new Dep();
//
// let watcher1 = new Watcher();
// let watcher2 = new Watcher();
// let watcher3 = new Watcher();
//
// dep.addSub(watcher1);
// dep.addSub(watcher2);
// dep.addSub(watcher3);
//
// dep.notify();
