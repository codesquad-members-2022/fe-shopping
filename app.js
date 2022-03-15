import setCarouselEvent from "./public/src/controller/carouselEvent.js";
import { fetchData } from "./public/src/controller/util.js";
import renderCarousel from "./public/src/render/carousel.js";

const carouselData = await fetchData("carouselData");
renderCarousel(document.querySelector(".main"), carouselData);
const carouselNode = document.querySelector(".carousel__container");
const carouselSNB = document.querySelector(".carousel__snb");
setCarouselEvent(carouselData, carouselNode, carouselSNB);
