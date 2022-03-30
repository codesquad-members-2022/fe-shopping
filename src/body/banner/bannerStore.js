export const bannerStore = {
  observers: [],
  state: {
    tabNum: 0,
    tabLength: null,
    carouselIntervalId: null,
  },

  setTabNum(num) {
    this.state.tabNum = num;
    this.notifyUpdatedTabNum(this.state.tabNum);
  },

  setTabLength(length) {
    this.state.tabLength = length;
  },

  getTabNum() {
    return this.state.tabNum;
  },

  getTabLength() {
    return this.state.tabLength;
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

  setCarouselInterval(ms) {
    if (this.state.carouselIntervalId) clearInterval(this.state.carouselIntervalId);
    this.state.carouselIntervalId = setInterval(() => {
      const nextTabNum = (this.getTabNum() + 1) % this.getTabLength();
      this.setTabNum(nextTabNum);
    }, ms);
  },
};
