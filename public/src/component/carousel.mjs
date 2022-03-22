import { debounce } from "../util/util.js";
import Component from "./component.mjs";

const FIRST_INDEX = 0;

class Carousel extends Component {
  constructor(parentNode, carouselData) {
    super(parentNode);
    this.carouselData = carouselData;
  }

  template() {
    return /* html */ `
      <div class="main__carousel">
        <ul class="carousel__container"></ul>
        <ul class="carousel__snb"></nav>
      </div>`;
  }

  init() {
    document.querySelector(".carousel__container").innerHTML += getCarouselItem(
      this.carouselData.carouselData[FIRST_INDEX].imgData,
      this.carouselData.carouselData[FIRST_INDEX].altData
    );

    this.carouselData.carouselData.forEach((data) => {
      document.querySelector(".carousel__snb").innerHTML += getSnbItem(data.navData, data.altData);
    });
    document.querySelector(".carousel__snb").firstElementChild.classList.remove("snb__item");
    document.querySelector(".carousel__snb").firstElementChild.classList.add("snb__selected");
  }

  setEvent(carouselImgNode, carouselNavBarNode) {
    const timerId = setInterval(() => setCarouselTimeEvent(this.carouselData, carouselImgNode, carouselNavBarNode), 2000);
    setCarouselNavBarEvent(this.carouselData, carouselImgNode, carouselNavBarNode, timerId);
  }
}

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

const setCarouselTimeEvent = (carouselData, carouselImgNode, carouselNavBarNode) => {
  const siblings = carouselNavBarNode.children;
  const siblingIndex = [...siblings].findIndex((sibling) => sibling.classList.contains("snb__selected"));
  changeImg(carouselData, carouselImgNode, (siblingIndex + 1) % siblings.length);
  changeBorder(carouselNavBarNode, siblings[(siblingIndex + 1) % siblings.length]);
};

const setCarouselNavBarEvent = (carouselData, carouselImgNode, carouselNavBarNode, timerId) => {
  carouselNavBarNode.addEventListener(
    "mouseover",
    debounce((e) => {
      clearInterval(timerId);
      if (e.target.tagName === "IMG") {
        const targetNode = e.target.parentNode;
        const siblings = targetNode.parentNode.children;

        [...siblings].find((sibling, siblingIndex) => {
          if (sibling === targetNode) {
            changeImg(carouselData, carouselImgNode, siblingIndex);
          }
        });

        changeBorder(targetNode.parentNode, targetNode);
      }
    }, 500)
  );
};

const changeBorder = (parentNode, targetNode) => {
  [...parentNode.children].forEach((node) => {
    if (node.classList.contains("snb__selected")) {
      node.classList.remove("snb__selected");
      node.classList.add("snb__item");
    }
  });
  targetNode.classList.remove("snb__item");
  targetNode.classList.add("snb__selected");
};

const changeImg = (carouselData, carouselImgNode, index) => {
  carouselImgNode.src = carouselData.carouselData[index].imgData;
};

export default Carousel;
