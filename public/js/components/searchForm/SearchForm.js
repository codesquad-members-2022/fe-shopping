import Component from '../../core/Component.js';
import SelectBox from './SelectBox.js';
import InputBox from './InputBox.js';
import SearchHistoryStore from '../../store/searchHistoryStore.js';
import { abortController } from '../../api/index.js';

class SearchForm extends Component {

  setup() {
    this.$state = {
      isSaveHistoryOn: SearchHistoryStore.isSaveHistoryOn(),
    };
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
      const selectedCategory = this.getSelectedCategory(event.target);
      const $input = event.target.querySelector('.input');
      if (this.$state.isSaveHistoryOn && $input.value) {
        SearchHistoryStore.addHistory({
          item: $input.value,
          link: '#',
        });
      }
      $input.value = '';
    });
  }

  mounted() {
    const $selectBox = this.$target.querySelector('.select-box');
    const $inputBox = this.$target.querySelector('.input-box');

    new SelectBox($selectBox);
    new InputBox($inputBox);
  }

  getSelectedCategory(target) {
    const $select = target.querySelector('#category');
    const selectedIndex = target.querySelector('#category').options.selectedIndex;
    return $select.options[selectedIndex].value;
  }
}

export default SearchForm;
