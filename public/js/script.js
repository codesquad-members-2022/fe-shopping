import { categoryList, headerCategoryTitle } from "./category.js";
import { HistorySearch } from "./recentSearch.js";
import { Autocompletekeyword } from "./autocompletekeyword.js";

const historySearch = new HistorySearch();
const autocompletekeyword = new Autocompletekeyword();
historySearch.init();
