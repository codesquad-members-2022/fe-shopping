import { runTransitionAnimation } from "../util.js";

export const DropBox = function (info) {
  // info : { eventListenerClassName, dropBoxClassName, parentNodeClassName, dropBoxCurrentState, dropBox };
  this.info = info;
};
DropBox.prototype = {
  constructor: DropBox,
  createDropBoxTemplate(data, className, keyWord, templateForEmptyData) {
    return `<div class="${className} animation-init" tabindex="0">
      ${
        data
          ? data.reduce((divElement, content) => {
              return divElement + this.createAutoCompleteTemplate(content, keyWord, className);
            }, "")
          : templateForEmptyData
      }
    </div>`;
  },
  createAutoCompleteTemplate(content, keyWord, className) {
    let hightlightLength = 0;
    return `<div ${className}-child>${
      keyWord
        ? '<strong class="text-highlight">' +
          [...keyWord]
            .map((char, idx) => {
              if (char !== " ") {
                hightlightLength = idx + 1;
              }
              return char;
            })
            .join("") +
          "</strong>" +
          content.slice(hightlightLength)
        : content
    }</div>`;
  },

  addDropBox() {
    const dropBoxInfo = this.info;
    const parentNode = document.querySelector(`.${dropBoxInfo.parentNodeClassName}`);
    if (this.removeDropBox(dropBoxInfo)) return;
    parentNode.insertAdjacentHTML("beforeend", dropBoxInfo.dropBox);
    dropBoxInfo.dropBoxCurrentState = document.querySelector(`.${dropBoxInfo.dropBoxClassName}`);
    runTransitionAnimation(dropBoxInfo.dropBoxCurrentState);
  },
  reRenderDropBox() {
    const dropBoxInfo = this.info;
    const parentNode = document.querySelector(`.${dropBoxInfo.parentNodeClassName}`);
    this.removeDropBox(dropBoxInfo);
    parentNode.insertAdjacentHTML("beforeend", dropBoxInfo.dropBox);
    dropBoxInfo.dropBoxCurrentState = document.querySelector(`.${dropBoxInfo.dropBoxClassName}`);
    dropBoxInfo.dropBoxCurrentState.style.opacity = 1;
  },
  removeDropBox() {
    const dropBoxInfo = this.info;
    if (dropBoxInfo.dropBoxCurrentState) {
      dropBoxInfo.dropBoxCurrentState.remove();
      dropBoxInfo.dropBoxCurrentState = null;
      return true;
    }
    return false;
  },
  onDropBoxRenderEvent() {
    const dropBoxInfo = this.info;
    const eventListenerNode = document.querySelector(`.${dropBoxInfo.eventListenerClassName}`);
    eventListenerNode.addEventListener("click", () => this.addDropBox(dropBoxInfo));
    eventListenerNode.addEventListener("focusout", (e) => this.removeDropBox(dropBoxInfo));
  },
};
