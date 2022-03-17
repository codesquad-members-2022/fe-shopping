const encodedKeyword = window.location.search.split('?q=')[1];
const decodedKeyword = decodeURIComponent(encodedKeyword);

const randomInt = (Math.random() * 5 + 1) >> 0;

const $$p = document.querySelectorAll('.result');
const $$element = new Array(randomInt).fill().map((_, idx) => {
  const $h2 = document.createElement('h2');
  $h2.textContent = `${decodedKeyword}로 검색한 결과 ${idx + 1}`;
  return $h2;
});

document.body.append(...$$element);
