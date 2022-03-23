const selector = (selector, target = document) => {
  return target.querySelector(selector);
};

const getStyle = (target, styleValue) => {
  return document.defaultView
    .getComputedStyle(target)
    .getPropertyValue(styleValue);
};

const isHidden = (target) => {
  return target.classList.contains("hidden");
};

const findRefinedData = async (address, value = "") => {
  const dataAddress = `data/${address}`;
  const data = await fetch(dataAddress, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value }),
  });
  const refinedData = await data.json();
  return refinedData;
};

const drawListFromData = (data) => {
  return data.reduce((pre, post) => pre + `<li>${post}</li>`, "");
};

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

export {
  selector,
  getStyle,
  findRefinedData,
  delay,
  intervalDelay,
  isHidden,
  drawListFromData,
};
