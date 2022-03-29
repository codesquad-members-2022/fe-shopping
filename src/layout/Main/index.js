import HtmlElement from '../../utils/HtmlElement.js';
import { setInheritance } from '../../utils/manuplateDOM.js';

export default function Main($element) {
  HtmlElement.call(this, $element);
}

setInheritance({ parent: HtmlElement, child: Main });

Main.prototype.setTemplate = function () {
  return `
      <h1>메인</h1>`;
};
