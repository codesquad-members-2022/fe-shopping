import Component from "../../../../core/Component";
import { store } from "../../../../store";
import { createExtendsRelation } from "../../../../oop-utils";

function SearchCategoryList(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchCategoryList, Component);

SearchCategoryList.prototype.setEvent = function () {
  this.addEvent("click", "li", ({ target }) => {
    store.setState({ categoryTitle: target.textContent });
  });
};

SearchCategoryList.prototype.template = function () {
  const { categoryDatas } = store.state;
  return categoryDatas.map((data) => `<li>${data}</li>`).join("");
};

export default SearchCategoryList;
