import View from './view.js';

export default class SearchCategoryView extends View {
  init(el) {
    super.init(el);
    this.category = this.el.querySelector('.category');
    this.categoryLink = this.el.querySelector('.search-category__link');
    this.categoryFlag = false;
    this.setUp();
  }

  setUp() {
    this.bindEvents();
  }

  bindEvents() {
    this.el.addEventListener('click', ({ target }) => {
      const categoryList = this.el.querySelector('.category__list');
      this.renderChoiceCategory(target);

      if (!this.categoryFlag) this.showCategoryList(categoryList);
      else this.hideCategoryList(categoryList);
    });
  }

  renderChoiceCategory(target) {
    if (target.classList.contains('category__link')) {
      this.categoryLink.textContent = target.textContent;
    }
  }

  parseSearchCategoryData(data) {
    const categoryEls = this.createCategoryList(data);
    this.category.insertAdjacentHTML('afterbegin', categoryEls);
  }

  createCategoryList(data) {
    return (
      data.reduce((acc, cur) => {
        return acc + this.createCategoryItem(cur.title);
      }, '<ul class="category__list">') + '</ul>'
    );
  }

  createCategoryItem(title) {
    return `<li class="category__item">
      <a href="#" class="category__link">${title}</a>
    </li>`;
  }

  showCategoryList(categoryList) {
    Object.assign(categoryList.style, {
      maxHeight: '2283px',
    });
    this.categoryFlag = true;
  }

  hideCategoryList(categoryList) {
    Object.assign(categoryList.style, {
      maxHeight: '0',
    });
    this.categoryFlag = false;
  }
}
