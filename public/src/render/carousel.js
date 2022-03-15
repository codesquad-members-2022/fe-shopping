const renderCarousel = (parentNode, carouselData) => {
  parentNode.innerHTML = getMainCarouselTemplate();
  carouselData.carouselImg.forEach(([url, alt]) => {
    document.querySelector(".carousel__container").innerHTML += getCarouselItem(url, alt);
  });

  carouselData.navImg.forEach((url, ind) => {
    document.querySelector(".carousel__snb").innerHTML += getSnbItem(url, carouselData.carouselImg[ind][1]);
  });
};

const getMainCarouselTemplate = () => {
  return /* html */ `
  <div class="main__carousel">
    <ul class="carousel__container"></ul>
    <ul class="carousel__snb"></nav>
  </div>`;
};

const getCarouselItem = (url, alt) => {
  return /* html */ `
  <li class="carousel__item">
    <img
      class="item__img"
      src="${url}"
      alt="${alt}"
    />
  </li>`;
};

const getSnbItem = (url, alt) => {
  return /* html */ `
    <li class="snb__item">
      <img src="${url}" alt="${alt}" />
    </li>
  `;
};

export default renderCarousel;
