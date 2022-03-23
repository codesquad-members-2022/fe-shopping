import searchBoxModel from "../model/searchBoxModel.js";
import { $ } from "../util/util.js";

const renderSearchBox = () => {
  searchBoxModel.render();
  searchBoxModel.setEvent($(".search-box"));
};

export { renderSearchBox };
