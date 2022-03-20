const $ = (className) => document.querySelector(className);

const target$ = (parent, childClassName) =>
  parent.querySelector(childClassName);

const target$All = (parent, childClassName) =>
  parent.querySelectorAll(childClassName);

const $All = (className) => document.querySelectorAll(className);

export { $, target$, $All, target$All };
