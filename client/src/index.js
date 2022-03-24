import { rootEvent } from './events/rootEvent.js';
import { inputKeyWordEvent } from './events/inputKeyWordEvent.js';
import { CategoryController } from './controllers/CategoryController.js';

const init = () => {
  rootEvent();
  inputKeyWordEvent();

  new CategoryController();
};

init();
