import { ListMark } from "./ListMark";

class SearchBoxPresenter {
  constructor(view) {
    this.view = view;
    this.target = view.target;
    this.transformer = view.transformer;
    this.listMark = new ListMark(view);
  }

  toggleTransformerHidden = () => {
    this.view.changeOptionHidden(this.transformer, "toggle");
  };
}

export default SearchBoxPresenter;
