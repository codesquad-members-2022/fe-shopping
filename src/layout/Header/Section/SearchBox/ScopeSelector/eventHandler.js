import EventHandler from '../../../../../utils/EventHandler.js';
import {
  findTargetIdElement,
  handleDisplayElement,
} from '../../../../../utils/manuplateDOM.js';

const eventHandler = new EventHandler();

eventHandler.setSubLogic({
  showCategory,
});

eventHandler.setCoreHandler({
  handleClick,
});

function handleClick({ target }) {
  const $searchSelector = target.closest('#searchSelector');
  if ($searchSelector)
    return this.eventHandler.subLogic.showCategory.call(this);
  if (target.dataset?.option)
    return this.state.changeSearchOption(target.dataset.option);
}

function showCategory() {
  const $options = findTargetIdElement(this.$element, 'searchOptions');
  handleDisplayElement($options);
}

export default eventHandler;
