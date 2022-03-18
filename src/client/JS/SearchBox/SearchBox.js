import { selector } from "../util";

class SearchBox {
  constructor(target, transformer) {
    this.target = target;
    this.transformer = transformer;
    this.relativeTitle = selector("h3", transformer);
    this.relativeList = selector("ul", transformer);
    this.relativeOption = selector("div", transformer);
  }

  getSelectedInChildren = () => {
    const childLists = [...this.relativeList.children];
    const selectedListIndex = childLists.findIndex((list) =>
      list.classList.contains("selected")
    );
    const selectedList = childLists[selectedListIndex];
    return { childLists, selectedListIndex, selectedList };
  };
}

export { SearchBox };
