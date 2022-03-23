import { SearchCategoryController } from "./controller/header/search-category-controller.js";
import { SearchInputController } from "./controller/header/search-input-controller.js";
import { HeaderMain } from "./view/header/header-main.js";
import { SearchInput } from "./view/header/search-input.js";
import { SearchCategory } from "./view/header/search.-category.js";
import { TopBar } from "./view/header/topbar.js";

const topbar = new TopBar();
const headerMain = new HeaderMain();
const searchCategory = new SearchCategory();
const searchInput = new SearchInput();

topbar.render(topbar.template, ".header-container");
headerMain.render(headerMain.template, ".header-container");
searchCategory.render(searchCategory.template, ".search-wrap");
searchInput.render(searchInput.template, ".search-wrap");

const categoryController = new SearchCategoryController();
const inputController = new SearchInputController();
categoryController.addEvents();
inputController.addEvents();
