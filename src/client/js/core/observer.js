let currentRenderer = null;

export const observe = (render) => {
  currentRenderer = render;
  render();
  currentRenderer = null;
};

export const observable = (obj) => {
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    const observers = new Set();
    Object.defineProperty(obj, key, {
      get() {
        if (currentRenderer) observers.add(currentRenderer);
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
