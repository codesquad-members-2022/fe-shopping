import Navigation from '../../components/Navigation/index.js';
import SearchBox from '../../components/SearchBox/index.js';
import HtmlElement from '../../utils/HtmlElement.js';
import { findTargetIdElement } from '../../utils/manuplateDOM.js';

export default function Section(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
}

Section.prototype = Object.create(HtmlElement.prototype);
Section.prototype.constructor = Section;
// Object.setPrototypeOf(Section.prototype, HtmlElement.prototype);

Section.prototype.setTemplate = function () {
  const logoArea = document.createElement('div');
  logoArea.classList.add('logo-area');
  logoArea.insertAdjacentHTML('beforeend', imgTemplate);
  new SearchBox('div', logoArea);
  logoArea.insertAdjacentHTML('beforeend', userInfoTemplate);
  this.$element.appendChild(logoArea);
  new Navigation('nav', this.$element);
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
