import SearchInput from "./SearchInput.js";
import SearchAutoComplete from "./SearchAutoComplete.js";
import { getAutoComplete } from "../api.js";

export default class SearchController {
  constructor() {
    this.$form = document.querySelector('.searchForm');
    this.input = new SearchInput();
    this.autoComplete = new SearchAutoComplete();
    this.addEvents();
  }
  addEvents() {
    this.input.$input.addEventListener('input', ({target}) => { 
      getAutoComplete(target.value).then(data => {
        this.autoComplete.list = data;
      });
    });
  }
}
