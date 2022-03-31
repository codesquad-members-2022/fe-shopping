export default class View {
  init(el) {
    this.el = document.querySelector(el);
  }

  show(el) {
    Object.assign(el.style, { display: 'block' });
  }

  hide(el) {
    Object.assign(el.style, { display: 'none' });
  }

  debounce(func, time, target = false) {
    let debounceTimer;

    return (() => {
      if (debounceTimer) clearTimeout(debounceTimer);

      debounceTimer = setTimeout(() => {
        if (!target) func();
        else func(target);
      }, time);
    })();
  }

  throttle(func, time, target = false) {
    let throttleTimer;

    return (() => {
      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          if (!target) func();
          else func(target);
        }, time);
      }
    })();
  }
}
