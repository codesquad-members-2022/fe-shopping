import { handleDisplayElement } from '../../../utils/manuplateDOM.js';

export function handleClick({ target }) {
  const $categoryButton = target.closest('.category__button');
  if ($categoryButton) {
    handleCategoryButton.call(this);
  }
}

function handleCategoryButton() {
  const $categoryLayer = this.$element.querySelector('#category-layer');
  handleDisplayElement($categoryLayer);
}
