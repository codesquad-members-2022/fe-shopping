import { fetchData } from '../utility/util.js';
import { makeImageSlide } from '../utility/util.js';
import { $ } from '../utility/util.js';
export default class Carousel {
  constructor() {
    this.intervalID = 0;
  }
  async startSlide() {
    const carouselData = await fetchData(
      './public/data/carousel/carousel.json'
    );

    const $imageContainer = $('.image-container');
    const slideTemplates = carouselData.slideData.reduce(
      (pre, curList) => (pre += makeImageSlide(curList)),
      ''
    );
    $imageContainer.innerHTML = slideTemplates;
    this.initInterval($imageContainer, carouselData);
  }

  initInterval($imageContainer, carouselData) {
    console.log(carouselData);
    this.intervalID = setInterval(
      () =>
        this.translateContainer(
          -1,
          $imageContainer,
          carouselData.slideData.length
        ),
      2000
    );
  }

  translateContainer(direction, container, totalSlide) {
    const selectedBtn = direction === 1 ? 'back' : 'next';
    container.style.transitionDuration = '1ms';
    container.style.transform = `translateY(${
      direction * (600 / totalSlide)
    }%)`;
    container.ontransitionend = () =>
      this.changeLocationEl(container, selectedBtn);
  }

  changeLocationEl(container, selectedBtn) {
    container.removeAttribute('style');
    selectedBtn === 'back'
      ? container.insertBefore(
          container.lastElementChild,
          container.firstElementChild
        )
      : container.appendChild(container.firstElementChild);
  }
}
