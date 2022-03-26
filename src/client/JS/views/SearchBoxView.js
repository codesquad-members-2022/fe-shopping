import { CommonView } from "./CommonView";

class SearchBoxView extends CommonView {
  constructor(target, transformer) {
    super();
    this.target = target;
    this.transformer = transformer;
  }

  addEventHandler = () => {
    this.target.addEventListener(
      "focus",
      this.presenter.toggleTransformerHidden
    );
    this.target.addEventListener(
      "blur",
      this.presenter.toggleTransformerHidden
    );
    this.transformer.addEventListener(
      "mouseover",
      this.presenter.listMark.handleListMarkEvent
    );
    this.transformer.addEventListener(
      "mouseout",
      this.presenter.listMark.handleListMarkEvent
    );
  };
}

export default SearchBoxView;
