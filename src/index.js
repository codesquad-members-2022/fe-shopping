import { SearchCategoryController } from "./controller/header/search-category-controller.js";
import { SearchInputController } from "./controller/header/search-input-controller.js";
import { HeaderMain } from "./view/header/header-main.js";
import { TopBar } from "./view/header/topbar.js";

const main = () => {
  const topbar = new TopBar();
  const headerMain = new HeaderMain();
  const categoryController = new SearchCategoryController();
  const inputController = new SearchInputController();

  topbar.render(topbar.template, ".header-container");
  headerMain.render(headerMain.template, ".header-container");
  categoryController.init();
  inputController.init();
};

main();
