import View from './view.js';

export default class SearchCategoryView extends View {
  init(el) {
    super.init(el);
    this.categoryEls = this.el.querySelectorAll('.category__link');
    this.setUp();
  }

  setUp() {}

  bindEvents() {}

  parseSearchCategoryData(data) {
    this.categoryEls.forEach((e, i) => {
      e.textContent = data.category[i].title;
    });
  }
}
