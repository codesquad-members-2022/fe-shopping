import { rootEvent } from './events/rootEvent.js';
import { MainCategoryController } from './controllers/MainCategoryController.js';
import { SearchCategoryController } from './controllers/SearchCategoryController.js';
import { SearchInputController } from './controllers/SearchInputController.js';

const init = () => {
  rootEvent();

  new MainCategoryController();
  new SearchCategoryController();
  new SearchInputController();
};

init();
