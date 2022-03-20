import HtmlElement from '../../../utils/HtmlElement.js';
import {
  findTargetClassElement,
  findTargetIdElement,
} from '../../../utils/manuplateDOM.js';
import Navigation from './Navigation/index.js';
import SearchBox from './SearchBox/index.js';

export default function Section($element) {
  HtmlElement.call(this, $element);
}

Section.prototype = Object.create(HtmlElement.prototype);
Section.prototype.constructor = Section;

Section.prototype.setTemplate = function () {
  return `
    <div class="logo-area">
      ${imgTemplate}
      <div class="search"></div>
      ${userInfoTemplate}
    </div>
    <div class="gnb"></div>
  `;
};

Section.prototype.renderChild = function () {
  const $gnb = findTargetClassElement(this.$element, 'gnb');
  const $searchBox = findTargetClassElement(this.$element, 'search');
  new SearchBox($searchBox);
  new Navigation($gnb);
};

Section.prototype.setEvent = function () {
  const $logo = findTargetIdElement(this.$element, 'main-logo');
  $logo.addEventListener('click', BackToHome);
};

function BackToHome() {
  history.pushState(null, null, '/');
  location.reload();
}

const imgTemplate = `<img
id="main-logo"
src="https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png"
alt="coupang-logo"
/>`;

const userInfoTemplate = `   
  <div class="user-info">
    <div><i class="fas fa-user"></i><span>마이쿠팡</span></div>
    <div><i class="fas fa-shopping-cart"></i><span>장바구니</span></div>
  </div>`;
