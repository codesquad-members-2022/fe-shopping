import Component from "../../../../core/Component";
import { store } from "../../../../Store";
import { createExtendsRelation } from "../../../../oop-utils";

function SearchCategoryList(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchCategoryList, Component);

SearchCategoryList.prototype.setEvent = function () {
  this.addEvent({
    eventType: "click",
    selector: "li",
    callback: ({ target }) => {
      store.setState({ categoryTitle: target.textContent });
    },
  });
};

SearchCategoryList.prototype.template = function () {
  const { searchCategoryDatas } = store.state;
  return searchCategoryDatas.map((data) => `<li>${data}</li>`).join("");
};

export default SearchCategoryList;
