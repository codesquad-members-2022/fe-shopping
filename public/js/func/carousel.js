let start = null;
let xCoordi = 0;
<<<<<<< HEAD
let slideCnt = 0;
=======
let cnt = 0;
>>>>>>> fcce232 (style: 검색창 카테고리 마크업, 스타일링 완료)
export let raf;

function setBackCarousel() {
  const carousel = document.querySelector('.carousel-inner__list');

  carousel.style.transform = `translateX(0px)`;
}

<<<<<<< HEAD
function checkCarouselLast() {
  const carouselNum = document.querySelectorAll('.carousel-inner__item');

  if (slideCnt === carouselNum.length - 1) {
    slideCnt = 0;
=======
function checkCarousel() {
  const carouselNum = document.querySelectorAll('.carousel-inner__item');

  if (cnt === carouselNum.length - 1) {
    cnt = 0;
>>>>>>> fcce232 (style: 검색창 카테고리 마크업, 스타일링 완료)
    xCoordi = 0;
    return true;
  }
}

function cntCarousel() {
<<<<<<< HEAD
  slideCnt++;
=======
  cnt++;
>>>>>>> fcce232 (style: 검색창 카테고리 마크업, 스타일링 완료)
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
<<<<<<< HEAD
    if (checkCarouselLast()) setBackCarousel();
=======
    if (checkCarousel()) setBackCarousel();
>>>>>>> fcce232 (style: 검색창 카테고리 마크업, 스타일링 완료)
    start = null;
  }

  requestAnimationFrame(moveCarousel);
}
