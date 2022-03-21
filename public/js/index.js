import { carouselData } from '../data/carouselData.js';
import { delay } from './util.js';

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

/* 검색창 자동완성 */

const getAutocomplete = (value) => {
  return fetch(`/autocomplete?value=${value}`).then((res) => res.json());
};

const showAutocomplete = (data) => {
  // data.forEach((e) => console.log(e));
  let template = `<div> `;
  data.forEach((element) => {
    template += `<li>${element}</li>`;
  });
  template += `</div>`;

  autocompleteBox.innerHTML = template;
};

const searchInput = document.querySelector('.search-form-input');
const autocompleteBox = document.querySelector('.autocomplete-popup');

searchInput.addEventListener('input', ({ target }) => {
  autocompleteBox.classList.add('showAutocomplete');
  delay(500).then((res) => {
    getAutocomplete(target.value).then((data) => {
      showAutocomplete(data);
    });
  });
});
