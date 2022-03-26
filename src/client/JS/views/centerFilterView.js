import { CommonView } from "./CommonView";

class CenterFilterView extends CommonView {
  constructor(target, transformer) {
    super();
    this.target = target;
    this.transformer = transformer;
    this.parentNode = target.parentNode;
  }

  changeTargetInnerText = ({ innerText }) => {
    const filterBox = this.target.children[0];
    filterBox.innerText = innerText;
  };

  toggleIcon = ({ classList }) => {
    classList.toggle("fa-chevron-down");
    classList.toggle("fa-chevron-up");
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

export default CenterFilterView;
