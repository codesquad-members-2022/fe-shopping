import Component from '../../core/Component.js';

class BottomWindow extends Component {

  template() {
    return `<div class="bottom-window">
              <div class="window-contents">
                ${this.$props.isTitle ? '<h3 class="window-title">최근 검색어</h3>' : ''}
                <ol class="window-list">
                  ${this.$props.windowList
                      .map((item) => `<li class="list-item"><a href="${item.link}">${item.item}</a></li>`)
                      .join('')}
                </ol>
                ${this.$props.isBtnGroup ?
                `<div class="recent-search-btn-group">
                  <button type="button">전체삭제</button>
                  <button type="button">최근검색어끄기</button>
                </div>` : ''}
              </div>
            </div>`;
  }

}

export default BottomWindow;
