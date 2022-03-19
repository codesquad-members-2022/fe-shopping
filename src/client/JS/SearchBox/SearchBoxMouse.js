import { SearchBox } from "./SearchBox";

class SearchBoxMouse extends SearchBox {
  constructor(target, transformer) {
    super(target, transformer);
  }

  handleListMouseEvent = (target) => {
    const { selectedList } = this.getSelectedInChildren();
    if (selectedList && selectedList !== target)
      selectedList.classList.remove("selected");
    target.classList.toggle("selected");
  };

  handleMouseEvent = ({ target: { tagName }, target }) => {
    if (tagName === "LI") this.handleListMouseEvent(target);
  };

  getMouseEvent = () => {
    this.transformer.addEventListener("mouseover", this.handleMouseEvent);
    this.transformer.addEventListener("mouseout", this.handleMouseEvent);
  };

  init = () => {
    this.getMouseEvent();
  };
}

export { SearchBoxMouse };
