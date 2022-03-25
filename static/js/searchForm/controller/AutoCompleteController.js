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
    this.view.clearAutoComplete = this.clearAutoComplete.bind(this);
    this.view.showAutoComplete = this.showAutoComplete.bind(this);
    this.view.hideAutoComplete = this.hideAutoComplete.bind(this);
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
