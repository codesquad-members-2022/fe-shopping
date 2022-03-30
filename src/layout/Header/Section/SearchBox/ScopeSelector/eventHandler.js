import { handleDisplayElement } from '../../../../../utils/manuplateDOM.js';

export function handleClick({ target }) {
  const $searchSelector = target.closest('#searchSelector');
  if ($searchSelector) return showCategory.call(this);
  if (target.dataset?.option)
    return changeSearchOption.call(this, target.dataset.option);
}

function showCategory() {
  const $options = this.$element.querySelector('#searchOptions');
  handleDisplayElement($options);
}

function changeSearchOption(targetOption) {
  console.log(targetOption);
  debugger;
  this.interface.setStateToStore({
    elementID: '$scopeSelector',
    newState: { option: targetOption },
  });
  // this.setState({ option });
  // this.$HistoryList.setState({ option });
  // this.$ScopeSelector.setState({ option });
}
