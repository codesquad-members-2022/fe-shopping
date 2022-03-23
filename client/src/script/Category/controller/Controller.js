function Controller (view, model) {
  this.view = view;
  this.model = model;
}
Controller.prototype.setState = function (state) {
  this.model.setState(state);
}
Controller.prototype.show = function () {
  this.view.show(this.model.getState());
}
Controller.prototype.hide = function () {
  this.view.hide();
}
Controller.prototype.addEventListener = function (event, eventHandler) {
  this.view.element.addEventListener(event, eventHandler);
}

export default Controller;