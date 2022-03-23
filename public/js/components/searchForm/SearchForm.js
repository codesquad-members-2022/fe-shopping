import Component from '../../core/Component.js';
import SelectBox from './SelectBox.js';
import InputBox from './InputBox.js';
import BottomWindow from '../common/BottomWindow.js';
import SearchHistoryStore from '../../store/searchHistoryStore.js';
import { abortController } from '../../api/index.js';

class SearchForm extends Component {

  setup() {
    this.$state = {
      isSaveHistoryOn: SearchHistoryStore.isSaveHistoryOn(),
    }
    SearchHistoryStore.subscribe('isSaveHistoryOn', this);
  }

  template() {
    return `<div class="select-box"></div>
            <div class="input-box"></div>`;
  }

  setEvent() {
    this.addEvent('submit', '.search-form', (event) => {
      event.preventDefault();
      abortController && abortController.abort();
      const input = event.target.querySelector('.input');
      if (this.$state.isSaveHistoryOn && input.value) {
        SearchHistoryStore.addHistory({
          item: input.value,
          link: '#',
        });
      }
      else {
        this.renderBottomWindow.call(this.$target.querySelector('.input-box'), '.bottom-window', {
          isSearchHistory: true,
        })
      }
      input.value = '';
    });
  }

  mounted() {
    const $selectBox = this.$target.querySelector('.select-box');
    const $inputBox = this.$target.querySelector('.input-box');

    new SelectBox($selectBox, {
      renderBottomWindow: this.renderBottomWindow.bind($selectBox),
      removeBottomWindow: this.removeBottomWindow.bind($selectBox),
    });
    new InputBox($inputBox, {
      renderBottomWindow: this.renderBottomWindow.bind($inputBox),
      removeBottomWindow: this.removeBottomWindow.bind($inputBox),
    });
  }

  renderBottomWindow(containerClass, props) {
    if (!this.querySelector(containerClass)) this.insertAdjacentHTML('beforeend', `<div class="bottom-window"></div>`)
    new BottomWindow(this.querySelector(containerClass), props);
  }

  removeBottomWindow(containerClass) {
    const $bottomWindow = this.querySelector(containerClass);
    this.removeChild($bottomWindow);
  }
}

export default SearchForm;
