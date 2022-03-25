import MainBanner from "./view/MainBanner.js";
import LocalStorage from "./util/LocalStorage.js";
import { viewModel } from "./viewModel/viewModel.js";
import { options } from "./common/options.js";

const mainBanner = new MainBanner(options.mainBanner);
const storage = new LocalStorage(options.localStorage);

viewModel.init({
  localStorage: storage,
  viewOptions: options.view,
  viewModelOptions: options.viewModel,
});

mainBanner.init();
