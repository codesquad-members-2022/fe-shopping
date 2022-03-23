function View (selector) {
  this.element = document.querySelector(selector);
}
View.prototype.getTemplate = function (state) {
  return `${state}`
}
View.prototype.hide = function () {
  this.element.style.display = 'none';
}
View.prototype.show = function (state) {
  this.element.style.display = 'block';
  this.element.innerHTML = this.getTemplate(state);
}

export default View;