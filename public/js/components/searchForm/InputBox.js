import Component from '../../core/Component.js';
import SearchHistoryStore from '../../store/searchHistoryStore.js';
import { getSuggestions } from '../../api/index.js';
import KeywordList from './KeywordList.js';

class InputBox extends Component {

  keywordList;

  setup() {
    this.$state = {
      value: '',
      searchHistory: SearchHistoryStore.getHistory() || [],
      timer: null,
      isSaveHistoryOn: SearchHistoryStore.isSaveHistoryOn(),
    };
    SearchHistoryStore.subscribe('searchHistory', this);
  }

  template() {
    return `<input type="text" placeholder="찾고 싶은 상품을 검색해보세요!" title="쿠팡 상품 검색" class="input" />
            <button type="submit" class="search-btn">검색하기</button>
            <div class="bottom-ui"></div>`;
  }

  setEvent() {
    this.addEvent('click', '.input', () => {
      if (!this.$state.searchHistory.length) return;
      this.renderKeywordList({
        isSearchHistory: true,
      });
    }, true);

    this.addEvent('blur', '.input', () => {
      this.removeKeywordList();
    }, true);

    this.addEvent('input', '.input', (event) => {
      if (this.timer) clearTimeout(this.timer);
      if (this.$state.value === event.target.value) return;
      this.$state.value = event.target.value;
      this.timer = setTimeout(() => this.timerCallback(event), 500);
    });

    this.addEvent('keydown', '.input-box', (event) => {
      if (event.isComposing) return;
      this.changeFocusedItem(event);
    });
  }

  mounted() {
    this.$target.querySelector('.input').focus();
  }

  renderKeywordList(props) {
    if (this.keywordList) this.keywordList.destroy();
    this.keywordList = new KeywordList(this.$target.querySelector('.bottom-ui'), props);
  }

  removeKeywordList() {
    if (this.keywordList) this.keywordList.destroy();
    const $keywordList = this.$target.querySelector('.bottom-ui');
    $keywordList.classList.remove('open');
  }

  async timerCallback({ target: { value } }) {
    if (!value && !this.$state.searchHistory.length) {
      this.removeKeywordList();
      return;
    }

    if (!value && this.$state.searchHistory.length) {
      this.renderKeywordList({
        isSearchHistory: true,
      });
      return;
    }

    const suggestions = await getSuggestions(`https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${value}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`);
    if (suggestions) {
      this.renderKeywordList({
        isSearchHistory: false,
        suggestions: this.highlight(value, suggestions),
        input: value,
      });
    }
  }

  highlight(value, suggestions) {
    return suggestions.map(suggestion => {
      return {
        item: suggestion.item.replace(value, `<b class="highlight">${value}</b>`),
        link: suggestion.link,
      };
    });
  }

  changeFocusedItem({ key }) {

    if (key !== 'ArrowDown' && key !== 'ArrowUp') return;

    const $focused = this.$target.querySelector('.focus');
    const $input = this.$target.querySelector('.input');
    let $toBeFocused;

    if (key === 'ArrowDown') {
      if ($focused && $focused.nextElementSibling) $toBeFocused = $focused.nextElementSibling;
      else $toBeFocused = this.$target.querySelector('.bottom-ui-list-item');
    }

    if (key === 'ArrowUp' && $focused && $focused.previousElementSibling) $toBeFocused = $focused.previousElementSibling;

    $focused && $focused.classList.remove('focus');
    $toBeFocused && $toBeFocused.classList.add('focus');
    $input.value = $toBeFocused ? $toBeFocused.textContent : this.$state.value || '';
    $input.selectionEnd;
  }
}

export default InputBox;
