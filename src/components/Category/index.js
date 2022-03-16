import HtmlElement from '../../utils/HtmlElement.js';
import {
  findTargetIdElement,
  handleDisplayElement,
} from '../../utils/manuplateDOM.js';

function Category(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
}

Category.prototype = Object.create(HtmlElement.prototype);
Category.prototype.constructor = Category;

Category.prototype.setTemplate = function () {
  this.$element.classList.add('category');
  this.$element.innerHTML = template;
};

Category.prototype.setEvent = function () {
  const $categoryButton = findTargetIdElement(this.$element, 'category-button');
  $categoryButton.addEventListener('click', handleCategoryButton.bind(this));
};

function handleCategoryButton(event) {
  const $categoryLayer = findTargetIdElement(this.$element, 'category-layer');
  handleDisplayElement($categoryLayer);
}

const template = `<div class="category__button" id="category-button">
    <i class="fas fa-bars"></i>
    <span>카테고리</span>
  </div>
  <div class="none" id="category-layer">
    <div class="category__layer">
    <ul class="category__list">
      <li><span>패션의류/잡화</span></li>
      <li><span>뷰티</span></li>
      <li><span>식품</span></li>
      <li><span>출산/유아동</span></li>
      <li><span>생활용품</span></li>
      <li><span>주방용품</span></li>
      <li><span>홈인테리어</span></li>
      <li><span>도서/음반/DVD</span></li>
      <li><span>스포츠/레저</span></li>
      <li><span>문구/오피스</span></li>
      <li><span>반려동물용품</span></li>
      <li><span>헬스/건강식품</span></li>
      <li><span>여행/티켓</span></li>
    </ul>
    <div class="category__depth">
      <ul class="category__list-inner">
        <li><span>유아/어린이</span></li>
        <li><span>소설/에세이/시</span></li>
        <li><span>초중고참고서</span></li>
        <li><span>가정 살림</span></li>
        <li><span>건강 취미</span></li>
        <li><span>경제 경영</span></li>
        <li><span>과학/공학</span></li>
        <li><span>국어/외국어/사전</span></li>
        <li><span>대학교재</span></li>
        <li><span>만화/라이트노벨</span></li>
      </ul>
    </div>
    <div class="category__depth">
      <ul class="category__list-inner">
        <li><span>유아/어린이</span></li>
        <li><span>소설/에세이/시</span></li>
        <li><span>초중고참고서</span></li>
        <li><span>가정 살림</span></li>
        <li><span>건강 취미</span></li>
      </ul>
    </div>
    </div>
  </div>`;

export default Category;
