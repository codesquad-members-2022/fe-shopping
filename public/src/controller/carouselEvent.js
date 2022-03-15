import { debounce } from "./util.js";

const setCarouselEvent = (carouselNode, carouselNavBarNode) => {
  setCarouselNavBarEvent(carouselNavBarNode);
};

const setCarouselNavBarEvent = (carouselNavBarNode) => {
  carouselNavBarNode.addEventListener(
    "mousemove",
    debounce((e) => {
      if (e.target.tagName === "IMG") {
        changeBorder(e.target.parentNode.parentNode, e.target.parentNode);
      }
    }),
    1000
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
export default setCarouselEvent;
