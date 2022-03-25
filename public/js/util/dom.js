export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

export const setDisplayBlock = (element) => {
  element.style.display = "block";
};

export const setDisplayNone = (element) => {
  element.style.display = "none";
};
