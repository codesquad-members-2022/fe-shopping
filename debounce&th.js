import { $ } from "./src/js/utils/utils";
$input.addEventListner("input", (event) => {
  const userInpt = $input.value;
  fetch(url + userInpt).then(template(d));
  debounce(callback, wait);
});

function debounce(callback, wait) {
  let timer;
  return function (event) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback();
    }, wait);
  };
}

// 자바스크립트는 함수를 리턴하고, 리턴하는 함수가 클로저를 형성한다.
// 클로저는 함수와 함수가 선언된 어휘적 환경의 조합이다.
// 이 환경은 클로저가 생성된 시점의 유효 범위 내에 있는 모든 지역 변수로 구성된다.

function Throttle(callback, wait) {
  let waiting = true;

  return function () {
    if (waiting) {
      callback();
      waiting = false;
      setTimeout(() => {
        waiting = true;
      }, wait);
    }
  };
}
