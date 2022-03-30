import HtmlElement from '../../core/HtmlElement.js';
import { setInheritance } from '../../utils/manuplateDOM.js';

export default function Main({ $element }) {
  HtmlElement.call(this, { $element });
}

setInheritance({ parent: HtmlElement, child: Main });

Main.prototype.setTemplate = function () {
  return `
      <div>메인</div>`;
};
