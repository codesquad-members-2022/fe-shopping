let start = null;
let xCoordi = 0;
let cnt = 0;

function setBackCarousel() {
  const carousel = document.querySelector('.carousel-inner__list');

  carousel.style.transform = `translateX(0px)`;
}

function checkCarousel() {
  const carouselNumber = document.querySelectorAll('.carousel-inner__item');

  if (cnt === carouselNumber.length - 1) {
    cnt = 0;
    xCoordi = 0;
    return true;
  }
}

function countCarousel() {
  cnt++;
}

function calcCarouselCoordi() {
  const carousel = document.querySelector('.carousel-inner__list');
  const carouselElWidth = carousel.querySelector('.carousel-inner__item');

  xCoordi -= carouselElWidth.offsetWidth;
  carousel.style.transform = `translateX(${xCoordi}px)`;
  countCarousel();

  if (checkCarousel()) setBackCarousel();
}

export function moveCarousel(timestamp) {
  const TIME = 3000;

  if (!start) start = timestamp;
  const progress = timestamp - start;

  if (progress > TIME) {
    calcCarouselCoordi();
    start = null;
  }

  requestAnimationFrame(moveCarousel);
}
