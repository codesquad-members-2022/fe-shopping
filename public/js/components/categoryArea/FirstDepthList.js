import { allCategories } from '../../../data/index.js';
import Component from '../../core/Component.js';
import SecondDepthList from './SecondDepthList.js';

class FirstDepthList extends Component {

  nextDepthList;

  setup() {
    this.$state = {
      categories: allCategories,
    };
  }

  template() {
    return `<div class="bottom-ui-contents first-depth">
              <ol class="bottom-ui-list first-content">
                ${this.$state.categories
                  .map((category) => `<li class="bottom-ui-list-item"><a href="#">${category.name}</a></li>`)
                  .join('')}
              </ol>
            </div>
            <div class="bottom-ui-contents second-depth"></div>`;
  }

  setEvent() {
    this.addEvent('mouseover', '.bottom-ui-list-item a', ({ target }) => {
      if (!this.isCorrectEventTarget(target, 'first')) return;
      this.changeFocusedItem(target, 'first');
      const focusedCategory = target.innerText;
      this.renderNextDepthList(focusedCategory, '.second-depth', SecondDepthList);
    });
  }

  mounted() {
    this.$target.classList.add('open');
  }
}

export default FirstDepthList;
