import Component from '../../core/Component.js';
import ThirdDepthList from './ThirdDepthList.js';

class SecondDepthList extends Component {

  nextDepthList;

  setup() {
    this.$state = {
      categories: this.$props.categories.children,
    };
  }

  template() {
    return `<ol class="bottom-ui-list second-content">
                ${this.$state.categories
                  .map((category) => `<li class="bottom-ui-list-item"><a href="#">${category.name}</a></li>`)
                  .join('')}
              </ol>
              <ol class="bottom-ui-list third-content"></ol>   
              <img class="background-image" src="${this.$props.categories.bannerImage}" alt="${this.$props.categories.name}" />`;
  }

  mounted() {
    this.$target.classList.add('open');
  }

  setEvent() {
    this.addEvent('mouseover', '.bottom-ui-list-item a', ({ target }) => {
      if (!this.isCorrectEventTarget(target, 'second')) return;
      this.changeFocusedItem(target, 'second');
      const focusedCategory = target.innerText;
      this.renderNextDepthList(focusedCategory, '.third-content', ThirdDepthList);
    })
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
    })
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

export default SecondDepthList;
