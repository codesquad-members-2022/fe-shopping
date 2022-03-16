import { bar } from './template/bar.js';
import { header } from './template/header.js';
import { carousel } from './template/carousel.js';
import { category } from './template/category.js';
<<<<<<< HEAD
import { recentSearch } from './template/search-recent.js';
import { autoSearch } from './template/search-auto.js';
=======
>>>>>>> fcce232 (style: 검색창 카테고리 마크업, 스타일링 완료)

document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.querySelector('.wrap');
  wrap.insertAdjacentHTML('afterbegin', bar);

  const container = document.querySelector('.container');
  container.insertAdjacentHTML('afterbegin', header);
  container.insertAdjacentHTML('afterend', carousel);

  const searchCategory = document.querySelector('.search-category');
  searchCategory.insertAdjacentHTML('beforeend', category);
<<<<<<< HEAD
  const searchForm = document.querySelector('.search-form');
  searchForm.insertAdjacentHTML('beforeend', recentSearch);
  searchForm.insertAdjacentHTML('beforeend', autoSearch);
=======
>>>>>>> fcce232 (style: 검색창 카테고리 마크업, 스타일링 완료)
});
