import { makeImageSlide, makeSideTab } from '../utility/template.js';

export default class RenderCarousel {
  renderMainImage(carouselData, mainContainer) {
    const slideTemplates = carouselData.slideData.reduce(
      (pre, curList) => (pre += makeImageSlide(curList)),
      ''
    );
    mainContainer.innerHTML = slideTemplates;
  }

  renderSubMenu(carouselData, sideTab) {
    const slideTabTemplates = carouselData.slideData.reduce(
      (pre, curList) => (pre += makeSideTab(curList)),
      ''
    );
    sideTab.innerHTML = slideTabTemplates;
  }
}
