import Component from '../../core/Component.js';

class ThirdDepthList extends Component {

  setup() {
    this.$state = {
      categories: this.$props.categories.children,
    };
  }

  template() {
    return `${this.$state.categories
                .map((category) => `<li class="bottom-ui-list-item"><a href="#">${category.name}</a></li>`)
                .join('')}`;
  }

  mounted() {
    this.$target.classList.add('open');
  }

  setEvent() {
    this.addEvent('mouseover', '.bottom-ui-list-item a', (event) => {
      if (!this.isCorrectEventTarget(event.target, 'third')) return;
      this.changeFocusedItem(event.target, 'third');
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
}

export default ThirdDepthList;
