import Component from "../../core/Component";
import { createExtendsRelation } from "../../core/oop-utils";
import Search from "./Search/Search";

function Header(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(Header, Component);

Header.prototype.mount = function () {
  const $search = this.$target.querySelector(".search");
  const search = new Search($search);
};

Header.prototype.template = function () {
  return `
    <div class="header__category">
        <div class="category__icon">
            <i class="fas fa-bars"></i>
        </div>
        <div class="category__text">
            <span>카테고리</span>
        </div>
    </div>
    <div class="header__main">
        <div class="main__searchBar">
            <div class="logo">
                <img src="https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png" />
            </div>
            <div class="search"></div>
        </div>
        <div class="main__nav">
            <span class="navItem">로켓배송</span>
            <span class="navItem">로켓프레시</span>
            <span class="navItem">쿠팡비즈</span>
            <span class="navItem">로켓직구</span>
            <span class="navItem">골드박스</span>
            <span class="navItem">와우회원할인</span>
            <span class="navItem">이벤트/쿠폰</span>
            <span class="navItem">기획전</span>
            <span class="navItem">여행/티켓</span>
        </div>
    </div>
    <div class="header__icons">
        <div class="icons__myCoupang">
            <div class="myCoupang__icon">
                <span>
                    <i class="fas fa-user"></i>
                </span>
            </div>
            <div class="myCoupang__text">
                <span>마이쿠팡</span>
            </div>
        </div>
        <div class="icons__cart">
            <div class="cart__icon">
                <span>
                    <i class="fas fa-shopping-cart"></i>
                </span>
            </div>
            <div class="cart__text">
                <span>장바구니</span>
            </div>
        </div>
    </div>
  `;
};

export default Header;
