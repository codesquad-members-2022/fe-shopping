import Component from '../../core/Component.js';
import SelectBox from './SelectBox.js';
import InputBox from './InputBox.js';

class SearchForm extends Component {

  template() {
    return `<form action="#" class="search-form"></form>`;
  }

  mounted() {
    const $searchForm = this.$target.querySelector('.search-form');
    new SelectBox($searchForm);
    new InputBox($searchForm);
  }
}

export default SearchForm;
