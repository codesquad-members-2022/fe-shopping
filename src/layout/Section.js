import HtmlElement from '../utils/HtmlElement.js';

function Section(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
  this.setTemplate();
  this.render();
  // this.setEvent();
}

Section.prototype = Object.create(HtmlElement.prototype);
Section.prototype.constructor = Section;
// Object.setPrototypeOf(Section.prototype, HtmlElement.prototype);

Section.prototype.setTemplate = function () {
  this.$element.innerHTML = template;
};

export default Section;

const template = ` <div class="logo-area">
<img
  src="https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png"
  alt="coupang-logo"
/>
<div class="search">
  <div class="search__selector">
    <div><span>전체</span> <i class="fas fa-caret-down"></i></div>
    <ul class="search__options">
      <li>옵션1</li>
      <li>옵션2</li>
      <li>옵션3</li>
      <li>옵션4</li>
      <li>옵션5</li>
      <li>옵션6</li>
      <li>옵션7</li>
      <li>옵션8</li>
      <li>옵션9</li>
      <li>옵션10</li>
    </ul>
  </div>
  <div class="search__box">
    <form class="search__form">
      <input
        type="text"
        placeholder="찾고 싶은 상품을 검색해보세요!"
      />
      <div class="div">
        <button><i class="fas fa-microphone"></i></button>
        <button><i class="fas fa-search"></i></button>
      </div>
    </form>
    <div class="search__record">
      <h5>최근 검색어</h5>
      <ul>
        <li>검색어1</li>
        <li>검색어2</li>
        <li>검색어3</li>
        <li>검색어4</li>
      </ul>
      <div>
        <button>전체삭제</button>
        <button>최근 검색어 끄기</button>
      </div>
    </div>
  </div>
</div>
<div class="user-info">
  <div><i class="fas fa-user"></i><span>마이쿠팡</span></div>
  <div><i class="fas fa-shopping-cart"></i><span>장바구니</span></div>
</div>
</div>
<nav class="gnb">
<ul class="gnb__container">
  <li><a href="/">로켓배송</a></li>
  <li><a href="/">로켓프레시</a></li>
  <li><a href="/">쿠팡비즈</a></li>
  <li><a href="/">로켓직구</a></li>
  <li><a href="/">골드박스</a></li>
  <li><a href="/">와우회원할인</a></li>
  <li><a href="/">이벤트/쿠폰</a></li>
  <li><a href="/">기획전</a></li>
  <li><a href="/">여행/티겟</a></li>
</ul>
</nav>`;
