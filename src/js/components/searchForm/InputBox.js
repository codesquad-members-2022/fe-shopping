import Component from '../../core/Component.js';
import LocalStorageController from '../../localStorageController.js';

class InputBox extends Component {

  setup() {
    this.$state = {
      value: '',
      searchHistory: LocalStorageController.getData('searchHistory') || [],
      autoComplete: [],
    };
    LocalStorageController.subscribe('searchHistory', this);
  }

  template() {
    return `<input type="text" placeholder="찾고 싶은 상품을 검색해보세요!" title="쿠팡 상품 검색" class="input" />
            <button type="submit" class="search-btn">검색하기</button>
            <div class="bottom-window"></div>`;
  }

  setEvent() {
    this.addEvent('focus', '.input', () => {
      if (!this.$state.searchHistory.length) return;
      this.$props.renderBottomWindow('.bottom-window', {
        isTitle: true,
        isBtnGroup: true,
      });
    }, true);

    this.addEvent('blur', '.input', (event) => {
      if (event.relatedTarget) return;
      if (this.$target.querySelector('.bottom-window').classList.contains('open')) LocalStorageController.unsubscribe('searchHistory');
      this.$props.removeBottomWindow('.bottom-window');
    }, true);
  }

}

export default InputBox;
