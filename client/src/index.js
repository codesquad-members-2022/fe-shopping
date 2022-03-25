import { rootEvent } from './events/rootEvent.js';
import { CategoryController } from './controllers/CategoryController.js';
import { SearchInputController } from './controllers/SearchInputController.js';

const init = () => {
  rootEvent();

  new CategoryController();
  new SearchInputController();
};

init();
