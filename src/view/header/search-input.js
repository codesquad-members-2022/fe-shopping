import { Core } from "../core.js";

export class SearchInput extends Core {
  constructor() {
    super();
    this.template = this.getTemplate();
  }
  getTemplate() {
    return `
  <div class="search-input-wrap">
    <input
      type="text"
      class="search-input"
      placeholder="찾고 싶은 상품을 검색해보세요!"
    />
    <button class="search-btn"></button>
    <ul class="search-list"></ul>
  </div>
</div>
    `;
  }
}
