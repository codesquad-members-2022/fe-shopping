import Component from '../../core/Component.js';
import { categories } from '../../../data/index.js';
import CategoryList from './CategoryList.js';

class SelectBox extends Component {

  categoryList;

  setup() {
    this.$state = {
      categories: categories,
    };
  }

  template() {
    return `<button type="button" class="select-btn">전체</button>
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
  }

  removeCategoryList() {
    const $categoryList = this.$target.querySelector('.bottom-ui');
    $categoryList.classList.remove('open');
    setTimeout(() => this.categoryList.destroy(), 250);
  }

}

export default SelectBox;
