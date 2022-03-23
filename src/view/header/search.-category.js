import { Core } from "../core.js";

export class SearchCategory extends Core {
  constructor() {
    super();
    this.template = this.getTemplate();
    this.categoryPop = false;
  }
  getTemplate() {
    return `
  <div class="select-category-wrap">
    <button class="select-category">전체</button>
    <button class="select-toggle">
      <img
        src="../fe-shopping/src/img/search-toggle.JPG"
        alt=""
      />
    </button>
    <ul class="select-category-list">
      <li>전체</li>
      <li>여성패션</li>
      <li>남성패션</li>
      <li>남녀 공용 의류</li>
      <li>유아동패션</li>
      <li>뷰티</li>
      <li>출산/유아동</li>
      <li>식품</li>
    </ul>
  </div>
    `;
  }
}
