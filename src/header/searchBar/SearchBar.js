import { SearchBarCategory } from './Category.js';
import { SearchBarForm } from './Form.js';
import { hasAscendant } from '../../utils/utils.js';

export class SearchBar {
  constructor() {
    this.searchBarCategory = new SearchBarCategory();
    this.searchBarForm = new SearchBarForm();
  }

  init() {
    this.searchBarCategory.init();
    this.searchBarForm.init();

    document.body.addEventListener('mousedown', (e) => {
      if (!hasAscendant(this.searchBarCategory.$category, e.target))
        this.searchBarCategory.closeLayer();

      if (!hasAscendant(this.searchBarForm.$form, e.target)) {
        this.searchBarForm.closePopupbox();
      }
    });
  }
}
