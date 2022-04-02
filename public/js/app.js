import SearchForm from './components/searchForm/SearchForm.js';
import CategoryArea from './components/categoryArea/CategoryArea.js';
import MainBannerView from './view/MainBannerView.js';

const init = () => {
  new SearchForm(document.querySelector('.search-form'));
  new CategoryArea(document.querySelector('.category-area'));
  new MainBannerView(document.querySelector('.main-banner'));
}

init();
