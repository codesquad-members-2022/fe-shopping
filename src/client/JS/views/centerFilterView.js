class CenterFilterView {
  constructor(target, transformer) {
    this.presenter = null;
    this.target = target;
    this.transformer = transformer;
    this.parentNode = target.parentNode;
  }

  registerWith = (presenter) => {
    this.presenter = presenter;
  };

  changeTargetInnerText = ({ innerText }) => {
    const filterBox = this.target.children[0];
    filterBox.innerText = innerText;
  };

  toggleIcon = ({ classList }) => {
    classList.toggle("fa-chevron-down");
    classList.toggle("fa-chevron-up");
  };

  changeOptionSelected = (target, option) => {
    target.classList[option]("selected");
  };

  addEventHandler = () => {
    this.transformer.addEventListener(
      "mouseover",
      this.presenter.listMark.handleListMarkEvent
    );
    this.transformer.addEventListener(
      "mouseout",
      this.presenter.listMark.handleListMarkEvent
    );
    this.parentNode.addEventListener("click", this.presenter.handleClickEvent);
    document.addEventListener("click", this.presenter.checkListOpened);
  };
}

export { CenterFilterView };
