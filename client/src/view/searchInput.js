export class SearchInput {
  constructor(data) {
    this.$inputDropDown = document.querySelector('.input__drop-down');
    this.$dropDownList = document.querySelector('.drop-down__list');
    this.renderSearchInput(data);
  }

  renderSearchInput(data) {
    this.$dropDownList.innerHTML = this.templateDropDownItem(data);
  }

  templateDropDownItem(data) {
    return data.reduce(
      (acc, cur) =>
        acc +
        `
        <li>
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

  updateAutoComplete() {
    // 데이터는 fetch로 받아올 수 있도록 수정하기
    const data = [
      '아이폰',
      '아이패드',
      '아이폰',
      '아이패드',
      '아이폰',
      '아이패드',
      '아이폰',
      '아이패드',
      '아이폰',
      '아이패드',
    ];

    this.$inputDropDown.classList.replace('recent-search', 'auto-complete');
    this.$inputDropDown.classList.add('focus');

    this.removeRecentSearchChildNodes();

    const listTemplate = `${data.reduce(
      (acc, cur) => acc + `<li><a href="#">${cur}</a></li>`,
      ''
    )}`;
    this.$dropDownList.innerHTML = listTemplate;
  }

  removeRecentSearchChildNodes() {
    const firstChild = this.$inputDropDown.querySelector('p');
    const lastChild = this.$inputDropDown.querySelector('.input__drop-down--options');

    if (firstChild && lastChild) {
      this.$inputDropDown.removeChild(firstChild);
      this.$inputDropDown.removeChild(lastChild);
    }
  }

  updateRecentSearchList(data) {
    if (this.$inputDropDown.classList.contains('auto-complete')) {
      this.$inputDropDown.classList.replace('auto-complete', 'recent-search');

      const recentElements = this.templateRecentSearchElement();
      this.$inputDropDown.insertAdjacentHTML('afterbegin', recentElements.title);
      this.$inputDropDown.insertAdjacentHTML('beforeend', recentElements.optionBtns);
    }

    this.$dropDownList.innerHTML = this.templateDropDownItem(data);
  }

  resetRecentSearchList() {
    this.$dropDownList.innerHTML = '';
  }

  toggleInputFocusClass() {
    this.$inputDropDown.classList.toggle('focus');
  }

  resetInputText() {
    const $input = document.querySelector('.search__input');
    $input.value = '';
  }
}
