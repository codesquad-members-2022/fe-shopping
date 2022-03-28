export class RecentSearch {
  constructor(inputDropDown, dropDownList) {
    this.$inputDropDown = inputDropDown;
    this.$dropDownList = dropDownList;
  }

  templateDropDownItems(recentKeyword) {
    return recentKeyword.reduce(
      (acc, cur) =>
        acc +
        `
        <li data-value="${cur}">
          <a href="#">${cur}</a>
          <button type="button" class="delete__btn">삭제</button>
        </li>
        `,
      ''
    );
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
    if (!this.$inputDropDown.classList.contains('recent-search')) return;
    const recentTitle = this.$inputDropDown.querySelector('p');
    const recentOptionBtns = this.$inputDropDown.querySelector('.input__drop-down--options');

    this.$inputDropDown.removeChild(recentTitle);
    this.$inputDropDown.removeChild(recentOptionBtns);

    this.resetRecentSearchList();
  }

  updateRecentSearchList(recentKeyword) {
    if (this.$inputDropDown.classList.contains('auto-complete')) {
      this.$inputDropDown.classList.replace('auto-complete', 'recent-search');

      const recentElements = this.templateRecentSearchElement();
      this.$inputDropDown.insertAdjacentHTML('afterbegin', recentElements.title);
      this.$inputDropDown.insertAdjacentHTML('beforeend', recentElements.optionBtns);
    }

    this.$dropDownList.innerHTML = this.templateDropDownItems(recentKeyword);
  }

  resetRecentSearchList() {
    this.$dropDownList.innerHTML = '';
  }
}
