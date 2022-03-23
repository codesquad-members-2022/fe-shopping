class View {
  _target;

  constructor(target) {
    this._target = target;
  }

  Template(data) {
    return `${data}`;
  }

  getElement(elementName) {
    return document.querySelector("elementName");
  }

  render(data) {
    this._target.innerHTML = this.Template(data);
  }
}

export { View };
