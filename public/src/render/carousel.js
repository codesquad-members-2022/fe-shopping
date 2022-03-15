const FIRST_INDEX = 0;

const renderCarousel = (parentNode, dataObj) => {
  parentNode.innerHTML = getMainCarouselTemplate();
  document.querySelector(".carousel__container").innerHTML += getCarouselItem(
    dataObj.carouselData[FIRST_INDEX].imgData,
    dataObj.carouselData[FIRST_INDEX].altData
  );

  dataObj.carouselData.forEach((data) => {
    document.querySelector(".carousel__snb").innerHTML += getSnbItem(data.navData, data.altData);
  });
  document.querySelector(".carousel__snb").firstElementChild.classList.remove("snb__item");
  document.querySelector(".carousel__snb").firstElementChild.classList.add("snb__selected");
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
