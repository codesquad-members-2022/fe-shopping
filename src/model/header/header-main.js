import { Core } from "../core.js";

export class HeaderMain extends Core {
  constructor() {
    super();
    this.template = this.getTemplate();
  }
  getTemplate() {
    return `
    <header>
      <div class="category-btn"></div>
      <section class="header-main-wrap">
        <div class="header-main">
          <h1 class="logo">
            <img
              src="https://image7.coupangcdn.com/image/coupang/common/logo_coupang_w350.png"
              alt=""
            />
          </h1>
          <div class="search-wrap"></div>

          <li class="header-main-btn">마이쿠팡</li>
          <li class="header-main-btn">장바구니</li>
        </div>

        <ul class="header-main-nav">
          <li>로켓배송</li>
          <li>로켓브레시</li>
          <li>쿠팡비즈</li>
          <li>로켓직구</li>
          <li>골드박스</li>
          <li>와우회원할인</li>
          <li>이벤트/쿠폰</li>
          <li>기획전</li>
          <li>여행/티켓</li>
        </ul>
      </section>
    </header>`;
  }
}
