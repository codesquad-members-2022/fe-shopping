import { carouselData } from '../data/carouselData.js';
import { delay, $ } from './util.js';
import { AutoComplete } from './component/AutoComplete.js';
import { History } from './component/History.js';

/* 캐러셀 구현하려다가 첫 이미지만 넣고 검색 기능 구현 중 */
const $carouselSection = $('.carousel-banner');

let carouselTemplate = `<img src=${carouselData[0]['img']}>`;
$carouselSection.innerHTML = carouselTemplate;

/* 검색 카테고리 */

const $selectCategory = $('.select-category');
const $selectCategoryContent = $('.select-category-content');
const $selectCategoryOption = $('.select-category-option');

$selectCategory.addEventListener('click', ({ target }) => {
  $selectCategoryOption.classList.toggle('showCategory');
  if (!target.closest('.select-category-option')) return;
  $selectCategoryContent.innerHTML = target.textContent;
});

/* 검색창 자동완성 */

const autocomplete = new AutoComplete();

autocomplete.setAutoCompleteListener();

/* 검색창 자동완성 */

const history = new History();
console.log(history);
history.setHistoryListener();

// $searchInput.addEventListener('blur', ({ target }) => {
//   // $autocompleteBox.classList.remove('showAutocomplete');
//   // $historyPopupBox.classList.remove('showHistoryPopup');
//   // $historyPopupBtn.classList.remove('showHistoryPopup');
// });
