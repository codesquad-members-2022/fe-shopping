export class SearchCategories {
  constructor(updateCategory) {
    this.$searchWrap = document.querySelector('.header__search-wrap');
    this.$categories = this.$searchWrap.querySelector('.search-categories');
    this.render();
    this.addEventListener(updateCategory);
  }

  render() {
    const categories = ['전체', '여성패션', '남성패션', '뷰티', '식품', '주방용품', '생활용품'];
    const categoriesTemplate = categories
      .map(
        (category) => `<li data-category="${category}">
                        <span>${category}</span>
                      </li>`
      )
      .join('');
    this.$categories.insertAdjacentHTML('afterbegin', categoriesTemplate);
  }

  addSearchCategoriesEvent(updateCategory) {
    this.$categories.addEventListener('click', ({ target }) => {
      const selectedCategory = target.dataset.category;
      updateCategory(selectedCategory);
    });
  }

  addEventListener(updateCategory) {
    this.addSearchCategoriesEvent(updateCategory);
  }
}
