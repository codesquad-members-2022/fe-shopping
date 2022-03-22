export class SearchInput {
  constructor() {
    this.$inputDropDown = document.querySelector('.input__drop-down');
    this.$dropDownList = document.querySelector('.drop-down__list');
  }

  renderSearchInput(data) {
    this.$dropDownList.innerHTML = this.templateDropDownItem(data);
  }

  templateDropDownItem(data) {
    return data.reduce(
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

  static toggleClassName(selector, className) {
    selector.classList.toggle(className);
  }

  static resetInputText() {
    const $input = document.querySelector('.search__input');
    $input.value = '';
  }
}
