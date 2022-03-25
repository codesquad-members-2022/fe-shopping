import {
  findTargetIdElement,
  handleDisplayElement,
} from '../../../../../utils/manuplateDOM.js';

const eventHandler = {
  handleClick({ target }) {
    const $searchSelector = target.closest('#searchSelector');
    if ($searchSelector) return showCategory.apply(this);
    if (target.dataset?.option)
      return this.state.changeSearchOption(target.dataset.option);
  },
};

function showCategory() {
  const $options = findTargetIdElement(this.$element, 'searchOptions');
  handleDisplayElement($options);
}

export default eventHandler;
