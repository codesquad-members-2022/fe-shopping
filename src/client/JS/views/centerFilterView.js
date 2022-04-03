import { CommonView } from "./CommonView";
import { getStyle, selector } from "../util";
import { searchFilterInterval } from "../constant";

class CenterFilterView extends CommonView {
  constructor(target, transformer) {
    super();
    this.target = target;
    this.transformer = transformer;
    this.parentNode = target.parentNode;
    this.lengthIncreased = null;
    this.originHeight = null;
  }

  activateRequestAF = (length) => {
    this.lengthIncreased
      ? (length += searchFilterInterval)
      : (length -= searchFilterInterval);
    window.requestAnimationFrame(() => {
      this.resizeList(length);
    });
  };

  resizeList = (length) => {
    const { style, classList } = this.transformer;
    style.height = `${length}px`;
    if (this.lengthIncreased) {
      length < this.originHeight ? this.activateRequestAF(length) : null;
    } else {
      length > 0 ? this.activateRequestAF(length) : classList.add("hidden");
    }
  };

  toggleList = () => {
    const { classList } = this.transformer;
    const height = getStyle(this.transformer, "height");
    let length = Number(height.replace("px", ""));

    if (!this.originHeight) {
      this.originHeight = length; // set default tranformer length
      length = length % searchFilterInterval;
    }

    this.lengthIncreased = length < searchFilterInterval;
    if (this.lengthIncreased) classList.remove("hidden");
    this.resizeList(length);
  };

  toggleIcon = () => {
    const target = selector("i", this.parentNode);
    const { classList } = target;
    classList.toggle("fa-chevron-down");
    classList.toggle("fa-chevron-up");
  };

  changeTargetInnerText = ({ innerText }) => {
    const filterBox = this.target.children[0];
    this.changeInnerText(filterBox, innerText);
  };

  addEventHandler = () => {
    this.transformer.addEventListener(
      "mouseover",
      this.presenter.listMark.showListMark
    );
    this.transformer.addEventListener(
      "mouseout",
      this.presenter.listMark.showListMark
    );
    this.parentNode.addEventListener("click", this.presenter.handleClickEvent);
    document.addEventListener("click", this.presenter.checkListOpened);
  };
}

export default CenterFilterView;
