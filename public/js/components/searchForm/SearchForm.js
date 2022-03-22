import Component from '../../core/Component.js';
import SelectBox from './SelectBox.js';
import InputBox from './InputBox.js';
import BottomWindow from '../common/BottomWindow.js';
import SearchHistoryStore from '../../store/searchHistoryStore.js';

class SearchForm extends Component {

  template() {
    return `<div class="select-box"></div>
            <div class="input-box"></div>`;
  }

  setEvent() {
    this.addEvent('submit', '.search-form', (event) => {
      event.preventDefault();
      const input = event.target.querySelector('.input');
      SearchHistoryStore.addHistory({
        item: input.value,
        link: '#',
      });
      input.value = '';
    });
  }

  mounted() {
    const { renderBottomWindow, removeBottomWindow } = this;
    const $selectBox = this.$target.querySelector('.select-box');
    const $inputBox = this.$target.querySelector('.input-box');

    new SelectBox($selectBox, {
      renderBottomWindow: renderBottomWindow.bind($selectBox),
      removeBottomWindow: removeBottomWindow.bind($selectBox),
    });
    new InputBox($inputBox, {
      renderBottomWindow: renderBottomWindow.bind($inputBox),
      removeBottomWindow: removeBottomWindow.bind($inputBox),
    });
  }

  renderBottomWindow(containerClass, props) {
    const $container = this.querySelector(containerClass);
    new BottomWindow($container, props);
  }

  removeBottomWindow(containerClass) {
    const $bottomWindow = this.querySelector(containerClass);
    $bottomWindow.classList.remove('open');
    $bottomWindow.innerHTML = '';
  }
}

export default SearchForm;
