export default class AutoCompleteController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
    this.state = this.model.autoComplete;
  }

  init() {
    this.view.init();
  }
}
