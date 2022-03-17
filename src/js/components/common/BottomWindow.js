import Component from '../../core/Component.js';
import LocalStorageController from '../../localStorageController.js';

class BottomWindow extends Component {

  setup() {
    this.$state = {
      windowList: this.$props.windowList || LocalStorageController.getData('recentSearch') || [],
    };
    if (!this.$props.windowList) LocalStorageController.subscribe('recentSearch', this);
  }

  template() {
    return `<div class="window-contents">
                ${this.$props.isTitle ? '<h3 class="window-title">최근 검색어</h3>' : ''}
                <ol class="window-list">
                  ${this.$state.windowList
                      .map((item) => `<li class="list-item"><a href="${item.link}">${item.item}</a></li>`)
                      .join('')}
                </ol>
                ${this.$props.isBtnGroup ?
                `<div class="recent-search-btn-group">
                  <button type="button">전체삭제</button>
                  <button type="button">최근검색어끄기</button>
                </div>` : ''}
              </div>`;
  }

  mounted() {
    this.$target.classList.add('open');
  }
}

export default BottomWindow;
