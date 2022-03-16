import { moveCarousel } from './carousel.js';
import { toggleDropdown, chooseCategory } from './input-category.js';

document.addEventListener('DOMContentLoaded', () => {
  moveCarousel();
  toggleDropdown();
  chooseCategory();
});
