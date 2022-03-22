let currentObserver = null;

export const observe = (fn) => {
  currentObserver = fn;
  fn();
  currentObserver = null;
};

export const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return value;
      },
      set(newValue) {
        value = newValue;
        observers.forEach((fn) => fn());
      },
    });
  });
  return obj;
};
