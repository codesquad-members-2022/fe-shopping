import Header from './layout/Header/index.js';
import Main from './layout/Main/index.js';
import { findTargetIdElement } from './utils/manuplateDOM.js';

const $root = findTargetIdElement(document, 'root');

function init() {
  new Header('header', $root);
  new Main('main', $root);
  // document.body.addEventListener('click', hidePopUp);
}
window.addEventListener('DOMContentLoaded', init);
