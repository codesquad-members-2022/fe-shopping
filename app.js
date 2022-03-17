import setCarouselEvent from "./public/src/controller/carouselEvent.js";
import setSearchBoxEvent from "./public/src/controller/searchBoxEvent.js";
import { fetchData } from "./public/src/controller/util.js";
import renderCarousel from "./public/src/render/carousel.js";

const searchBoxNode = document.querySelector(".search-box");
setSearchBoxEvent(searchBoxNode);
const carouselData = await fetchData("./carouselData.json");
renderCarousel(document.querySelector(".main"), carouselData);
const carouselImgNode = document.querySelector(".item__img");
const carouselNavBarNode = document.querySelector(".carousel__snb");
setCarouselEvent(carouselData, carouselImgNode, carouselNavBarNode);
