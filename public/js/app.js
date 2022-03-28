import SearchForm from './components/searchForm/SearchForm.js';
import CategoryArea from './components/categoryArea/CategoryArea.js';

const init = () => {
  new SearchForm(document.querySelector('.search-form'));
  new CategoryArea(document.querySelector('.category-area'));
}

init();
