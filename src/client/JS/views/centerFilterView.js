class CenterFilterView {
  constructor(presenter) {
    this.presenter = presenter;
    this.parentNode = presenter.target.parentNode;
  }

  changeTargetInnerText = ({ innerText }) => {
    const filterBox = this.presenter.target.children[0];
    filterBox.innerText = innerText;
  };

  toggleIcon = ({ classList }) => {
    classList.toggle("fa-chevron-down");
    classList.toggle("fa-chevron-up");
  };

  addEvent = () => {
    this.parentNode.addEventListener("click", this.presenter.handleClickEvent);
    document.addEventListener("click", this.presenter.checkListOpened);
  };
}

export { CenterFilterView };
