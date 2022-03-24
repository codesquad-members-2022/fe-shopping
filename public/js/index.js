import { $ } from "./util/util.js";
import { sliderData } from "../data/data.js";
import MainBanner from "./view/MainBanner.js";
import LocalStorage from "./model/LocalStorage.js";
import SearchView from "./view/SearchView.js";

const mainBanner = new MainBanner({
  data: sliderData,
  sec: 1.7,
  slideUlElement: $(".carousel-items"),
  imgAreaElement: $(".carousel-img-area"),
});

const args = {
  searchFormArea: $(".search-form-area"),
  datasetName: "idx",
  localStorage: new LocalStorage({ dataSizeLimit: 10 }),
};

const searchView = new SearchView(args);

searchView.init();
mainBanner.init();
