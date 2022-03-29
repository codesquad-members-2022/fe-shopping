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
}

export default ThirdDepthList;
