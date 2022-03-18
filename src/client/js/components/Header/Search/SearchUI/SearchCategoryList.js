import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../oop-utils";

function SearchCategoryList(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchCategoryList, Component);

SearchCategoryList.prototype.setEvent = function () {
  const { searchCategory } = this.$props;
  this.addEvent("click", "li", ({ target }) => {
    searchCategory.setState({ categoryTitle: target.textContent });
  });
};
SearchCategoryList.prototype.template = function () {
  const { categoryData } = this.$props;
  return categoryData.map((data) => `<li>${data}</li>`).join("");
};

export default SearchCategoryList;
