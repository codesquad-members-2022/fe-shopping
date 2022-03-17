import { selector } from '../../utils/utils.js';

const dev = true;
const apiURL = dev ? 'http://localhost:3000/api/autoComplete' : '';

export class AutoComplete {
  constructor({ AUTO_COMPLETE_LIST }) {
    this.AUTO_COMPLETE_LIST = AUTO_COMPLETE_LIST;
  }

  async requestACKeyword(inputKeyword) {
    try {
      const response = await fetch(`${apiURL}?q=${inputKeyword}`);
      const data = await response.json();
      const ACKeywords = Object.values(data).map(({ keyword }) => keyword);
      return ACKeywords;
    } catch {
      return false;
    }
  }

  async renderACKeywords(inputKeyword) {
    const ACKeywords = await this.requestACKeyword(inputKeyword);
    if (!ACKeywords) return;

    const ACKeywordsHTML = this.getACKeywordsHTML({ ACKeywords, inputKeyword });
    const $autoCompleteList = selector(`.${this.AUTO_COMPLETE_LIST}`);
    $autoCompleteList.innerHTML = ACKeywordsHTML;
  }

  getACKeywordsHTML({ ACKeywords, inputKeyword }) {
    const inputKeywordLength = inputKeyword.length;

    return ACKeywords.reduce((result, ACKeyword) => {
      const inputKeywordIndex = ACKeyword.indexOf(inputKeyword);

      if (inputKeywordIndex === -1)
        return (result += `<li class="auto-complete-item">${ACKeyword}</li>`);

      const rightWordIndex = inputKeywordLength + inputKeywordIndex;
      const leftWord = ACKeyword.slice(0, inputKeywordIndex);
      const rightWord = ACKeyword.slice(rightWordIndex);
      result += `<li class="auto-complete-item">${leftWord}<strong>${inputKeyword}</strong>${rightWord}</li>`;
      return result;
    }, '');
  }
}
