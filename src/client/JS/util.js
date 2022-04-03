const selector = (selector, target = document) => {
  return target.querySelector(selector);
};

const getStyle = (target, styleValue) => {
  return document.defaultView
    .getComputedStyle(target)
    .getPropertyValue(styleValue);
};

const isHidden = ({ classList }) => {
  return classList.contains("hidden") || classList.contains("none");
};

const addHighlight = (value) => {
  return "<span class='highlight'>" + value + "</span>";
};

const delay = ({ time, signal = null, data }) =>
  new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(data), time);
    if (!signal) return;
    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
    });
  });

export { selector, delay, isHidden, addHighlight, getStyle };
