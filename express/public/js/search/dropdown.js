import { $ } from '../utility/util.js';
import { addEvent } from '../utility/util.js';
import { categoryData } from '../../data/search-category/category.js';
export default class Dropdown {
  addBtnEvent() {
    const $dropdownBtn = $('.search-category-dropdown');
    addEvent($dropdownBtn, 'click', this.changeArrowKey);
  }

  changeArrowKey = ({ target }) => {
    const $optionMenu = $('.option-menu');

    if (target.closest('button')) {
      target.classList.toggle('opened-option-menu');
    }

    if (target.classList.value === 'search-category-dropdown') {
      $optionMenu.innerHTML = '';
    } else this.showOptionMenu($optionMenu);
  };

  showOptionMenu($optionMenu) {
    $optionMenu.innerHTML = `
    <ul class="dropdown-menus">
      ${categoryData.reduce(
        (pre, curData) =>
          pre +
          `
      <li>
        <a href="#">${curData}</a>
      </li>`,
        ''
      )}
      </ul>
    `;
    this.addClickEvent();
  }

  addClickEvent() {
    const $dropdownMenus = $('.dropdown-menus');
    addEvent($dropdownMenus, 'click', this.changeOption);
  }

  changeOption({ target }) {
    if (!target.closest('li')) return;
    const showText = $('.selected-option');
    showText.innerText = target.textContent;
  }
}
