import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../oop-utils";
import { store } from "../../../../core/Store";

function SearchRecent(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchRecent, Component);

SearchRecent.prototype.mount = function () {
  const { searchRecentDisplay } = store.state;
  this.$target.style.display = searchRecentDisplay;
};

SearchRecent.prototype.template = function () {
  return `
    <div class="recent__title">
        <span>최근 검색어</span>
    </div>
    <div class="recent__body">
        <span>코드스쿼드</span>
        <span>아이폰</span>
    </div>
    <div class="recent__footer">
        <span class="recent__deleteBtn">전체삭제</span>
        <span class="recent__offBtn">최근검색어끄기</span>
    </div>
  `;
};

export default SearchRecent;
