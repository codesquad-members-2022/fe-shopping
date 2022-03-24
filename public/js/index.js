import { carouselData } from '../data/carouselData.js';
import { delay, $ } from './util.js';

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

const getAutocomplete = (value) => {
  return fetch(`/autocomplete?value=${value}`).then((res) => res.json());
};

const showAutocomplete = (data, keyword) => {
  const length = keyword.length;
  let template = `<div> `;
  data.forEach((element) => {
    const matched = element.slice(0, length);
    const notMatched = element.slice(length);
    template += `<li>${matched}<span>${notMatched}</span></li>`;
  });
  template += `</div>`;

  $autocompleteBox.innerHTML = template;
};

const $searchInput = $('.search-form-input');
const $autocompleteBox = $('.autocomplete-popup');

$searchInput.addEventListener('input', ({ target }) => {
  const keyword = target.value;
  $autocompleteBox.classList.add('showAutocomplete');
  delay(500).then((res) => {
    getAutocomplete(target.value).then((data) => {
      showAutocomplete(data, keyword);
    });
  });
});

/* 최근 검색어 */

const $historyPopupBox = $('.history-popup');
const $historyPopupBtn = $('.history-popup-btn');
const $deleteAllHistory = $('.delete-all-history');

$searchInput.addEventListener('focus', ({ target }) => {
  $historyPopupBox.classList.add('showHistoryPopup');
  $historyPopupBtn.classList.add('showHistoryPopup');
});

const getInput = () => {
  const currentInput = $searchInput.value;
  return currentInput;
};

let historyList = new Array();

const showHistory = (element) => {
  const list = document.createElement('li');
  list.innerText = element;
  $historyPopupBox.appendChild(list);
};

const savedHistory = JSON.parse(localStorage.getItem('history'));

// localStorage에 있는 검색어를 띄운다
if (savedHistory !== null) {
  historyList = savedHistory;
  savedHistory.forEach((element) => showHistory(element));
}

const deleteHistory = () => {
  localStorage.clear();
};

$deleteAllHistory.addEventListener('click', ({ target }) => {
  console.log('delete');
  deleteHistory();
  $historyPopupBox.innerHTML = `<h3>최근 검색어</h3>`;
});

$searchInput.addEventListener('keypress', (key) => {
  $autocompleteBox.classList.remove('showAutocomplete');
  if (key.keyCode === 13) {
    const input = getInput();
    historyList.push(input);
    localStorage.setItem('history', JSON.stringify(historyList));
    showHistory(input);
  }
});

$searchInput.addEventListener('blur', ({ target }) => {
  $autocompleteBox.classList.remove('showAutocomplete');
  // $historyPopupBox.classList.remove('showHistoryPopup');
  // $historyPopupBtn.classList.remove('showHistoryPopup');
});
