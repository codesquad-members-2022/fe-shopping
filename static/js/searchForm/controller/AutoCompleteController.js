import { getData } from '../../utils/getData.js';

export default class AutoCompleteController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
    this.autoCompleteEl = view.autoCompleteEl;
    this.listEl = view.listEl;
    this.state = this.model.autoComplete;
    this.show = 'searchForm__autoComplete--show';
    this.hidden = 'searchForm__autoComplete--hidden';
  }

  init() {
    this.view.requestAutoCompleteWords = this.requestAutoCompleteWords.bind(this);
    this.view.clearAutoComplete = this.clearAutoComplete.bind(this);
    this.view.showAutoComplete = this.showAutoComplete.bind(this);
    this.view.hideAutoComplete = this.hideAutoComplete.bind(this);
  }

  async requestAutoCompleteWords(category, inputValue) {
    const words = await getData(
      'http://127.0.0.1:3000/',
      'data',
      `autoComplete?category=${category}&keyword=${inputValue}`
    );

    this.model.setAutoCompleteWords(words);
  }

  clearAutoComplete() {
    this.listEl.innerHTML = '';
  }

  showAutoComplete() {
    this.autoCompleteEl.classList.replace(this.hidden, this.show);
  }

  hideAutoComplete() {
    this.autoCompleteEl.classList.replace(this.show, this.hidden);
  }
}
