import { SearchInput } from './searchInput.js';

export class AutoComplete extends SearchInput {
  constructor() {
    super();
  }

  templateDropDownItems(data) {
    return `
      <li>
        <a href="#">
          <strong>${data.highlight}</strong><span>${data.noneHighlight}</span>
        </a>
      </li>
      `;
  }

  updateAutoComplete(autoCompleteData, inputValue) {
    this.setAutoCompleteInputClass();

    const listTemplate = autoCompleteData.reduce((acc, cur) => {
      const highlight = inputValue;
      const noneHighlight = cur.value.replace(highlight, '');
      return acc + this.templateDropDownItems({ highlight, noneHighlight });
    }, '');

    this.$dropDownList.innerHTML = listTemplate;
  }

  emptyAutoComplete() {
    this.setAutoCompleteInputClass();

    const emptyTemplate = `<li><span>일치하는 데이터가 없습니다.</span></li>`;
    this.$dropDownList.innerHTML = emptyTemplate;
  }

  setAutoCompleteInputClass() {
    this.$inputDropDown.classList.replace('recent-search', 'auto-complete');
    this.$inputDropDown.classList.add('focus');
  }
}
