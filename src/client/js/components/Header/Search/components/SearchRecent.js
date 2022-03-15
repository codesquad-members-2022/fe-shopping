import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../core/oop-utils";

function SearchRecent(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchRecent, Component);

SearchRecent.prototype.setup = function () {
  this.state = {
    display: "none",
  };
};

SearchRecent.prototype.mount = function () {
  const { display } = this.state;
  this.$target.style.display = display;
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
