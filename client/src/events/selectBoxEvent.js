import { $ } from '../utils/util.js';
import { SelectListBox } from '../components/search/SelectListBox.js';

export const selectBoxEvent = () => {
  const selectBox = $('.main-header__bottom-search-selectBox');

  selectBox.addEventListener('click', () => {
    // Event
    const selectListBox = $('.main-header__bottom-search-list');

    if (selectListBox === null) {
      selectBox.insertAdjacentHTML('beforeend', SelectListBox());
      selectBox.classList.remove('main-header__bottom-search--off');
      selectBox.classList.add('main-header__bottom-search--on');
    } else {
      selectBox.removeChild(selectListBox);
      selectBox.classList.remove('main-header__bottom-search--on');
      selectBox.classList.add('main-header__bottom-search--off');
    }
  });
};
