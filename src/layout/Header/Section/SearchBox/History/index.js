import HtmlElement from '../../../../../utils/HtmlElement.js';
import { SEARCH_BOX } from '../../../../../constant.js';
import eventHandler from './eventHandler.js';

const {
  HISTORY: { HISTORY_DELETE, HISTORY_ACTIVE, HISTORY_DELETE__ALL },
} = SEARCH_BOX;

export default function HistoryList($element, args) {
  HtmlElement.call(this, $element, args);
}

HistoryList.prototype = Object.create(HtmlElement.prototype);
HistoryList.prototype.constructor = HistoryList;

HistoryList.prototype.init = function () {
  this.state = {
    ...this.args,
  };
  this.eventHandler = eventHandler;
};

HistoryList.prototype.setTemplate = function () {
  const { histroyList, activeHistory } = this.state;
  const isActive = (idx) => (idx === activeHistory ? 'active__term' : '');
  return `
<h5>최근 검색어</h5>
<ul id="histroyList">
    ${
      histroyList.length === 0
        ? `<span>최근검색어가 없습니다.</span>`
        : histroyList
            .map(
              (term, idx) =>
                `<li class="${isActive(idx)}"
                  data-click-type=${HISTORY_ACTIVE} data-term-id=${idx}>${term}
                  <span data-click-type=${HISTORY_DELETE}>X</span>
                 </li>`
            )
            .join('')
    }
  </ul>
<div>
  <button data-click-type=${HISTORY_DELETE__ALL}>전체삭제</button>
  <button >최근 검색어 끄기</button>
</div>`;
};

HistoryList.prototype.setEvent = function () {
  const {
    coreHandler: { handleClick },
  } = this.eventHandler;
  this.$element.addEventListener('click', handleClick.bind(this));
};
