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
}

export default SecondDepthList;
