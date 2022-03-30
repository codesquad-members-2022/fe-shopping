import HtmlElement from '../../../../../core/HtmlElement.js';
import { POP_UP, SEARCH_BOX } from '../../../../../constant.js';
import { handleClick } from './eventHandler.js';
import { setInheritance } from '../../../../../utils/manuplateDOM.js';

const {
  HISTORY: { HISTORY_DELETE, HISTORY_ACTIVE, HISTORY_DELETE__ALL },
} = SEARCH_BOX;

export default function HistoryList({ $element }) {
  HtmlElement.call(this, { $element });
}

setInheritance({ parent: HtmlElement, child: HistoryList });

HistoryList.prototype.setTemplate = function () {
  const { histroyList, activeHistory, showHistroy } =
    this.interface.getStatefromStore({
      histroyList: null,
      activeHistory: null,
      showHistroy: null,
    });
  const isActive = (idx) => (idx === activeHistory ? 'active__term' : '');
  showHistroy
    ? this.$element.classList.add(POP_UP.show)
    : this.$element.classList.add(POP_UP.hidden);
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
  this.$element.addEventListener('click', handleClick.bind(this));
};
