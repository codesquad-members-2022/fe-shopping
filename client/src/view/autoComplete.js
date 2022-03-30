import { SearchInput } from './searchInput.js';

export class AutoComplete extends SearchInput {
  constructor() {
    super();
  }

  templateDropDownItem(autoCompleteData) {
    return `
      <li data-value="${autoCompleteData.dataValue}">
        <a href="#">
          <strong>${autoCompleteData.highlight}</strong><span>${autoCompleteData.noneHighlight}</span>
        </a>
      </li>
      `;
  }

  templateDropDownList(autoCompleteData, inputValue) {
    return autoCompleteData.reduce((acc, cur) => {
      const dataValue = cur.value;
      const highlight = inputValue;
      const noneHighlight = dataValue.replace(highlight, '');
      return acc + this.templateDropDownItem({ highlight, noneHighlight, dataValue });
    }, '');
  }

  updateAutoComplete(autoCompleteData, inputValue) {
    this.$dropDownList.innerHTML = this.templateDropDownList(autoCompleteData, inputValue);
  }

  emptyAutoComplete() {
    const emptyTemplate = `<li data-value="null"><span>일치하는 데이터가 없습니다.</span></li>`;
    this.$dropDownList.innerHTML = emptyTemplate;
  }

  setAutoCompleteInputClass() {
    this.$inputDropDown.classList.replace('recent-search', 'auto-complete');
    this.addFocusClass();
  }
}
