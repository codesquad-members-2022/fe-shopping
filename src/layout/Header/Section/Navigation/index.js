import HtmlElement from '../../../../core/HtmlElement.js';
import { setInheritance } from '../../../../utils/manuplateDOM.js';

export default function Navigation($element) {
  HtmlElement.call(this, $element);
}
setInheritance({ parent: HtmlElement, child: Navigation });

Navigation.prototype.setTemplate = function () {
  return template;
};

const template = `
<ul class="gnb__container">
  <li><a href="/">로켓배송</a></li>
  <li><a href="/">로켓프레시</a></li>
  <li><a href="/">쿠팡비즈</a></li>
  <li><a href="/">로켓직구</a></li>
  <li><a href="/">골드박스</a></li>
  <li><a href="/">와우회원할인</a></li>
  <li><a href="/">이벤트/쿠폰</a></li>
  <li><a href="/">기획전</a></li>
  <li><a href="/">여행/티겟</a></li>
</ul>`;
