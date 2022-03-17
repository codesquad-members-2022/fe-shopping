import "../SCSS/style.scss";
import { selector } from "./util.js";

class FocusBlur {
  constructor(target, transformer) {
    this.target = target;
    this.transformer = transformer;
  }

  toggleTransformerHidden = () => {
    this.transformer.classList.toggle("hidden");
  };

  getFocusBlurEvent = () => {
    this.target.addEventListener("focus", this.toggleTransformerHidden);
    this.target.addEventListener("blur", this.toggleTransformerHidden);
  };
}

const centerSearchInput = selector("input", selector(".center-search"));
const centerRelativeInfo = selector(".center-relative-info");
const centerSearchFocusBlur = new FocusBlur(
  centerSearchInput,
  centerRelativeInfo
);
centerSearchFocusBlur.getFocusBlurEvent();
