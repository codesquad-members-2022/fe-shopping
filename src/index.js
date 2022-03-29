import Root from './layout/root.js';

const $root = document.getElementById('root');

function init() {
  new Root($root);
}
window.addEventListener('DOMContentLoaded', init);
