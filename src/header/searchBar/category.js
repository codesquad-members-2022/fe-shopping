import {
  selector,
  addClass,
  removeClass,
  toggleClass,
} from '../../utils/utils.js';

const CATEGORY = 'search-bar-category';
const CATEGORY_LIST = 'search-bar-category-list';
const CATEGORY_ITEM = 'search-bar-category-item';
const CATEGORY_NAME = 'search-bar-category-name';

const $searchBarCategory = selector(`.${CATEGORY}`);
const $searchBarCategoryList = selector(`.${CATEGORY_LIST}`);

$searchBarCategory.addEventListener('click', (e) => {
  toggleClass('close', $searchBarCategoryList);
  if (!e.target.classList.contains(CATEGORY_ITEM)) return;
  const $categoryName = e.currentTarget.querySelector(`.${CATEGORY_NAME}`);
  $categoryName.textContent = e.target.textContent;
});
