import { carouselData } from '../../data/carouselData.js';
import { $ } from '../util.js';

export class Carousel {
  constructor() {
    this.$carouselSection = $('.carousel-banner');
  }
  setCarousel() {
    let carouselTemplate = `<img src=${carouselData[0]['img']}>`;
    this.$carouselSection.innerHTML = carouselTemplate;
  }
}
