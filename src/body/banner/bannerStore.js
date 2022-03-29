export const bannerStore = {
  observers: [],
  state: {
    tabNum: 0,
  },

  setTabNum(num) {
    this.state.tabNum = num;
    this.notifyUpdatedTabNum(this.state.tabNum);
  },

  register(observer) {
    this.observers.push(observer);
  },

  unregister(observer) {
    this.observers.splice(this.observers.indexOf(observer), 1);
  },

  notifyUpdatedTabNum(tabNum) {
    this.observers.forEach((observer) => {
      if (!observer.updateList) return;
      observer.updateList(tabNum);
    });
  },
};
