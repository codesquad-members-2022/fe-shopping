import Root from './layout/root.js';

const $rootWrapper = document.getElementById('root');

function init() {
  const $root = new Root({ $element: $rootWrapper });
  $root.init();
}
// window.addEventListener('DOMContentLoaded', init);
init();
