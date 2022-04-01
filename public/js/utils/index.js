export const myInterval = (callback, time) => {
  let flag = true;
  setTimeout(() => {
    if (!flag) return;
    callback();
  }, time);
  return () => { flag = false; };
};

export const throttle = (callback, limit) => {
  let waiting = false;
  return function() {
    if (!waiting) {
      callback.apply(this, arguments);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
};
