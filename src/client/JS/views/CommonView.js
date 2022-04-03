class CommonView {
  constructor() {
    this.presenter = null;
  }

  registerWith = (presenter) => {
    this.presenter = presenter;
  };

  changeOptionSelected = (target, option) => {
    target.classList[option]("selected");
  };

  changeOptionHidden = (target, option) => {
    target.classList[option]("hidden");
  };

  changeOptionNone = (target, option) => {
    target.classList[option]("none");
  };

  changeInnerText = (target, text) => {
    target.innerHTML = text;
  };

  changeWidth = (target, width) => {
    target.style.width = width;
  };
}

export { CommonView };
