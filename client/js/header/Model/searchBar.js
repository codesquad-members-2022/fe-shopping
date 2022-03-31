import { getJsonData } from "../../util.js";

export const SearchBar = function () {
  this.menuInfo = {
    eventListenerClassName: "search-bar__menu",
    dropBoxClassName: "search-bar__view-menu",
    parentNodeClassName: "search-bar",
    dropBoxCurrentState: null,
    dropBox: null,
  };
  this.contentInfo = {
    eventListenerClassName: "search-bar__search-area",
    dropBoxClassName: "search-bar__view-content",
    parentNodeClassName: "search-bar",
    dropBoxCurrentState: null,
    dropBox: null,
  };
};

SearchBar.prototype = {
  constructor: SearchBar,

  getMenu() {
    return getJsonData("/header/searchBarMenu");
  },
  getContent(keyWord) {
    return fetch(
      `https://completion.amazon.com/api/2017/suggestions?mid=ATVPDKIKX0DER&alias=aps&prefix=${keyWord}`
    )
      .then((res) => res.json())
      .then((data) => data.suggestions.map((v) => v.value));
  },
};
