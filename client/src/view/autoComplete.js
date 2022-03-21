import { SearchInput } from './searchInput.js';

export class AutoComplete extends SearchInput {
  constructor() {
    super();
  }

  updateAutoComplete(inputValueData) {
    this.$inputDropDown.classList.replace('recent-search', 'auto-complete');
    this.$inputDropDown.classList.add('focus');

    const listTemplate = `${inputValueData.reduce(
      (acc, cur) => acc + `<li><a href="#">${cur.value}</a></li>`,
      ''
    )}`;

    this.$dropDownList.innerHTML = listTemplate;
  }
}
