import Component from '../../core/Component.js';

class InputBox extends Component {

  setup() {
    this.$state = {
      value: '',
      recentSearch: [{ item: '아이폰', link: '#' }, { item: '갤럭시', link: '#' }],
      autoComplete: [],
    };
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
        windowList: this.$state.recentSearch,
      });
    }, true);

    this.addEvent('blur', '.input-box', () => {
      this.$props.removeBottomWindow('.bottom-window');
    }, true);
  }

}

export default InputBox;
