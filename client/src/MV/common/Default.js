import * as domUtil from "../../util/domutil.js";
const defaultSearchState = {
  hilightIdx: -1,
  prevHilightIdx: null,
  autoCompleteData: [],
  MAX_SIZE: 10,
  toggleList: null,
  toggle: {
    liContents: [],
    ulClassName: "search--toggle--ul",
    liClassName: "search--toggle--li",
    dataSet: "inputToggle",
  },
};

const staticInputState = {
  toggleClassName: ".search--toggle--ul",
  toggleLiClassName: ".search--toggle--li",
  emptyContents: ["검색 결과 없음"],
  parentDom: domUtil.$(".header__main--inputWrapper"),
  inputDom: domUtil.$(".header__main--searchInput"),
};

const defaultMenuState = {
  liContents: null,
  current: null,
  toggleClassName: "search--menu--ul",
  toggleLiClassName: "search--menu--li",
};

const staticMenuState = {
  toggleClassName: ".search--menu--ul",
  toggleLiClassName: ".search--menu--li",
  emptyContents: "전체",
  parentDom: domUtil.$(".header__main--inputMenuButton"),
};

export {
  defaultSearchState,
  staticInputState,
  defaultMenuState,
  staticMenuState,
};
