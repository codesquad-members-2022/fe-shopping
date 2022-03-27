import { selector, isHidden } from "../util";
import { ListMark } from "./ListMark";

class CenterFilterPresenter {
  constructor(view) {
    const { target, transformer, parentNode } = view;
    this.view = view;
    this.target = target;
    this.transformer = transformer;
    this.parentNode = parentNode;
    this.listMark = new ListMark(view);
  }

  handleSearchFilterClick = () => {
    this.view.toggleIcon();
    this.view.toggleList();
  };

  handleClickEvent = ({ target }) => {
    const { tagName } = target;
    this.handleSearchFilterClick();
    if (tagName === "LI") this.view.changeTargetInnerText(target);
  };

  checkListOpened = ({ target }) => {
    const isListClicked = target.closest(`.${this.parentNode.className}`);
    if (!isListClicked && !isHidden(this.transformer)) {
      this.handleSearchFilterClick();
    }
  };
}

export default CenterFilterPresenter;
