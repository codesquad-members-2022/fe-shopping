const selector = (selector, target = document) =>
  target.querySelector(selector);

const delay = ({ time, signal, data }) =>
  new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(data), time);
    signal.addEventListener("abort", () => {
      clearTimeout(timeout);
    });
  });

export { selector, delay };
