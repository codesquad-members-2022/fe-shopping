let start = null;
let xCoordi = 0;
let cnt = 0;
export let raf;

function setBackCarousel() {
  const carousel = document.querySelector('.carousel-inner__list');

  carousel.style.transform = `translateX(0px)`;
}

function checkCarousel() {
  const carouselNum = document.querySelectorAll('.carousel-inner__item');

  if (cnt === carouselNum.length - 1) {
    cnt = 0;
    xCoordi = 0;
    return true;
  }
}

function cntCarousel() {
  cnt++;
}

export function moveCarousel(timestamp) {
  const TIME = 3000;
  const carousel = document.querySelector('.carousel-inner__list');
  const carouselElWidth = carousel.querySelector('.carousel-inner__item');

  if (!start) start = timestamp;
  const progress = timestamp - start;

  if (progress > TIME) {
    xCoordi -= carouselElWidth.offsetWidth;
    carousel.style.transform = `translateX(${xCoordi}px)`;
    cntCarousel();
    if (checkCarousel()) setBackCarousel();
    start = null;
  }

  requestAnimationFrame(moveCarousel);
}
