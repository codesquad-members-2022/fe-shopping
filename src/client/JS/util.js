const selector = (selector, target = document) =>
  target.querySelector(selector);

const delay = (ms, data) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export { selector, delay };
