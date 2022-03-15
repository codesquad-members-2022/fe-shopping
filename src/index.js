import Header from './layout/Header.js';
import { findTargetIdElement } from './utils/manuplateDOM.js';

const $root = findTargetIdElement(document, 'root');

function init() {
  const header = new Header('header');
  const main = document.createElement('main');
  main.innerHTML = `<div>메인</div>`;
  $root.appendChild(header.$element);
}
window.addEventListener('DOMContentLoaded', init);
