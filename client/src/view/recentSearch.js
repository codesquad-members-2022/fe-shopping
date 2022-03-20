import { SearchInput } from './searchInput.js';
export class RecentSearch extends SearchInput {
  constructor(data) {
    super();
    super.renderSearchInput(data);
  }

  templateRecentSearchElement() {
    const recentElements = {
      title: `<p>최근검색어</p>`,
      optionBtns: `
      <div class="input__drop-down--options">
        <button type="button" class="options--clear-keyword">전체삭제</button>
        <button type="button" class="options--off-keyword">최근검색어 끄기</button>
      </div>`,
    };

    return recentElements;
  }

  removeRecentSearchChildNodes() {
    const recentTitle = this.$inputDropDown.querySelector('p');
    const recentOptionBtns = this.$inputDropDown.querySelector('.input__drop-down--options');

    if (recentTitle && recentOptionBtns) {
      this.$inputDropDown.removeChild(recentTitle);
      this.$inputDropDown.removeChild(recentOptionBtns);
    }
  }

  updateRecentSearchList(data) {
    if (this.$inputDropDown.classList.contains('auto-complete')) {
      this.$inputDropDown.classList.replace('auto-complete', 'recent-search');

      const recentElements = this.templateRecentSearchElement();
      this.$inputDropDown.insertAdjacentHTML('afterbegin', recentElements.title);
      this.$inputDropDown.insertAdjacentHTML('beforeend', recentElements.optionBtns);
    }

    this.$dropDownList.innerHTML = super.templateDropDownItem(data);
  }

  resetRecentSearchList() {
    this.$dropDownList.innerHTML = '';
  }
}
