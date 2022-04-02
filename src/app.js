import { SearchBar } from './header/searchBar/SearchBar.js';
import { GlobalCategory } from './header/globalCategory/GlobalCategory.js';
import { Banner } from './body/banner/Banner.js';

const searchBar = new SearchBar();
const gCategory = new GlobalCategory();
const banner = new Banner();
searchBar.init();
gCategory.init();
banner.init();
