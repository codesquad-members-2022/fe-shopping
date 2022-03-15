import { rootEvent } from './events/rootEvent.js';
import { selectCategoryEvent } from './events/selectCategoryEvent.js';
import { inputKeyWordEvent } from './events/inputKeyWordEvent.js';

const init = () => {
  rootEvent();
  selectCategoryEvent();
  inputKeyWordEvent();
};

init();
