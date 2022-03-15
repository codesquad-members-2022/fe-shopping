export const selector = (selector, base = document) => {
  return base.querySelector(selector);
};

export const selectorAll = (selector, base = document) => {
  return base.querySelectorAll(selector);
};

export const addClass = (className, element) => {
  element.classList.add(className);
};

export const removeClass = (className, element) => {
  element.classList.remove(className);
};

export const toggleClass = (className, element) => {
  element.classList.toggle(className);
};

export const createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  return element;
};

export const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
