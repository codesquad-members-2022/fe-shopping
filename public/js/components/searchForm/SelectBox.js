import Component from '../../core/Component.js';
import CategoryList from './CategoryList.js';
import CategoryStore from '../../store/CategoryStore.js';

class SelectBox extends Component {

  categoryList;

  setup() {
    this.$state = {
      categories: CategoryStore.getCategories(),
    };
    CategoryStore.subscribe('categories', this);
  }

  template() {
    return `<button type="button" class="select-btn">${this.getSelectedCategory()}</button>
            <div class="bottom-ui"></div>`;
  }

  setEvent() {
    this.addEvent('click', '.select-btn', () => {
      const $bottomUI = this.$target.querySelector('.bottom-ui');

      if ($bottomUI.classList.contains('open')) this.removeCategoryList();
      else this.renderCategoryList({ categories: this.$state.categories });
    });

    this.addEvent('blur', '.select-box', () => {
      this.removeCategoryList();
    }, true);
  }

  renderCategoryList(props) {
    if (this.categoryList) this.categoryList.destroy();
    this.categoryList = new CategoryList(this.$target.querySelector('.bottom-ui'), props);
    this.$target.querySelector('.select-btn').classList.add('selected');
  }

  removeCategoryList() {
    this.$target.querySelector('.bottom-ui').classList.remove('open');
    this.$target.querySelector('.select-btn').classList.remove('selected');
    setTimeout(() => this.categoryList.destroy(), 250);
  }

  getSelectedCategory() {
    return this.$state.categories.find(category => category.isSelected).item;
  }

}

export default SelectBox;
