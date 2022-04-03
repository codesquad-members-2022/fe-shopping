import { selector } from "../util";

class ListMark {
  constructor(view) {
    this.view = view;
    this.target = view.target;
    this.transformer = view.transformer;
    this.relativeList = selector("ul", view.transformer);
  }

  getSelectedInChildren = () => {
    const childLists = [...this.relativeList.children];
    const selectedListIndex = childLists.findIndex((list) =>
      list.classList.contains("selected")
    );
    const selectedList = childLists[selectedListIndex];
    return selectedList;
  };

  showListMark = ({ target }) => {
    const { tagName } = target;
    if (tagName !== "LI") return;
    this.view.changeOptionSelected(target, "toggle");

    const selectedList = this.getSelectedInChildren();
    if (selectedList && selectedList !== target) {
      this.view.changeOptionSelected(selectedList, "remove");
    }
  };

  hideListMark = ({ target }) => {
    const selectedList = this.getSelectedInChildren();
    if (selectedList && selectedList !== target) {
      this.view.changeOptionSelected(selectedList, "remove");
    }
  };
}

export { ListMark };
