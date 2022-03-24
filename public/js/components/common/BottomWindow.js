import Component from '../../core/Component.js';
import SearchHistoryStore from '../../store/searchHistoryStore.js'

class BottomWindow extends Component {

  setup() {
    this.$state = {
      isSaveHistoryOn: SearchHistoryStore.isSaveHistoryOn(),
      windowList: this.$props.windowList || [],
      searchHistory: SearchHistoryStore.getHistory('searchHistory') || [],
    };
  }

  template() {
    if (this.$props.isSearchHistory) {
      return `<div class="window-contents">
                ${!this.$state.isSaveHistoryOn ? 
                  '<strong>최근 검색어 저장 기능이 꺼져 있습니다.</strong>' : 
                  `<h3 class="window-title">최근 검색어</h3>
                    <ol class="window-list">
                      ${this.$state.searchHistory
                          .map((item) => `<li class="list-item"><a href="${item.link}">${item.item}</a></li>`)
                          .join('')}
                    </ol>`}
                <div class="search-history-btn-group">
                  <button type="button" class="clear-btn">전체삭제</button>
                  <button type="button" class="toggle-history-btn">${this.$state.isSaveHistoryOn ? '최근검색어끄기' : '최근검색어켜기'}</button>
                </div>
              </div>`;
    }

    else {
      return `<div class="window-contents">
                <ol class="window-list">
                  ${this.$state.windowList
                      .map((item) => `<li class="list-item"><a href="${item.link}">${item.item}</a></li>`)
                      .join('')}
                </ol>
              </div>`;
    }
  }

  setEvent() {
    this.addEvent('click', '.clear-btn', () => {
      if (!this.$state.isSaveHistoryOn) return;
      SearchHistoryStore.clearHistory();
    })

    this.addEvent('click', '.toggle-history-btn', () => {
      SearchHistoryStore.subscribe('isSaveHistoryOn', this);
      SearchHistoryStore.toggleSaveHistory();
    })

    this.addEvent('focusout', '.bottom-window', () => {
      if (this.$target.classList.contains('open')) SearchHistoryStore.unsubscribe('searchHistory');
      this.$target.classList.remove('open');
      this.$target.innerHTML = '';
    }, true);

    this.addEvent('mousedown', '.bottom-window', (e) => {
      e.preventDefault();
    }, true);
  }

  mounted() {
    this.$target.classList.add('open');
    if (this.$state.searchHistory.length && !this.$state.windowList.length) this.$target.querySelector('.list-item').classList.add('focus');
  }
}

export default BottomWindow;
