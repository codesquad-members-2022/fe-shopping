import { POP_UP } from '../../constant/htmlSelector.js';
import HtmlElement from '../../utils/HtmlElement.js';

function RecentSearchList(htmlTag, $parent, props) {
  this.state = { ...props };
  HtmlElement.call(this, htmlTag, $parent);
}

RecentSearchList.prototype = Object.create(HtmlElement.prototype);
RecentSearchList.prototype.constructor = RecentSearchList;

RecentSearchList.prototype.setTemplate = function () {
  console.log(this.state.recentSearchList);
  this.$element.id = 'RecentSearchList';
  const recentSearchList = this.state.recentSearchList;
  this.$element.innerHTML = `
  <div class="${POP_UP.hidden} search__record" id="searchRecord">
<h5>최근 검색어</h5>
<ul id="recentSearchList">
    ${
      recentSearchList.length === 0
        ? `<li>최근검색어가 없습니다.</li>`
        : recentSearchList.map((term) => `<li>${term}</li>`).join('')
    }
  </ul>
<div>
  <button>전체삭제</button>
  <button>최근 검색어 끄기</button>
</div>
</div>`;
};

RecentSearchList.prototype.setState = function (newState) {
  this.state = { ...this.state, ...newState };
  this.setTemplate();
  this.render();
};

export default RecentSearchList;
