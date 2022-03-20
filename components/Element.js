class Element {
  constructor() {
    this.state = null;
  }

  setState(state) {
    this.state = state;
    this.render();
  }

  appendElement() {}

  render() {}
}

export default Element;
