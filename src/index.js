import Header from './layout/Header.js';
import { findTargetIdElement } from './utils/manuplateDOM.js';

const $root = findTargetIdElement(document, 'root');

function init() {
  new Header('header', $root);
}
window.addEventListener('DOMContentLoaded', init);
