import setCarouselEvent from "./public/src/controller/carouselEvent.js";
import { fetchData } from "./public/src/controller/util.js";
import renderCarousel from "./public/src/render/carousel.js";

const carouselData = await fetchData("carouselData");
renderCarousel(document.querySelector(".main"), carouselData);
const carouselImgNode = document.querySelector(".item__img");
const carouselNavBarNode = document.querySelector(".carousel__snb");
setCarouselEvent(carouselData, carouselImgNode, carouselNavBarNode);
