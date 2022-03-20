import { SearchInput } from './searchInput.js';
export class AutoComplete extends SearchInput {
  constructor() {
    super();
  }

  updateAutoComplete() {
    // 데이터는 fetch로 받아올 수 있도록 수정하기
    const data = [
      '아이폰',
      '아이패드',
      '아이폰',
      '아이패드',
      '아이폰',
      '아이패드',
      '아이폰',
      '아이패드',
      '아이폰',
      '아이패드',
    ];

    const listTemplate = `${data.reduce(
      (acc, cur) => acc + `<li><a href="#">${cur}</a></li>`,
      ''
    )}`;

    this.$inputDropDown.classList.replace('recent-search', 'auto-complete');
    this.$inputDropDown.classList.add('focus');

    this.$dropDownList.innerHTML = listTemplate;
  }
}
