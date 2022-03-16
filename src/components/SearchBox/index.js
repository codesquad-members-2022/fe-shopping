import HtmlElement from '../../utils/HtmlElement.js';

function SearchBox(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
  this.setTemplate();
  this.render();
}
SearchBox.prototype = Object.create(HtmlElement.prototype);
SearchBox.prototype.constructor = SearchBox;

SearchBox.prototype.setTemplate = function () {
  this.$element.classList.add('search');
  this.$element.innerHTML = template;
};

export default SearchBox;

const template = `
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
</div>`;
