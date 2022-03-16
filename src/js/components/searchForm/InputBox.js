import Component from '../../core/Component.js';
import BottomWindow from '../common/BottomWindow.js';

class InputBox extends Component {

  setup() {
    this.$state = {
      value: '',
      recentSearch: [{ item: '아이폰', link: '#' }, { item: '갤럭시', link: '#' }],
      autoComplete: [],
    };
  }

  template() {
    return `<div class="input-box">
              <input type="text" placeholder="찾고 싶은 상품을 검색해보세요!" title="쿠팡 상품 검색" class="input" />
              <button type="submit" class="search-btn">검색하기</button>
            </div>`;
  }

  setEvent() {
    this.addEvent('focus', '.input-box', () => {
      if (!this.$state.recentSearch.length) return;
      const $inputBox = this.$target.querySelector('.input-box');
      new BottomWindow($inputBox, {
        isTitle: true,
        isBtnGroup: true,
        windowList: this.$state.recentSearch,
      });
    }, true);

    this.addEvent('blur', '.input-box', () => {
      const $inputBox = this.$target.querySelector('.input-box');
      const $bottomWindow = $inputBox.querySelector('.bottom-window');
      if ($bottomWindow) $inputBox.removeChild($bottomWindow);
    }, true);
  }

}

export default InputBox;
