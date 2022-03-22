import Element from "./Element.js";
import { targetQuerySelector } from "../util/util.js";

class SearchCategory extends Element {
  constructor() {
    super();
    this.$selected__category = targetQuerySelector({
      className: "selected__category",
    });
  }

  onClickSearchCategory({ handleClickSearchCatgory }) {
    handleClickSearchCatgory();
  }

  render() {
    this.$selected__category.innerText = this.state;
  }
}

export default SearchCategory;
