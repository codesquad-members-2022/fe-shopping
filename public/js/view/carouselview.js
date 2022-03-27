export default class CarouselView {
  init(el) {
    this.el = document.querySelector(el);
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
