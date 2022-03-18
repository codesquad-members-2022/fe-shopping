import { runTransitionAnimation } from "../util.js";

export const DropBox = function () {};
DropBox.prototype = {
  constructor: DropBox,
  createDropBoxTemplate(data, className) {
    return `<div class="${className} animation-init" tabindex="0">
      ${
        data
          ? data.reduce((divElement, content) => divElement + `<div ${className}-child>${content}</div>`, "")
          : ""
      }
    </div>`;
  },
  setDropBoxInfo(
    eventListenerClassName,
    dropBoxClassName,
    parentNodeClassName,
    dropBoxCurrentState,
    dropBox
  ) {
    return { eventListenerClassName, dropBoxClassName, parentNodeClassName, dropBoxCurrentState, dropBox };
  },
  addDropBox(dropBoxInfo) {
    const parentNode = document.querySelector(`.${dropBoxInfo.parentNodeClassName}`);
    if (this.removeDropBox(dropBoxInfo)) return;
    parentNode.insertAdjacentHTML("beforeend", dropBoxInfo.dropBox);
    dropBoxInfo.dropBoxCurrentState = document.querySelector(`.${dropBoxInfo.dropBoxClassName}`);
    runTransitionAnimation(dropBoxInfo.dropBoxCurrentState);
  },
  removeDropBox(dropBoxInfo) {
    if (dropBoxInfo.dropBoxCurrentState) {
      dropBoxInfo.dropBoxCurrentState.remove();
      dropBoxInfo.dropBoxCurrentState = null;
      return true;
    }
    return false;
  },
  onDropBoxRenderEvent(dropBoxInfo) {
    const eventListenerNode = document.querySelector(`.${dropBoxInfo.eventListenerClassName}`);
    eventListenerNode.addEventListener("click", () => this.addDropBox(dropBoxInfo));
    eventListenerNode.addEventListener("focusout", (e) => this.removeDropBox(dropBoxInfo));
  },
};
