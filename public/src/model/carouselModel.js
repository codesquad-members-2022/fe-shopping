import Carousel from "../component/carousel.mjs";
import { $, fetchData } from "../util/util.js";

const carouselData = await fetchData("./carouselData.json");
const carouselModel = new Carousel($(".main"), carouselData);

export default carouselModel;
