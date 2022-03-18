import { carouselData } from '../data/carouselData.js';

/* 캐러셀 구현하려다가 첫 이미지만 넣고 검색 기능 구현 중 */
const carouselSection = document.querySelector('.carousel-banner');

let carouselTemplate = `<img src=${carouselData[0]['img']}>`;
carouselSection.innerHTML = carouselTemplate;

/* 검색 카테고리 */

const selectCategory = document.querySelector('.select-category');
const selectCategoryContent = document.querySelector(
  '.select-category-content'
);
const selectCategoryOption = document.querySelector('.select-category-option');

selectCategory.addEventListener('click', ({ target }) => {
  selectCategoryOption.classList.toggle('showCategory');
  if (!target.closest('.select-category-option')) return;
  selectCategoryContent.innerHTML = target.textContent;
});
