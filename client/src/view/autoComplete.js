import { SearchInput } from './searchInput.js';

export class AutoComplete extends SearchInput {
  constructor() {
    super();
  }

  templateDropDownItems(data) {
    return `
      <li data-value="${data.dataValue}">
        <a href="#">
          <strong>${data.highlight}</strong><span>${data.noneHighlight}</span>
        </a>
      </li>
      `;
  }

  templateDropDownList(data, inputValue) {
    return data.reduce((acc, cur) => {
      const dataValue = cur.value;
      const highlight = inputValue;
      const noneHighlight = dataValue.replace(highlight, '');
      return acc + this.templateDropDownItems({ highlight, noneHighlight, dataValue });
    }, '');
  }

  updateAutoComplete(autoCompleteData, inputValue) {
    this.setAutoCompleteInputClass();
    this.$dropDownList.innerHTML = this.templateDropDownList(autoCompleteData, inputValue);
  }

  emptyAutoComplete() {
    this.setAutoCompleteInputClass();

    const emptyTemplate = `<li data-value="null"><span>일치하는 데이터가 없습니다.</span></li>`;
    this.$dropDownList.innerHTML = emptyTemplate;
  }

  setAutoCompleteInputClass() {
    this.$inputDropDown.classList.replace('recent-search', 'auto-complete');
    this.$inputDropDown.classList.add('focus');
  }
}
