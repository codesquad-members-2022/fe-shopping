import Store from './store.js';
import { categories } from '../../data';

class CategoryStore extends Store {

  #key = 'categories';

  constructor() {
    super();
    this.setState(this.#key, categories);
  }

  getCategories() {
    return this.getState(this.#key);
  }

  changeSelectedCategory(categoryItem) {
    const newCategories = this.getState(this.#key).map(category => {
      if (category.isSelected || category.item === categoryItem) category.isSelected = !category.isSelected;
      return category;
    })
    this.setState(this.#key, newCategories);
  }
}

export default new CategoryStore();
