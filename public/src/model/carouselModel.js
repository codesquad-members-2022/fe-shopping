import Carousel from "../component/carousel.mjs";
import { fetchData } from "../util/util.js";

const carouselData = await fetchData("http://localhost:3000/carouselData");
const carouselModel = new Carousel(document.querySelector(".main"), carouselData);

export default carouselModel;
