import HtmlElement from '../../utils/HtmlElement.js';
import {
  findTargetIdElement,
  handleDisplayElement,
} from '../../utils/manuplateDOM.js';
import RecentSearchList from './RecentSearchList.js';

function FormContainer(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
}

FormContainer.prototype = Object.create(HtmlElement.prototype);
FormContainer.prototype.constructor = FormContainer;
// Object.setPrototypeOf(FormContainer.prototype, HtmlElement.prototype);

FormContainer.prototype.setTemplate = function () {
  this.$element.classList.add('search__container');
  const recentSearchList = new RecentSearchList('ul', null);
  this.$element.innerHTML = template(recentSearchList);
};

FormContainer.prototype.setEvent = function () {
  const $form = findTargetIdElement(this.$element, 'searhForm');
  const $input = findTargetIdElement($form, 'searchInput');
  $form.addEventListener('submit', handleSubmit.bind(this));
  $input.addEventListener('focus', showRecord.bind(this));
  $input.addEventListener('focusout', showRecord.bind(this));
  $input.addEventListener('input', handleInput.bind(this));
};

export default FormContainer;

function handleSubmit(event) {
  event.preventDefault();
  history.pushState(null, null, `/?search=${'검색어'}`);
}

function handleInput(event) {
  console.log(event.target.value);
}

function showRecord() {
  const $record = findTargetIdElement(this.$element, 'searchRecord');
  handleDisplayElement($record);
}

function template(recentSearchList) {
  return `<form class="search__form" id="searhForm">
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
${recentSearchList.directRender()}
<div>
  <button>전체삭제</button>
  <button>최근 검색어 끄기</button>
</div>
</div>`;
}
