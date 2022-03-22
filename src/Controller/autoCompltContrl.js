class Controller {
  _target;
  _model;
  _view;

  constructor(target, model, view) {
    this._target = target;
    this._model = model;
    this._view = view;
  }

  setState(newState) {
    this._model.setState(newState);
    this.render(this._model.getState());
  }

  render(state) {
    this._view.render(state);
  }

  addEvent() {}
}
