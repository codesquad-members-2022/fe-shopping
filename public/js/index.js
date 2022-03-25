import { Carousel } from './component/Carousel.js';
import { SelectCategory } from './component/SelectCategory.js';
import { AutoComplete } from './component/AutoComplete.js';
import { History } from './component/History.js';

const carousel = new Carousel();
carousel.setCarousel();

const selectCategory = new SelectCategory();
selectCategory.setSelectCategoryListener();

const autocomplete = new AutoComplete();
autocomplete.setAutoCompleteListener();

const history = new History();
history.setHistoryListener();
