import { $ } from '../utility/util.js';
import { addEvent } from '../utility/util.js';
import { fetchData } from '../utility/util.js';
import { makeImageSlide } from '../utility/util.js';
import { makeSideTeb } from '../utility/util.js';
export default class Carousel {
  constructor() {
    this.intervalID = 0;
  }
  async startSlide() {
    const carouselData = await fetchData(
      './public/data/carousel/carousel.json'
    );

    const $imageContainer = this.renderMainImage(carouselData);
    this.renderSubMenu(carouselData);

    this.addSubMenuEvent();
    this.initInterval($imageContainer, carouselData);
  }

  renderMainImage(carouselData) {
    const $imageContainer = $('.image-container');
    const slideTemplates = carouselData.slideData.reduce(
      (pre, curList) => (pre += makeImageSlide(curList)),
      ''
    );
    $imageContainer.innerHTML = slideTemplates;
    return $imageContainer;
  }

  renderSubMenu(carouselData) {
    const $slideTeb = $('.slide-teb-container');
    const slideTebTemplates = carouselData.slideData.reduce(
      (pre, curList) => (pre += makeSideTeb(curList)),
      ''
    );
    $slideTeb.innerHTML = slideTebTemplates;
  }

  initInterval($imageContainer, carouselData) {
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
    container.style.transitionDuration = '1ms';
    container.style.transform = `translateY(${
      direction * ((totalSlide * 100) / totalSlide)
    }%)`;
    container.ontransitionend = () => this.changeLocationEl(container);
  }

  changeLocationEl(container) {
    container.removeAttribute('style');
    container.appendChild(container.firstElementChild);
  }

  addSubMenuEvent() {
    const $slideTeb = $('.slide-teb-container');
    addEvent($slideTeb, 'mouseover', this.changeImage);
  }

  changeImage = ({ target }) => {
    if (!target.closest('li')) return;
    else if (target.closest('img')) return;
  };
}
