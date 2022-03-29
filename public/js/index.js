import MainBanner from "./view/MainBanner.js";
import LocalStorage from "./util/LocalStorage.js";
import { controller } from "./controller/controller.js";
import { options } from "./common/options.js";

const mainBanner = new MainBanner(options.mainBanner);
const storage = new LocalStorage(options.localStorage);

controller.init({
  localStorage: storage,
  viewOptions: options.view,
  options: options.controller,
});

mainBanner.init();
