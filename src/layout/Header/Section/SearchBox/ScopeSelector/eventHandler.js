import { handleDisplayElement } from '../../../../../utils/manuplateDOM.js';

export function handleClick({ target }) {
  const $searchSelector = target.closest('#searchSelector');
  if ($searchSelector) return showCategory.call(this);
  if (target.dataset?.option)
    return this.state.changeSearchOption(target.dataset.option);
}

function showCategory() {
  const $options = this.$element.querySelector('#searchOptions');
  handleDisplayElement($options);
}
