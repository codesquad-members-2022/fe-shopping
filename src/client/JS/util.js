const selector = (selector, target = document) =>
  target.querySelector(selector);

const delay = ({ time, signal = null, data }) =>
  new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(data), time);
    if (!signal) return;
    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
    });
  });

class intervalDelay {
  constructor(time) {
    this.inputDelayController = null;
    this.time = time;
  }

  waitDelay = async () => {
    if (this.inputDelayController) this.inputDelayController.abort();

    this.inputDelayController = new AbortController();
    const inputDelaySignal = this.inputDelayController.signal;
    await delay({ time: this.time, signal: inputDelaySignal });

    this.inputDelayController = null;
  };
}

export { selector, delay, intervalDelay };
