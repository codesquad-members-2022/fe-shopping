import { $ } from "./util/util.js";
import { sliderData } from "../data/data.js";
import MainBanner from "./view/MainBanner.js";
// import SearchForm from "./view/SearchForm.js";
import SearchForm from "./component/SearchForm.js";
import LocalStorage from "./model/LocalStorage.js";

const mainBanner = new MainBanner({
  data: sliderData,
  sec: 1.7,
  slideUlElement: $(".carousel-items"),
  imgAreaElement: $(".carousel-img-area"),
});

// const searchForm = new SearchForm({
//   searchFormArea: $(".search-form-area"),
//   localStorageDataSize: 10,
//   recentSearchMsg: {
//     confirmMsg: `저장된 최근 검색어를 모두 삭제하시겠습니까?`,
//     completeMsg: `삭제 되었습니다.`,
//     cancelMsg: `취소 되었습니다.`,
//   },
// });

const searchForm = new SearchForm({
  searchFormArea: $(".search-form-area"),
  datasetName: "idx",
  localStorage: new LocalStorage(10),
});

searchForm.init();
mainBanner.init();
