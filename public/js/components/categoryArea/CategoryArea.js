import Component from '../../core/Component.js';
import FirstDepthList from './FirstDepthList.js';

class CategoryArea extends Component {

  allCategory;

  template() {
    return `<button type="button" class="category-btn">
              <span>카테고리</span>
            </button>
            <div class="bottom-ui"></div>`;
  }

  setEvent() {
    this.addEvent('mouseenter', '.category-area', () => {
      this.renderAllCategory();
    })

    this.addEvent('mouseleave', '.category-area', () => {
      this.removeAllCategory();
    })
  }

  renderAllCategory() {
    if (this.allCategory) this.allCategory.destroy();
    const $categoryContainer = this.$target.querySelector('.bottom-ui');
    this.allCategory = new FirstDepthList($categoryContainer);
  }

  removeAllCategory() {
    if (this.allCategory) this.allCategory.destroy();
    const $categoryContainer = this.$target.querySelector('.bottom-ui');
    $categoryContainer.classList.remove('open');
  }
}

export default CategoryArea;
