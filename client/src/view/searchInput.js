export class SearchInput {
  constructor(data) {
    this.$inputBox = document.querySelector('.search__input-box');
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
        `<li>
          <a href="#">${cur}</a>
          <button type="button" class="delete__btn">삭제</button>
        </li>
        `,
      ''
    );
  }

  templateRecentSearchElement(data) {
    return `
      <p>최근검색어</p>
      <ul class="drop-down__list">
        ${this.templateDropDownItem(data)}
      </ul>
      <div class="input__drop-down--options">
        <button type="button" class="options--clear-keyword">전체삭제</button>
        <button type="button" class="options--off-keyword">최근검색어 끄기</button>
      </div>
      `;
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

    this.$inputDropDown.classList.remove('recent-search');
    this.$inputDropDown.classList.add('auto-complete');
    this.$inputDropDown.classList.add('focus');

    const template = `
      <ul class="drop-down__list">
        ${data.reduce((acc, cur) => acc + `<li><a href="#">${cur}</a></li>`, '')}
      </ul>
      `;

    this.$inputDropDown.innerHTML = template;
  }

  updateRecentSearchList(data) {
    this.$inputDropDown.innerHTML = this.templateRecentSearchElement(data);
  }

  resetRecentSearchList() {
    const $dropDownList = document.querySelector('.drop-down__list');
    $dropDownList.innerHTML = '';

    // 왜 안될까???????
    // this.$dropDownList.innerHTML = '';
  }

  toggleInputFocusClass() {
    this.$inputDropDown.classList.toggle('focus');
  }

  resetInputText() {
    const $input = document.querySelector('.search__input');
    return ($input.value = '');
  }
}
