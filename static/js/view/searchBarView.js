export class SearchBarView {
  constructor(searchBarController) {
    this.controller = searchBarController;
    this.$input = document.querySelector('.search-bar-input');
    this.$popupKeywords = document.querySelector('.popup-keywords');
    this.handleInputFocusEvent;
    this.handleInputKeyDownEvent;
    this.handlePopupKeywordsClickEvent;
  }

  addInputEvent() {
    this.$input.addEventListener('focus', this.handleInputFocusEvent);
    this.$input.addEventListener('keydown', this.handleInputKeyDownEvent);
    this.$input.addEventListener('keyup', this.handleInputKeyUpEvent);
  }

  addPopupKeywordsEvent() {
    this.$popupKeywords.addEventListener('click', this.handlePopupKeywordsClickEvent);
  }

  hidePopupKeywords() {
    this.$popupKeywords.classList.remove('hidden');
  }

  emptyPopupKeywords() {
    this.$popupKeywords.innerHTML = '';
  }
}
