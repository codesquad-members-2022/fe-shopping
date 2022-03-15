import Category from './components/Category.js';
import Header from './layout/Header.js';
import { findTargetIdElement } from './utils/manuplateDOM.js';

const $main = findTargetIdElement(document, 'main');
const $header = findTargetIdElement(document, 'header');

function init() {
  const header = new Header('header');
  console.log(header);
  // header.render($main, handleCategoryButton);
}
window.addEventListener('DOMContentLoaded', init);
