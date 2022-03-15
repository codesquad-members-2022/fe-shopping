import { debounce } from "./util.js";

const setCarouselEvent = (carouselData, carouselImgNode, carouselNavBarNode) => {
  const timerId = setInterval(() => setCarouselTimeEvent(carouselData, carouselImgNode, carouselNavBarNode), 2000);
  setCarouselNavBarEvent(carouselData, carouselImgNode, carouselNavBarNode, timerId);
};

const setCarouselTimeEvent = (carouselData, carouselImgNode, carouselNavBarNode) => {
  const siblings = carouselNavBarNode.children;
  let index;
  for (index = 0; index < siblings.length; index += 1) {
    if (siblings[index].classList.contains("snb__selected")) break;
  }
  changeImg(carouselData, carouselImgNode, (index + 1) % siblings.length);
  changeBorder(carouselNavBarNode, siblings[(index + 1) % siblings.length]);
};

const setCarouselNavBarEvent = (carouselData, carouselImgNode, carouselNavBarNode, timerId) => {
  carouselNavBarNode.addEventListener(
    "mouseover",
    debounce((e) => {
      clearInterval(timerId);
      if (e.target.tagName === "IMG") {
        const targetNode = e.target.parentNode;
        const siblings = targetNode.parentNode.children;

        for (let index = 0; index < siblings.length; index += 1) {
          if (siblings[index] === targetNode) {
            changeImg(carouselData, carouselImgNode, index);
            break;
          }
        }
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

export default setCarouselEvent;
