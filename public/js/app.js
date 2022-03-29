// import { bar } from './template/bar.js';
import { header } from './template/header.js';
import { carousel } from './template/carousel.js';
import { category } from './template/category.js';
import { recentSearch } from './template/search-recent.js';
import { autoSearch } from './template/search-auto.js';

import MainController from './controller/maincontroller.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  container.insertAdjacentHTML('afterbegin', header);
  container.insertAdjacentHTML('afterend', carousel);

  const searchCategory = document.querySelector('.search-category');
  searchCategory.insertAdjacentHTML('beforeend', category);

  const searchForm = document.querySelector('.search-form');
  searchForm.insertAdjacentHTML('beforeend', recentSearch);
  searchForm.insertAdjacentHTML('beforeend', autoSearch);

  const mainController = new MainController();
  mainController.init();
});
