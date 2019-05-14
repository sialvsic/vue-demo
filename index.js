//发布订阅
class Dep {
  constructor() {
    this.subsribe = [];
  }

  addSub(sub) {
    this.subsribe.push(sub);
  }

  notify() {
    this.subsribe.forEach((sub) => {
      sub.update();
    });
  }
}

class Watcher {
  constructor() {

  }

  update() {
    console.log('更新');
  }
}

let dep = new Dep();

let watcher1 = new Watcher();
let watcher2 = new Watcher();
let watcher3 = new Watcher();

dep.addSub(watcher1);
dep.addSub(watcher2);
dep.addSub(watcher3);


dep.notify()
