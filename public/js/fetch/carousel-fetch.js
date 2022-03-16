export function fetchCarouselData() {
  fetch('http://localhost:3000/carousel/data')
    .then((res) => res.json())
    .then((json) => {
      parseCarouselImg(json.carousel);
      parseCarouselLnbImg(json.carouselLnb);
    });
}

function parseCarouselImg(data) {
  const carouselImg = document.querySelectorAll('.carousel-inner__img');
  carouselImg.forEach((e, i) => {
    e.src = data[i].src;
    e.alt = data[i].alt;
  });
}

function parseCarouselLnbImg(data) {
  const carouselLnbImg = document.querySelectorAll('.carousel-lnb__img');
  carouselLnbImg.forEach((e, i) => {
    e.src = data[i].src;
    e.alt = data[i].alt;
  });
}
