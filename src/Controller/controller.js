class Controller {
  _target;
  _model;
  _view;

  constructor(target, model, view) {
    this._target = target;
    this._model = model;
    this._view = view;
  }

  setData(inputValue) {
    return this._model.getData(inputValue);
  }

  render(data) {
    this._view.render(data);
  }

  init() {
    this.addEvent();
  }

  addEvent() {
    this._target.addEventListener("input", this.EvtHandler);
  }

  EvtHandler = (e) => {};
}

export { Controller };
