import { POP_UP } from '../constant/htmlSelector.js';

export function assignStyles($element, styleObj) {
  Object.assign($element.style, styleObj);
}

export function findTargetIdElement($target, id) {
  let answer = null;
  function recursive($element) {
    if ($element.children.length === 0 || answer) return;

    for (const childNode of $element.children) {
      if (childNode.id === id) {
        answer = childNode;
        break;
      }
      recursive(childNode);
    }
  }
  recursive($target);
  return answer;
}

export function findTargetClassElement($target, className) {
  let answer = null;
  function recursive($element) {
    if ($element.children.length === 0 || answer) return;

    for (const childNode of $element.children) {
      if (childNode.classList.contains(className)) {
        answer = childNode;
        break;
      }
      recursive(childNode);
    }
  }
  recursive($target);
  return answer;
}

export function findTargetClassElementAll($target, className) {
  const result = [];
  function recursive($element) {
    if ($element.children.length === 0) return;

    for (const childNode of $element.children) {
      if (childNode.classList.contains(className)) {
        result.push(childNode);
      }
      recursive(childNode);
    }
  }
  recursive($target);
  return result;
}

export function handleDisplayElement($element) {
  const elementClassList = $element.classList;
  if (elementClassList.contains(POP_UP.hidden)) {
    $element.classList.remove(POP_UP.hidden);
    $element.classList.add(POP_UP.show);
  } else {
    $element.classList.remove(POP_UP.show);
    $element.classList.add(POP_UP.hidden);
  }
}
