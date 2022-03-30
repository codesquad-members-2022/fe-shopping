export class SearchInput {
  constructor() {
    this.$input = document.querySelector('.search__input');
    this.$form = document.querySelector('.search__form');
    this.$inputDropDown = document.querySelector('.input__drop-down');
    this.$dropDownList = document.querySelector('.drop-down__list');

    this.focusKeybordItem;
  }

  setEvents() {
    this.$input.addEventListener('focus', this.focusInputHandle);
    this.$input.addEventListener('keydown', this.typingInputHandle);
    this.$input.addEventListener('keyup', this.arrowKeyupHandle);
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

  navigateList(direction) {
    const focusClassName = 'item--focus';

    if (direction === 'ArrowDown') {
      this.moveDownDropDownItem(focusClassName);
    }
    if (direction === 'ArrowUp') {
      this.moveUpDropDownItem(focusClassName);
    }
  }

  moveDownDropDownItem(className) {
    const firstItem = this.$dropDownList.firstElementChild;
    const lastItem = this.$dropDownList.lastElementChild;

    if (firstItem.dataset.value === 'null') return;

    if (!document.querySelector(`.${className}`)) {
      this.focusKeybordItem = firstItem;
    } else {
      this.focusKeybordItem.classList.remove(className);
      this.focusKeybordItem === lastItem
        ? (this.focusKeybordItem = firstItem)
        : (this.focusKeybordItem = this.focusKeybordItem.nextElementSibling);
    }

    this.changeInputValueToDataset(className);
  }

  moveUpDropDownItem(className) {
    this.focusKeybordItem.classList.remove(className);
    if (!this.focusKeybordItem.previousElementSibling) return;

    this.focusKeybordItem = this.focusKeybordItem.previousElementSibling;
    this.changeInputValueToDataset(className);
  }

  changeInputValueToDataset(className) {
    this.$input.value = this.focusKeybordItem.dataset.value;
    this.focusKeybordItem.classList.add(className);
  }
}
