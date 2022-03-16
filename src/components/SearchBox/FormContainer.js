import HtmlElement from '../../utils/HtmlElement.js';
import {
  findTargetIdElement,
  handleDisplayElement,
} from '../../utils/manuplateDOM.js';

function FormContainer(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
}

FormContainer.prototype = Object.create(HtmlElement.prototype);
FormContainer.prototype.constructor = FormContainer;
// Object.setPrototypeOf(FormContainer.prototype, HtmlElement.prototype);

FormContainer.prototype.setTemplate = function () {
  this.$element.classList.add('search__container');
  this.$element.innerHTML = template;
};

FormContainer.prototype.setEvent = function () {
  const $form = findTargetIdElement(this.$element, 'searhForm');
  const $input = findTargetIdElement($form, 'searchInput');
  $form.addEventListener('submit', handleSubmit.bind(this));
  $input.addEventListener('focus', showRecord.bind(this));
  $input.addEventListener('focusout', showRecord.bind(this));
};

export default FormContainer;

function handleSubmit(event) {
  event.preventDefault();
  console.log(this);
}

function showRecord() {
  const $record = findTargetIdElement(this.$element, 'searchRecord');
  handleDisplayElement($record);
}

const template = `<form class="search__form" id="searhForm">
<input
  id="searchInput"
  type="text"
  placeholder="찾고 싶은 상품을 검색해보세요!"
  autocomplete="off"
/>
<div>
  <button><i class="fas fa-microphone"></i></button>
  <button><i class="fas fa-search"></i></button>
</div>
</form>
<div class="none search__record" id="searchRecord">
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
