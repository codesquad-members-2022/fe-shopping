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
}

export { CommonView };
