import { moveCarousel } from './carousel-content.js';
import { moveCarouselLnb } from './carousel-lnb.js';

let carouselFlag = true;

export function manageCarousel() {
  const carouselLnb = document.querySelector('.carousel-lnb');

  carouselLnb.addEventListener('mouseover', (e) => {
    carouselFlag = false;
    moveCarouselLnb(e);
  });

  carouselLnb.addEventListener('mouseout', () => {
    carouselFlag = true;
  });

  if (carouselFlag) moveCarousel();
  // else moveCarouselLnb();
}
