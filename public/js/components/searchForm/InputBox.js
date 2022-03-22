import Component from '../../core/Component.js';
import SearchHistoryStore from '../../store/searchHistoryStore.js';
import { getAutocompleteData } from '../api/index.js';

class InputBox extends Component {

  setup() {
    this.$state = {
      searchHistory: SearchHistoryStore.getHistory() || [],
      timer: null,
    };
    SearchHistoryStore.subscribe('searchHistory', this);
  }

  template() {
    return `<input type="text" placeholder="찾고 싶은 상품을 검색해보세요!" title="쿠팡 상품 검색" class="input" />
            <button type="submit" class="search-btn">검색하기</button>
            <div class="bottom-window"></div>`;
  }

  setEvent() {
    this.addEvent('click', '.input', () => {
      if (!this.$state.searchHistory.length) return;
      this.$props.renderBottomWindow('.bottom-window', {
        isSearchHistory: true,
      });
    }, true);

    this.addEvent('blur', '.input', (event) => {
      if (event.relatedTarget) return;
      this.$props.removeBottomWindow('.bottom-window');
    }, true);

    this.addEvent('input', '.input', (event) => {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(async () => {
        if (!event.target.value && !this.$state.searchHistory.length) {
          this.$props.removeBottomWindow('.bottom-window');
          return;
        }

        if (!event.target.value && this.$state.searchHistory.length) {
          this.$props.renderBottomWindow('.bottom-window', {
            isSearchHistory: true,
          });
          return;
        }

        const autocompleteList = await getAutocompleteData(`https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${event.target.value}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`);
        if (autocompleteList) {
          this.$props.renderBottomWindow('.bottom-window', {
            isSearchHistory: false,
            windowList: autocompleteList,
            input: event.target.value,
          });
        }

      }, 500);
    });
  }

  mounted() {
    this.$target.querySelector('.input').focus();
  }

}

export default InputBox;
