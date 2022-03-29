import {
  findTargetIdElement,
  handleDisplayElement,
} from '../../../utils/manuplateDOM.js';

export function handleClick({ target }) {
  const $categoryButton = target.closest('.category__button');
  if ($categoryButton) {
    handleCategoryButton.call(this);
  }
}

function handleCategoryButton() {
  const $categoryLayer = findTargetIdElement(this.$element, 'category-layer');
  handleDisplayElement($categoryLayer);
}
