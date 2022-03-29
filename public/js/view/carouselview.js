import View from './view.js';

export default class CarouselView extends View {
  init(el) {
    super.init(el);
    this.carousel = this.el.querySelector('.carousel-inner__list');
    this.carouselElWidth = this.carousel.offsetWidth;
    this.carouselLnb = this.el.querySelector('.carousel-lnb');
    this.carouselLnbEls = this.carouselLnb.querySelectorAll(
      '.carousel-lnb__item'
    );
    this.carouselIndex = 0;
    this.carouselPos = [
      this.carouselElWidth * 0,
      this.carouselElWidth * -1,
      this.carouselElWidth * -2,
      this.carouselElWidth * -3,
      this.carouselElWidth * -4,
      this.carouselElWidth * -5,
    ];
    this.start;
    this.carouselRAF;
    this.setUp();
  }

  setUp() {
    this.startCarousel();
    this.bindEvents();
  }

  bindEvents() {
    const DEBOUNCE_TIME = 3000;

    this.carouselLnb.addEventListener('mouseover', ({ target }) => {
      this.startLnb(target);
    });

    this.carouselLnb.addEventListener('mouseleave', () => {
      this.debounce(this.startCarousel.bind(this), DEBOUNCE_TIME);
    });
  }

  startCarousel(timestamp) {
    const TIME = 3000;

    if (!this.start) this.start = timestamp;

    const progress = timestamp - this.start;

    if (progress >= TIME) {
      this.moveLnb(this.carouselIndex);
      this.moveCarousel(this.carouselIndex);
      this.start = null;
    }
    this.carouselRAF = requestAnimationFrame(this.startCarousel.bind(this));
  }

  moveCarousel(carouselIndex) {
    this.moveCarouselEl(carouselIndex);
    this.raiseCarouselIndex();
  }

  stopCarousel() {
    cancelAnimationFrame(this.carouselRAF);
  }

  startLnb(target) {
    this.stopCarousel();
    if (target.dataset.num) this.chooseLnb(target.dataset.num);
  }

  moveLnb(carouselIndex) {
    this.disableLnbEls();
    this.addClassActive(carouselIndex);
  }

  addClassActive(carouselIndex) {
    this.carouselLnbEls[carouselIndex].classList.add(
      'carousel-lnb__item--active'
    );
  }

  removeClassActive(e) {
    if (e.classList.contains('carousel-lnb__item--active'))
      e.classList.remove('carousel-lnb__item--active');
  }

  disableLnbEls() {
    this.carouselLnbEls.forEach((e) => {
      this.removeClassActive(e);
    });
  }

  chooseLnb(lnbIndex) {
    this.disableLnbEls();
    this.moveCarouselEl(lnbIndex);
    this.addClassActive(lnbIndex);
  }

  moveCarouselEl(carouselIndex) {
    Object.assign(this.carousel.style, {
      transform: `translateX(${this.carouselPos[carouselIndex]}px)`,
    });
  }

  raiseCarouselIndex() {
    const CAROUSEL_FIRST_INDEX = 1;

    if (this.checkCarouselLastCnt()) this.carouselIndex = CAROUSEL_FIRST_INDEX;
    else this.carouselIndex++;
  }

  checkCarouselLastCnt() {
    const CAROUSEL_LAST_INDEX = this.carouselLnbEls.length - 1;

    if (this.carouselIndex === CAROUSEL_LAST_INDEX) return true;
  }

  parseCarouselImg(data) {
    const carouselImgs = document.querySelectorAll('.carousel-inner__img');
    carouselImgs.forEach((e, i) => {
      e.src = data[i].src;
      e.alt = data[i].alt;
    });
  }

  parseCarouselLnbImg(data) {
    const carouselLnbImgs = document.querySelectorAll('.carousel-lnb__img');
    carouselLnbImgs.forEach((e, i) => {
      e.src = data[i].src;
      e.alt = data[i].alt;
    });
  }
}
