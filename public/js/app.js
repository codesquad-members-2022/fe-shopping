import { header } from './template/header.js';
import { carousel } from './template/carousel.js';
import { search } from './template/search.js';

import MainController from './controller/maincontroller.js';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  container.insertAdjacentHTML('afterbegin', header);
  container.insertAdjacentHTML('afterend', carousel);

  const searchForm = document.querySelector('.search-form');
  searchForm.insertAdjacentHTML('beforeend', search);

  const mainController = new MainController();
  mainController.init();
});
