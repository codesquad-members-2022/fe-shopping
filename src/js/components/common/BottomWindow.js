import Component from '../../core/Component.js';
import LocalStorageController from '../../localStorageController.js';

class BottomWindow extends Component {

  setup() {
    this.$state = {
      windowList: this.$props.windowList || LocalStorageController.getData('searchHistory') || [],
    };
    if (!this.$props.windowList) LocalStorageController.subscribe('searchHistory', this);
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
                `<div class="search-history-btn-group">
                  <button type="button" class="clear-btn">전체삭제</button>
                  <button type="button" class="toggle-history-btn">최근검색어끄기</button>
                </div>` : ''}
              </div>`;
  }

  setEvent() {
    this.addEvent('click', '.clear-btn', () => {
      LocalStorageController.clearData('searchHistory');
    })

    this.addEvent('focusout', '.bottom-window', () => {
      if (this.$target.classList.contains('open')) LocalStorageController.unsubscribe('searchHistory');
      this.$target.classList.remove('open');
      this.$target.innerHTML = '';
    }, true);
  }


  mounted() {
    this.$target.classList.add('open');
  }
}

export default BottomWindow;
