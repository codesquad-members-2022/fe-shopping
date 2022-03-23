export default class SmartMenuView {
  constructor() {}

  init(el) {
    this.el = document.querySelector(el);
    this.lnbFirstList = this.el.querySelector('.header-lnb-first__list');
    this.lnbSecondList = this.el.querySelectorAll('.header-lnb-second__list');
    this.setUp();
  }

  setUp() {
    this.hide(this.lnbFirstList);
    this.lnbSecondList.forEach((e) => this.hide(e));
    this.bindEvents();
  }

  bindEvents() {
    this.el.addEventListener('mouseover', ({ target }) => {
      this.debounce(this.showFirstLnb.bind(this), 100, target);
    });

    // this.el.addEventListener('mouseout', ({ target }) => {
    //   this.debounce(this.hideFirstLnb.bind(this), 100, target);
    // });

    // this.lnbFirstList.addEventListener('mouseover', (e) => {
    //   this.debounce(this.checkMouseOverEl.bind(this), 100, e.target);
    // });
  }

  showFirstLnb(target) {
    this.show(this.lnbFirstList);
    this.checkMouseOverEl(target);
  }

  checkMouseOverEl(target) {
    // this.lnbSecondList.forEach((e) => this.hide(e));
    const lnbSecondEl = Array.from(this.lnbSecondList).filter((e) => {
      if (e.dataset.secondList === target.dataset.secondList) return e;
    });
    if (lnbSecondEl.length) this.show(...lnbSecondEl);
  }

  hideFirstLnb() {
    this.hide(this.lnbFirstList);
  }

  showSecondLnb() {
    this.show(this.lnbFirstList);
  }

  debounce(func, time, target = false) {
    let debounceTimer;

    return (() => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (!target) func();
        else func(target);
      }, time);
    })();
  }

  show(el) {
    Object.assign(el.style, { display: 'block' });
  }

  hide(el) {
    Object.assign(el.style, { display: 'none' });
  }
}
