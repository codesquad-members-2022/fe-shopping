import { CommonView } from "./CommonView";
import { selector } from "../util";

class SearchBoxView extends CommonView {
  constructor(target, transformer) {
    super();
    this.target = target;
    this.transformer = transformer;
    this.relativeList = selector("ul", transformer);
    this.relativeTitle = selector("h3", transformer);
    this.relativeOption = selector("div", transformer);
  }

  changeSearchKeyword = (selectedKeyword) => {
    this.target.value = selectedKeyword;
  };

  changeRelativeListContent = (content) => {
    this.relativeList.innerHTML = content;
  };

  drawRecentListForm = () => {
    this.transformer.classList.remove("hidden");
    this.transformer.append(
      this.relativeTitle,
      this.relativeList,
      this.relativeOption
    );
  };

  drawRelativeListForm = () => {
    if (this.relativeTitle) {
      this.relativeTitle.remove();
      this.relativeOption.remove();
    }
  };

  addEventHandler = () => {
    this.target.addEventListener(
      "focus",
      this.presenter.toggleTransformerHidden
    );
    this.target.addEventListener(
      "blur",
      this.presenter.toggleTransformerHidden
    );
    this.target.addEventListener("keyup", this.presenter.handleKeyupEvent);
    this.transformer.addEventListener(
      "mouseover",
      this.presenter.listMark.showListMark
    );
    this.transformer.addEventListener(
      "mouseout",
      this.presenter.listMark.showListMark
    );
  };
}

export default SearchBoxView;
