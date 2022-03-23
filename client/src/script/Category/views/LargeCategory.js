import { extend } from "../../util.js";
import View from "./View.js";

function LargeCategory () {
  View.apply(this, arguments);
}
extend(LargeCategory, View);

LargeCategory.prototype.getTemplate = function (state) {
  return `
  <ul class="large-category">
    ${state.largeCategories.map(item => `<li>${item}</li>`).join('')}
  </ul>
  `;
}

export default LargeCategory;
