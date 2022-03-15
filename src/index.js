import Header from './layout/Header.js';
import { findTargetIdElement } from './utils/manuplateDOM.js';

const $root = findTargetIdElement(document, 'root');

function hello(event) {
  console.log(event.target);
}

function init() {
  // debugger;
  new Header('header', $root);
  // const main = document.createElement('main');
  // main.innerHTML = `<div><div id="temp" style="width: 200px; height: 200px; background-color: tomato"></div></div>`;
  // // $root.appendChild(main);
  // $root.innerHTML = main.innerHTML;
  // main.addEventListener('click', hello);
}
window.addEventListener('DOMContentLoaded', init);
