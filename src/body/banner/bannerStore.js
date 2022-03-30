export const bannerStore = {
  observers: [],
  state: {
    tabNum: 0,
  },

  setTabNum(num) {
    if (num === this.state.tabNum) return;
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
      if (!observer.update) return;
      observer.update(tabNum);
    });
  },
};
