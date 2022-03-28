import View from './view.js';

export default class SmartMenuView extends View {
  init(el) {
    super.init(el);
    this.lnbFirstList = this.el.querySelector('.header-lnb-first__list');
    this.lnbSecondListAll = this.el.querySelectorAll(
      '.header-lnb-second__list'
    );
    this.lnbThirdListAll = this.el.querySelectorAll('.header-lnb-third__list');
    this.setUp();
  }

  setUp() {
    this.hide(this.lnbFirstList);
    this.lnbSecondListAll.forEach((e) => this.hide(e));
    this.lnbThirdListAll.forEach((e) => this.hide(e));
    this.bindEvents();
  }

  bindEvents() {
    const DEBOUNCE_TIME = 50;

    this.el.addEventListener('mouseenter', () => {
      this.debounce(this.showFirstLnb.bind(this), DEBOUNCE_TIME);
    });

    this.el.addEventListener('mouseleave', () => {
      this.debounce(this.hideFirstLnb.bind(this), DEBOUNCE_TIME);
      this.debounce(this.hideSecondLnb.bind(this), DEBOUNCE_TIME);
    });

    this.lnbFirstList.addEventListener('mouseover', ({ target }) => {
      this.debounce(this.showSecondLnb.bind(this), DEBOUNCE_TIME, target);
    });

    this.lnbSecondListAll.forEach((e) => {
      e.addEventListener('mouseover', ({ target }) => {
        this.debounce(this.showThirdLnb.bind(this), DEBOUNCE_TIME, target);
      });

      e.addEventListener('mouseleave', () => {
        this.debounce(this.hideThirdLnb.bind(this), DEBOUNCE_TIME);
      });
    });
  }

  showFirstLnb() {
    this.show(this.lnbFirstList);
  }

  hideFirstLnb() {
    this.hide(this.lnbFirstList);
  }

  showSecondLnb(target) {
    if (target.classList.contains('header-lnb-first__link')) {
      this.lnbSecondListAll.forEach((e) => {
        if (e.dataset.secondList === target.dataset.secondList) this.show(e);
        else this.hide(e);
      });
    }
  }

  hideSecondLnb() {
    this.lnbSecondListAll.forEach((e) => this.hide(e));
  }

  showThirdLnb(target) {
    if (target.classList.contains('header-lnb-second__link')) {
      this.lnbThirdListAll.forEach((el) => {
        if (el.dataset.thirdList === target.dataset.thirdList) this.show(el);
        else this.hide(el);
      });
    }
  }

  hideThirdLnb() {
    this.lnbThirdListAll.forEach((e) => {
      this.hide(e);
    });
  }
}
