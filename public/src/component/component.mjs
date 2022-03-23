class Component {
  constructor(parentNode) {
    this.parentNode = parentNode;
  }

  template() {
    return "";
  }

  render() {
    this.parentNode.insertAdjacentHTML("beforeend", this.template());
  }

  setEvent(targetNode) {}
}

export default Component;
