export default class CarouselView {
  init(el) {
    this.el = document.querySelector(el);
    this.carouselCnt = 0;
    this.setUp();
    this.start;
    this.carouselPos = [];
  }

  setUp() {
    this.startCarousel();
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

  startCarousel(timestamp) {
    const TIME = 3000;

    if (!this.start) this.start = timestamp;

    const progress = timestamp - this.start;

    if (progress >= TIME) {
      // 캐러셀 움직이는 함수
      this.start = null;
    }
    requestAnimationFrame(this.startCarousel.bind(this));
  }

  stopCarousel() {}

  raiseCarouselCnt() {
    if (this.checkCarouselLastCnt()) this.carouselCnt = 0;
    else this.carouselCnt++;
  }

  checkCarouselLastCnt() {
    if (this.carouselCnt === 5) return true;
  }
}
