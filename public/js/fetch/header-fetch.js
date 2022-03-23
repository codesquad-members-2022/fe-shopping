export function fetchHeaderData() {
  fetch('http://localhost:3000/header/data')
    .then((res) => res.json())
    .then((json) => parseHeaderImg(json));
}

function parseHeaderImg(data) {
  const headerLogoImg = document.querySelector('.header-logo__img');
  headerLogoImg.src = data.logo.src;
  headerLogoImg.alt = data.logo.alt;

  const headerMenuImg = document.querySelector('.header-gnb__img');
  headerMenuImg.src = data.menu.src;
  headerMenuImg.alt = data.menu.alt;
}
