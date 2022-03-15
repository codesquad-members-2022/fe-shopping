import Component from "../../core/Component";
import { createExtendsRelation } from "../../core/oop-utils";

function Header(...params) {
  Component.call(this, ...params);
}
createExtendsRelation(Header, Component);

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
            <div class="search">
                <div class="search__category">
                    <span>전체</span>
                    <span>▼</span>
                </div>
                <div class="search__input">
                    <input type="text" placeholder="찾고 싶은 상품을 검색해보세요!" />
                    <span class="input__icon">
                        <i class="fas fa-microphone"></i>
                    </span>
                    <span class="input__icon">
                        <i class="fas fa-search"></i>
                    </span>
                    <div class="search__recent">
                        <div class="recent__title">
                            <span>최근 검색어</span>
                        </div>
                        <div class="recent__body">
                            <span>코드스쿼드</span>
                            <span>아이폰</span>
                        </div>
                        <div class="recent__footer">
                            <span class="recent__deleteBtn">전체삭제</span>
                            <span class="recent__offBtn">최근검색어끄기</span>
                        </div>
                    </div>
                    <div class="search__suggestion">
                        <div class="suggestion__body">             
                            <span>아이폰 13 pro</span>
                            <span>아이패드 에어 4</span>
                            <span>아이깨끗해</span>
                            <span>아이깨끗해</span>
                            <span>아이깨끗해</span>
                            <span>아이깨끗해</span>
                            <span>아이깨끗해</span>
                            <span>아이깨끗해</span>
                            <span>아이깨끗해</span>
                        </div>
                    </div>
                </div>
            </div>
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
