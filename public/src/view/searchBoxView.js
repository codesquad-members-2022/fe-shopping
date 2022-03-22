import searchBoxModel from "../model/searchBoxModel.js";

const renderSearchBox = () => {
  searchBoxModel.render();
  searchBoxModel.setEvent(document.querySelector(".search-box"));
};

export { renderSearchBox };
