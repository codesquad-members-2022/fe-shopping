export const addClickEventToElement = (elementName, func) => {
  const element = document.querySelector(elementName);

  element.addEventListener("click", func);
};

export const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
