import MainBanner from "./view/MainBanner.js";
import LocalStorage from "./util/LocalStorage.js";
import { viewModel } from "./viewModel/viewModel.js";
import { options } from "./common/options.js";

const mainBanner = new MainBanner(options.mainBanner);

/* const options = {
  searchFormArea: $(".search-form-area"),
  datasetName: "idx",
  localStorage: new LocalStorage({
    dataSizeLimit: 10,
    options: {
      recentSearchKeyName: "recent-search",
      recentSearchValueName: "recentSearchWord",
    },
  }),
};
const searchView = new SearchView(options);
searchView.init(); */

////////////////////////////////////////////////////////

const storage = new LocalStorage(options.localStorage);

viewModel.init({
  localStorage: storage,
  viewOptions: options.view,
  viewModelOptions: options.viewModel,
});

mainBanner.init();
