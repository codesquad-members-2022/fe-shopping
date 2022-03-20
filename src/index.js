import Root from './layout/root.js';
import { findTargetIdElement } from './utils/manuplateDOM.js';

const $root = findTargetIdElement(document, 'root');

function init() {
  new Root($root);
}
window.addEventListener('DOMContentLoaded', init);
