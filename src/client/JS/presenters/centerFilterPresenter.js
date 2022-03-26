import { selector, getStyle, isHidden } from "../util";
import { searchFilterInterval } from "../constant";
import { ListMark } from "./ListMark";

class CenterFilterPresenter {
  constructor(view) {
    this.view = view;
    this.target = view.target;
    this.transformer = view.transformer;
    this.listMark = new ListMark(view);
  }

  activateRequestAF = (length) => {
    const changeLength = {
      plus: () => (length += searchFilterInterval),
      minus: () => (length -= searchFilterInterval),
    };
    changeLength[this.lengthDirection]();
    window.requestAnimationFrame(() => {
      this.resizeList(length);
    });
  };

  resizeList = (length) => {
    const { style, classList } = this.transformer;
    const compareLength = {
      plus: () =>
        length < this.originHeight ? this.activateRequestAF(length) : null,
      minus: () =>
        length > 0 ? this.activateRequestAF(length) : classList.add("hidden"),
    };
    style.height = `${length}px`;
    compareLength[this.lengthDirection]();
  };

  toggleList = () => {
    const { classList } = this.transformer;
    let length = Number(getStyle(this.transformer, "height").replace("px", ""));

    if (!this.originHeight) {
      this.originHeight = length; // set default tranformer length
      classList.remove("hidden");
      length = length % searchFilterInterval;
    }
    this.lengthDirection = length > searchFilterInterval ? "minus" : "plus";
    if (this.lengthDirection === "plus") classList.remove("hidden");
    this.resizeList(length);
  };

  handleSearchFilterClick = () => {
    const filterMenu = this.target.parentNode;
    const menuIcon = selector("i", filterMenu);
    this.view.toggleIcon(menuIcon);
    this.toggleList();
  };

  handleClickEvent = ({ target, target: { tagName } }) => {
    this.handleSearchFilterClick();
    if (tagName === "LI") this.view.changeTargetInnerText(target);
  };

  checkListOpened = ({ target }) => {
    const isListClicked = target.closest(`.${this.transformer.className}`);
    if (!isListClicked && !isHidden(this.transformer))
      this.handleSearchFilterClick();
  };

  activate = () => {
    this.view.addEvent();
  };
}

export default CenterFilterPresenter;
