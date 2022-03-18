import { $ } from "./util/util.js";
import { sliderData } from "../data/data.js";
import MainBanner from "./component/MainBanner.js";
import SearchForm from "./component/SearchForm.js";

const mainBanner = new MainBanner({
  data: sliderData,
  sec: 1.7,
  slideUlElement: $(".carousel-items"),
  imgAreaElement: $(".carousel-img-area"),
});

const searchForm = new SearchForm({ searchFormArea: $(".search-form-area") });
searchForm.init();

mainBanner.init();
