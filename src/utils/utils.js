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

export function debounce(fn, interval) {
  let lastDebounceSymbol;

  return (...args) => {
    const symbol = Symbol();
    lastDebounceSymbol = symbol;
    setTimeout(() => {
      if (lastDebounceSymbol !== symbol) return;
      fn(...args);
    }, interval);
  };
}

//전역 변수를 사용하는 가장 간단한 디바운스
// let lastSymbol;
// function debounce2(fn, interval) {
//   const symbol = Symbol();
//   lastSymbol = symbol;
//   setTimeout(() => {
//     if (lastSymbol !== symbol) return;
//     fn();
//   }, interval);
// }

// delay 함수처럼 .then으로 이어서 사용하고 싶은 경우
// let lastSymbol;
// function debounce3(interval) {
//   const symbol = Symbol();
//   lastSymbol = symbol;
//   setTimeout(() => {
//     if (lastSymbol !== symbol) return;
//     resolve();
//   }, interval);
// }
