import Header from './layout/Header.js';
import { findTargetIdElement } from './utils/manuplateDOM.js';

const $root = findTargetIdElement(document, 'root');

function init() {
  debugger;
  new Header('header', $root);
}
window.addEventListener('DOMContentLoaded', init);
