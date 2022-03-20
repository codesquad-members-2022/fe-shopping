import setCarouselEvent from "./public/src/controller/carouselEvent.js";
import setSearchBoxEvent from "./public/src/controller/searchBoxEvent.js";
import renderCarousel from "./public/src/render/carousel.js";

const searchBoxNode = document.querySelector(".search-box");
setSearchBoxEvent(searchBoxNode);

await renderCarousel(document.querySelector(".main"));
const carouselImgNode = document.querySelector(".item__img");
const carouselNavBarNode = document.querySelector(".carousel__snb");
setCarouselEvent(carouselImgNode, carouselNavBarNode);
