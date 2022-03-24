import { selector, removeClass, addClass } from '../../utils/utils.js';
import { autoCompleteStore } from './autoCompleteStore.js';

const DISPLAY_NONE = 'hidden';

const AUTO_COMPLETE_BOX = 'auto-complete';
const AUTO_COMPLETE_LIST = 'auto-complete-list';
const ROTATION_LIST = 'rotation-list';

export class AutoComplete {
  constructor() {
    this.$autoCompleteList = selector(`.${AUTO_COMPLETE_LIST}`);
    this.$autoCompleteBox = selector(`.${AUTO_COMPLETE_BOX}`);
  }

  async renderACKeywords(inputKeyword) {
    const ACKeywords = await autoCompleteStore.requestACKeywords(inputKeyword);

    if (!ACKeywords) return;
    const ACKeywordsHTML = this.getACKeywordsHTML({ ACKeywords, inputKeyword });
    this.$autoCompleteList.innerHTML = ACKeywordsHTML;
  }

  getACKeywordsHTML({ ACKeywords, inputKeyword }) {
    const inputKeywordLength = inputKeyword.length;

    const ACKeywordsHTML = ACKeywords.reduce((result, ACKeyword) => {
      const inputKeywordIndex = ACKeyword.indexOf(inputKeyword);

      if (inputKeywordIndex === -1)
        return (result += `<li class="auto-complete-item"><a class="rotation-keyword" href="./search.html?q=${ACKeyword}">${ACKeyword}</a></li>`);

      const rightWordIndex = inputKeywordLength + inputKeywordIndex;
      const leftWord = ACKeyword.slice(0, inputKeywordIndex);
      const rightWord = ACKeyword.slice(rightWordIndex);
      result += `<li class="auto-complete-item"><a class="rotation-keyword" href="./search.html?q=${ACKeyword}">${leftWord}<strong>${inputKeyword}</strong>${rightWord}</a></li>`;
      return result;
    }, '');

    return ACKeywordsHTML;
  }

  closeAutoComplete() {
    addClass(DISPLAY_NONE, this.$autoCompleteBox);
    removeClass(ROTATION_LIST, this.$autoCompleteList);
  }

  openAutoComplete() {
    removeClass(DISPLAY_NONE, this.$autoCompleteBox);
    addClass(ROTATION_LIST, this.$autoCompleteList);
  }
}
