import { selector } from "./util";

class MouseEvent {
  constructor(target, transformer) {
    this.target = target;
    this.transformer = transformer;
    this.relativeList = selector("ul", transformer);
  }

  getSelectedInChildren = () => {
    const childLists = [...this.relativeList.children];
    const selectedListIndex = childLists.findIndex((list) =>
      list.classList.contains("selected")
    );
    const selectedList = childLists[selectedListIndex];
    return { childLists, selectedListIndex, selectedList };
  };

  handleListMouseEvent = (target) => {
    const { selectedList } = this.getSelectedInChildren();
    if (selectedList && selectedList !== target)
      selectedList.classList.remove("selected");
    target.classList.toggle("selected");
  };

  handleMouseEvent = ({ target: { tagName }, target }) => {
    if (tagName === "LI") this.handleListMouseEvent(target);
  };

  init = () => {
    this.transformer.addEventListener("mouseover", this.handleMouseEvent);
    this.transformer.addEventListener("mouseout", this.handleMouseEvent);
  };
}

export { MouseEvent };
