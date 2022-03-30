import { $ } from '../../utility/util.js';
import { makeBasicColorWord, makeBlueColorWord } from '../../utility/template.js';

export default class View {
  constructor() {
    this.$searchHistory = $('#recent-words-menu');
    this.$autocompleteMenu = $('#autocomplete-menu');
    this.$popupMenuList = $('#input-popup-menu-list');
  }

  addInputEvent(controllerThis) {
    const $searchInput = $('.search-input');
    const $enterInput = $('.search-enter-btn');
    $searchInput.addEventListener('focus', controllerThis.drawInputMenu);
    $searchInput.addEventListener('blur', ({ relatedTarget }) => {
      controllerThis.noShowRecentSearches(relatedTarget);
      this.hideAutocomplete();
    });
    $searchInput.addEventListener('keyup', controllerThis.drawAutocomplete);
    $enterInput.addEventListener('click', controllerThis.addRecentData);
  }

  addDeleteEventHistoryBtn(controllerThis) {
    $('.history-delete-btn').addEventListener('click', controllerThis.deleteHistoryList());
  }

  renderRecentWord(wordData) {
    if (!wordData.length) return;
    const inputMenu = $('.input-popup-menu-list');

    const recentWordTemplate = wordData.reduce(
      (pre, curData) => (pre += `<li class="input-popup-menu-item">${curData}</li>`),
      ''
    );

    inputMenu.innerHTML = recentWordTemplate;
  }

  addOfOffEventHistoryBtn() {
    $('.history-off-btn').addEventListener('click', this.listOnOff);
  }

  listOnOff = ({ target }) => {
    const targetUl = target.parentElement.previousElementSibling;
    targetUl.classList.toggle('hidden');
  };

  showRecentSearches() {
    this.$searchHistory.classList.remove('hidden');
  }

  hideRecentSearches() {
    this.$searchHistory.classList.add('hidden');
  }

  showAutocomplete() {
    this.$autocompleteMenu.classList.remove('hidden');
  }

  hideAutocomplete() {
    this.$autocompleteMenu.classList.add('hidden');
  }

  showCompleteWord(completeData, inputValue) {
    const dataTemplate = completeData.reduce(
      (pre, curList) => (pre += `${this.colorWord(inputValue, curList)}`),
      ''
    );

    this.$popupMenuList.innerHTML = dataTemplate;
  }

  colorWord(inputValue, curList) {
    const length = inputValue.length;
    const compareWord = curList.keyword.substring(0, length);
    const remainWord = curList.keyword.substring(length);

    if (inputValue !== compareWord) {
      return makeBasicColorWord(curList);
    }

    return makeBlueColorWord(compareWord, remainWord);
  }

  changeInputValue(searchListNum) {
    this.$searchInput = $('.search-input');
    const selectedList = $(`#input-popup-menu-list > li:nth-child(${searchListNum}`);
    this.$searchInput.value = selectedList.textContent;
  }
}
