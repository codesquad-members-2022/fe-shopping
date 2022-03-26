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

const drawListFromData = (data) => {
  return data.reduce((pre, post) => pre + `<li>${post}</li>`, "");
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
    this.delayController = null;
    this.time = time;
  }

  waitDelay = async () => {
    if (this.delayController) this.delayController.abort();
    this.delayController = new AbortController();
    const inputDelaySignal = this.delayController.signal;
    await delay({ time: this.time, signal: inputDelaySignal });
    this.delayController = null;
  };

  abortDelay = () => {
    this.delayController.abort();
    this.delayController = null;
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
