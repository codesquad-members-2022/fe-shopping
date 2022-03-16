import HtmlElement from '../../utils/HtmlElement.js';

function FormContainer(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
  this.setTemplate();
  this.render();
  // this.setEvent();
}

FormContainer.prototype = Object.create(HtmlElement.prototype);
FormContainer.prototype.constructor = FormContainer;
// Object.setPrototypeOf(FormContainer.prototype, HtmlElement.prototype);

FormContainer.prototype.setTemplate = function () {
  this.$element.classList.add('search__container');
  this.$element.innerHTML = template;
};

export default FormContainer;

const template = `<form class="search__form">
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
</div>`;
