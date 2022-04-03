import { CommonView } from "./CommonView";
import { selector } from "../util";

class CategoriesView extends CommonView {
  constructor(target, transformer) {
    super();
    this.target = target;
    this.transformer = transformer;
    this.relativeList = selector("ul", transformer);
  }

  changeInnerTextList = (target, data) => {
    if (!data) return;
    const innerList = data.reduce((pre, post) => pre + `<li>${post}</li>`, "");
    this.changeInnerText(target, innerList);
  };

  showListsAll = () => {
    const listChildren = [...this.transformer.children];
    listChildren.forEach((child) => this.changeOptionNone(child, "remove"));
  };

  addEventHandler = () => {
    this.target.addEventListener("mouseenter", this.presenter.handleShowEvent);
    this.target.addEventListener("mouseleave", this.presenter.handleHideEvent);
    this.transformer.addEventListener(
      "mouseover",
      this.presenter.handleShowEvent
    );
    this.transformer.addEventListener(
      "mouseleave",
      this.presenter.handleHideEvent
    );
    this.transformer.addEventListener(
      "mouseout",
      this.presenter.listMark.showListMark
    );
    this.transformer.addEventListener(
      "mouseover",
      this.presenter.listMark.showListMark
    );
  };
}

export default CategoriesView;
