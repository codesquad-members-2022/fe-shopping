import { selector, drawListFromData, intervalDelay } from "./util";
import { showDelayTime } from "./constant";

const showListDelay = new intervalDelay(showDelayTime);

class MouseEvent {
  constructor(target, transformer, data) {
    this.target = target;
    this.transformer = transformer;
    this.data = data;
    this.categoryFirst = null;
    this.categorySecond = null;
    this.relativeList = selector("ul", transformer);
  }

  findSelectedInChildren = () => {
    const childLists = [...this.relativeList.children];
    const selectedListIndex = childLists.findIndex((list) =>
      list.classList.contains("selected")
    );
    const selectedList = childLists[selectedListIndex];
    return { childLists, selectedListIndex, selectedList };
  };

  assignCategory = ({ innerText, parentNode: { classList } }) => {
    [...classList].forEach((list) => {
      if (list.includes("first")) {
        this.categoryFirst = this.data.find(
          ({ keyword }) => keyword === innerText
        );
        this.categorySecond = null;
      }
      if (list.includes("second")) {
        this.categorySecond = this.categoryFirst["child"].find(
          ({ keyword }) => keyword === innerText
        );
      }
    });
  };

  showChildList = () => {
    const { child } = !this.categorySecond
      ? this.categoryFirst
      : this.categorySecond;
    if (!child) return;

    const innerData = child.map(({ keyword }) => keyword);
    const innerList = drawListFromData(innerData);
    const listChildren = [...this.transformer.children];
    listChildren.forEach(({ classList }) => classList.remove("none"));
    listChildren[!this.categorySecond ? 1 : 2].innerHTML = innerList;
    this.transformer.style.width = "288%";
  };

  hideChildList = () => {
    [...this.transformer.children].forEach((child, index) => {
      if (index) {
        child.classList.add("none");
        child.innerText = "";
      }
    });

    this.transformer.style.width = "93%";
  };

  handleListMarkEvent = ({ target: { tagName }, target }) => {
    const { selectedList } = this.findSelectedInChildren();
    if (tagName !== "LI") return;
    if (selectedList && selectedList !== target)
      selectedList.classList.remove("selected");
    target.classList.toggle("selected");
  };

  handleShowListEvent = async (target) => {
    await showListDelay.waitDelay();
    this.assignCategory(target);
    this.showChildList(target);
  };

  handleShowEvent = ({ target: { tagName }, target }) => {
    if (tagName === "LI") return this.handleShowListEvent(target);
    this.transformer.classList.remove("hidden");
  };

  handleHideEvent = () => {
    this.hideChildList();
    this.transformer.classList.add("hidden");
  };

  getListMarkEvent = () => {
    this.transformer.addEventListener("mouseover", this.handleListMarkEvent);
    this.transformer.addEventListener("mouseout", this.handleListMarkEvent);
  };

  getShowEvent = () => {
    this.target.addEventListener("mouseenter", this.handleShowEvent);
    this.target.addEventListener("mouseleave", this.handleHideEvent);
    this.transformer.addEventListener("mouseover", this.handleShowEvent);
    this.transformer.addEventListener("mouseleave", this.handleHideEvent);
  };
}

export { MouseEvent };
