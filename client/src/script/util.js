const delay = (data, time) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), time);
  });
};
const debounce = (function () {
  let timer;
  return function (callback, delay) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(callback, delay);
  };
})();
const extend = (child, parent) => {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = child;
}

export { delay, debounce, extend };