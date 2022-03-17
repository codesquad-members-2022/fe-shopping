import Component from '../../core/Component.js';
import LocalStorageController from '../../localStorageController.js';

class InputBox extends Component {

  setup() {
    this.$state = {
      value: '',
      recentSearch: LocalStorageController.getData('recentSearch') || [],
      autoComplete: [],
    };
    LocalStorageController.subscribe('recentSearch', this);
  }

  template() {
    return `<input type="text" placeholder="찾고 싶은 상품을 검색해보세요!" title="쿠팡 상품 검색" class="input" />
            <button type="submit" class="search-btn">검색하기</button>
            <div class="bottom-window"></div>`;
  }

  setEvent() {
    this.addEvent('focus', '.input-box', () => {
      if (!this.$state.recentSearch.length) return;
      this.$props.renderBottomWindow('.bottom-window', {
        isTitle: true,
        isBtnGroup: true,
      });
    }, true);

    this.addEvent('blur', '.input-box', () => {
      if (this.$target.querySelector('.bottom-window').classList.contains('open')) LocalStorageController.unsubscribe('recentSearch');
      this.$props.removeBottomWindow('.bottom-window');
    }, true);
  }

}

export default InputBox;
