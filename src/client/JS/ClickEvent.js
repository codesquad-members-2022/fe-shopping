import { getStyle, isHidden, selector } from "./util";
import { searchFilterInterval } from "./constant";

class ClickEvent {
  constructor(target, transformer, parentName) {
    this.target = target;
    this.transformer = transformer;
    this.parentName = parentName;
    this.originHeight = null;
    this.lengthDirection = null;
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

  toggleIcon = ({ classList }) => {
    classList.toggle("fa-chevron-down");
    classList.toggle("fa-chevron-up");
  };

  handleSearchFilterClick = () => {
    const FilterMenu = this.target.parentNode;
    const menuIcon = selector("i", FilterMenu);
    this.toggleIcon(menuIcon);
    this.toggleList();
  };

  changeTargetInnerText = ({ innerText }) => {
    this.target.children[0].innerText = innerText;
  };

  handleClickEvent = ({ target, target: { tagName } }) => {
    const isTarget = target.closest(this.parentName);
    if (isTarget || !isHidden(this.transformer)) this.handleSearchFilterClick();
    if (tagName === "LI" && isTarget) this.changeTargetInnerText(target);
  };

  init = () => {
    document.addEventListener("click", this.handleClickEvent);
  };
}

export { ClickEvent };
