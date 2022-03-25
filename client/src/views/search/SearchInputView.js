import { $ } from '../../utils/util.js';

export class SearchInputView {
  constructor() {
    this.searchInputElement = $('.main-header__input');
  }

  #handleInputEventListener() {
    this.searchInputElement.addEventListener('input', this.keywordDataHandler());
  }

  #handleKeyupEventListener() {
    this.searchInputElement.addEventListener('keyup', this.keyUpDataHandler);
  }

  #handleKeyPressEventListener() {
    this.searchInputElement.addEventListener('keypress', this.keyPressDataHandler);
  }

  run() {
    this.#handleInputEventListener();
    this.#handleKeyupEventListener();
    this.#handleKeyPressEventListener();
  }
}
