import { $ } from '../utility/util.js';
export default class Dropdown {
  btnAddEvent() {
    const $dropdownBtn = $('.search-category-dropdown');

    $dropdownBtn.addEventListener('click', this.changeArrow);
  }

  changeArrow = ({ target }) => {
    const $optionMenu = $('.option-menu');

    if (target.closest('button')) {
      target.classList.toggle('click');
    }

    if (target.classList.value === 'search-category-dropdown') {
      $optionMenu.innerHTML = '';
    } else this.showOptionMenu($optionMenu);
  };

  showOptionMenu($optionMenu) {
    $optionMenu.innerHTML = `
    <ul class = "dropdown-menus">
      <li>전체</li>
      <li>뷰티</li>
      <li>식품</li>
      <li>여성패션</li>
      <li>남성패션</li>
      <li>주방용품</li>
      <li>생활용품</li>
    </ul>
    `;

    const $dropdownMenus = $('.dropdown-menus');
    $dropdownMenus.addEventListener('click', this.changeOption);
  }

  changeOption({ target }) {
    if (!target.closest('li')) return;
    const showText = $('.selected-option');
    showText.innerText = target.textContent;
  }
}
