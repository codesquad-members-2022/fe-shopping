import { POP_UP } from '../constant.js';

export function closePopUp($element) {
  $element.classList.remove(POP_UP.show);
  $element.classList.add(POP_UP.hidden);
}

export function showPopUp($element) {
  $element.classList.remove(POP_UP.hidden);
  $element.classList.add(POP_UP.show);
}

export function handleDisplayElement($element) {
  const elementClassList = $element.classList;
  if (elementClassList.contains(POP_UP.hidden)) {
    showPopUp($element);
  } else {
    closePopUp($element);
  }
}

export function hideAllPopUp({ target }) {
  const $openPopUpElement = document.body.querySelectorAll(`.${POP_UP.show}`);
  $openPopUpElement.forEach(
    ($element) => !target.closest('.pop-up-container') && closePopUp($element)
  );
}

export function setInheritance({ parent, child }) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}
