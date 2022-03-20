import { debounce, fetchData } from "./util.js";

const setCarouselEvent = async (carouselImgNode, carouselNavBarNode) => {
  const carouselData = await fetchData("http://localhost:3000/carouselData");
  const timerId = setInterval(() => setCarouselTimeEvent(carouselData, carouselImgNode, carouselNavBarNode), 2000);
  setCarouselNavBarEvent(carouselData, carouselImgNode, carouselNavBarNode, timerId);
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

export default setCarouselEvent;
