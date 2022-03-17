import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../core/oop-utils";

function SearchCategoryList(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchCategoryList, Component);

SearchCategoryList.prototype.template = function () {
  const { categoryData } = this.$props;
  return categoryData.map((data) => `<li>${data}</li>`).join("");
};

export default SearchCategoryList;
