import Component from '../../core/Component.js';
import SelectBox from './SelectBox.js';
import InputBox from './InputBox.js';
import BottomWindow from '../common/BottomWindow.js';

class SearchForm extends Component {

  template() {
    return `<form action="#" class="search-form"></form>`;
  }

  mounted() {
    const { renderBottomWindow, removeBottomWindow } = this;
    const $searchForm = this.$target.querySelector('.search-form');

    new SelectBox($searchForm, {
      renderBottomWindow: renderBottomWindow.bind($searchForm),
      removeBottomWindow: removeBottomWindow.bind($searchForm),
    });
    new InputBox($searchForm, {
      renderBottomWindow: renderBottomWindow.bind($searchForm),
      removeBottomWindow: removeBottomWindow.bind($searchForm),
    });
  }

  renderBottomWindow(containerClass, props) {
    const $container = this.querySelector(containerClass);
    new BottomWindow($container, props);
  }

  removeBottomWindow(containerClass) {
    const $container = this.querySelector(containerClass);
    const $bottomWindow = $container.querySelector('.bottom-window');
    if ($bottomWindow) $container.removeChild($bottomWindow);
  }
}

export default SearchForm;
