const $ = (param) => document.querySelector(param);
const target$ = (parent, childClassName) =>
  parent.querySelector(childClassName);

export { $, target$ };
