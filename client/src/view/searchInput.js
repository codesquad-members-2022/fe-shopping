export class SearchInput {
  constructor() {
    this.$input = document.querySelector('.search__input');
    this.$form = document.querySelector('.search__form');
    this.$inputDropDown = document.querySelector('.input__drop-down');
    this.$dropDownList = document.querySelector('.drop-down__list');
  }

  setEvents() {
    this.$input.addEventListener('focus', this.focusInputHandle);
    this.$input.addEventListener('input', this.typingInputHandle);
    this.$form.addEventListener('submit', this.submitFormHandle);
    this.$inputDropDown.addEventListener('mouseleave', this.mouseleaveListHandle);
    this.$inputDropDown.addEventListener('click', this.clickDropDownBtnHandle);
  }

  resetInputText() {
    this.$input.value = '';
  }

  toggleFocusClass() {
    this.$inputDropDown.classList.toggle('focus');
  }

  removeFocusClass() {
    this.$inputDropDown.classList.remove('focus');
  }

  addFocusClass() {
    this.$inputDropDown.classList.add('focus');
  }
}
