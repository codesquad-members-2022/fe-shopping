import Component from "../../../../core/Component";
import { createExtendsRelation } from "../../../../oop-utils";
import { store } from "../../../../store";

function SearchRecent(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(SearchRecent, Component);

SearchRecent.prototype.mount = function () {
  const { searchRecentDisplay } = store.state;
  this.$target.style.display = searchRecentDisplay;
};

SearchRecent.prototype.template = function () {
  const { recentDatas, selectedInputIdx } = store.state;
  const isSelectedIdx = (idx) =>
    idx + 1 === selectedInputIdx ? "class='selected'" : "";

  const recents = recentDatas
    ?.map((data, idx) => `<span ${isSelectedIdx(idx)}>${data}</span>`)
    .join("");

  return `
    <div class="recent__title">
        <span>최근 검색어</span>
    </div>
    <div class="recent__body">
        ${recents || `<span>최근 검색어가 없습니다.</span>`}
    </div>
    <div class="recent__footer">
        <span class="recent__deleteBtn">전체삭제</span>
        <span class="recent__offBtn">최근검색어끄기</span>
    </div>
  `;
};

export default SearchRecent;
