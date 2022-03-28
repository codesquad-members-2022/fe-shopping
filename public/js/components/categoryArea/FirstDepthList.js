import { allCategories } from '../../../data';
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

  isCorrectEventTarget(target, depth) {
    const container = target.parentNode.parentNode;
    return container.classList.contains(`${depth}-content`);
  }

  changeFocusedItem(target, depth) {
    const container = target.parentNode.parentNode;
    if (!container.classList.contains(`${depth}-content`)) return;
    [...container.children].forEach((child) => {
      if (child === target.parentNode) child.classList.add('focus');
      else child.classList.remove('focus');
    });
  }

  renderNextDepthList(focusedCategory, containerClass, Component) {
    const nextDepthCategories = this.$state.categories.find((category => category.name === focusedCategory));
    const $nextDepthContainer = this.$target.querySelector(containerClass);
    $nextDepthContainer.classList.add('open');
    if (this.nextDepthList) this.nextDepthList.destroy();
    this.nextDepthList = new Component($nextDepthContainer, {
      categories: nextDepthCategories,
    });
  }
}

export default FirstDepthList;
