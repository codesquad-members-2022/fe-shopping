import Component from '../../core/Component.js';
import CategoryStore from '../../store/CategoryStore.js';

class CategoryList extends Component {

  template() {
    return `<div class="bottom-ui-contents">
              <ol class="bottom-ui-list">
                ${this.$props.categories
                  .map((category) => `<li class="bottom-ui-list-item"><a href="${category.link}">${category.item}</a></li>`)
                  .join('')}
              </ol>
            </div>`;
  }

  setEvent() {
    this.addEvent('mousedown', '.bottom-ui', (event) => {
      event.preventDefault();
      if (event.target.tagName !== 'A') return;
      CategoryStore.changeSelectedCategory(event.target.innerText);
    }, true);
  }

  mounted() {
    this.$target.classList.add('open');
  }
}

export default CategoryList;
