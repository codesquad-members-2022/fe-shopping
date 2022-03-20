import { ToggleView } from "./AbstractToggleView.js";
import {
  SearchInputToggle,
  SearchMenuToggle,
} from "../Components/headerToggle.js";
import * as domUtil from "/util/domutil.js";
import * as fetchUtil from "../util/fetchutil.js";

function SearchInputToggleView() {
  ToggleView.apply(this, arguments);
  this.emptyHistoryContents = ["검색 결과 없음"];

  this.searchHistoryData = new Set(
    JSON.parse(localStorage.getItem("localSearchHistory"))
  );

  this.keyUpDownCount = { listLength: null, upDownCount: 0 };
}

function SearchMenuToggleView() {
  ToggleView.apply(this, arguments);
}

SearchInputToggleView.prototype = Object.create(ToggleView.prototype);
SearchMenuToggleView.prototype = Object.create(ToggleView.prototype);

SearchMenuToggleView.prototype.renderToggle = async function (inputValue) {
  const searchMenuToggleData = await fetchUtil.fetchData("search/menu/toggle");
  this.generateMenuContents(searchMenuToggleData);
};

SearchMenuToggleView.prototype.generateMenuContents = function (data) {
  const prevMenuClassName = ".search--menu--ul";
  if (this.removePrevView(prevMenuClassName)) {
    return;
  }

  const searchZoneToggle = new SearchMenuToggle(data);
  this.parentDom.appendChild(searchZoneToggle.dom);
};

SearchMenuToggleView.prototype.clickedOutMenu = function (className) {
  const menuClass = [
    "search--menu--ul",
    "search--menu--li",
    "header__main--inputMenuButton",
    "header__main--inputMenu",
  ];
  if (menuClass.includes(className)) {
    return;
  }

  this.removePrevView(".search--menu--ul");
};

SearchInputToggleView.prototype.renderAutoComplete = async function (
  inputValue
) {
  if (inputValue === "") {
    this.renderHistory();
    return;
  }

  const autocompleteToggleData = await fetchUtil.fetchData(
    `search/${inputValue}`
  );
  this.generateSearchContents(autocompleteToggleData);
};

SearchInputToggleView.prototype.renderHistory = function () {
  // 현재 검증이 없음 만약 문제생기면 의심 필요
  const searchHistory = this.checkHistory();

  this.generateSearchContents(searchHistory.reverse());
};

SearchInputToggleView.prototype.removeHistory = function () {
  this.searchHistoryData.clear();
  localStorage.clear();
  this.renderHistory();
};

SearchInputToggleView.prototype.checkHistory = function () {
  if (this.searchHistoryData.size <= 0) {
    return this.emptyHistoryContents;
  }

  return [...this.searchHistoryData];
};

SearchInputToggleView.prototype.isEmptyArr = function (arr) {
  if (!Array.isArray(arr) || arr.length <= 0) {
    return true;
  }
};

SearchInputToggleView.prototype.generateSearchContents = function (data) {
  if (this.isEmptyArr(data)) {
    return;
  }

  const prevClassName = ".search--toggle--ul";
  this.removePrevView(prevClassName);

  const searchZoneToggle = new SearchInputToggle(data);
  this.addReomoveHisoryEvent(searchZoneToggle.dom); // 이부분이 마음에 안들긴함
  this.parentDom.appendChild(searchZoneToggle.dom);
};

SearchInputToggleView.prototype.hasHistoryZone = function () {
  const childDomClassName = ".search--toggle--ul";
  if (domUtil.target$(this.parentDom, childDomClassName)) {
    return true; // 이부분 에러면 querySelector 결과가 undefined라 에러임
  }

  return false;
};

SearchInputToggleView.prototype.saveSearchingData = function (event) {
  const {
    keyCode,
    target: { value },
  } = event;

  if (this.isNotEnter(keyCode, event) || value === "") {
    return;
  }

  this.checkHistorySize();
  this.Save2LocalStorage(value);
};

SearchInputToggleView.prototype.isNotEnter = function (keyCode, event) {
  if (keyCode !== 13) {
    return true;
  } else {
    event.preventDefault();
  }
};

SearchInputToggleView.prototype.checkHistorySize = function () {
  const localHistoryArr = [...this.searchHistoryData];
  const MAX_SIZE = 10;

  if (this.searchHistoryData.size >= MAX_SIZE) {
    this.searchHistoryData.delete(localHistoryArr[0]);
  }
};

SearchInputToggleView.prototype.addReomoveHisoryEvent = function (target) {
  target.addEventListener("click", () => {
    this.removeHistory();
  });
};

SearchInputToggleView.prototype.Save2LocalStorage = function (data) {
  this.searchHistoryData.add(data);
  const reverseData = Array.from(this.searchHistoryData).reverse();
  localStorage.setItem("localSearchHistory", JSON.stringify(reverseData));
};

SearchInputToggleView.prototype.hilightSearchList = function (keyCode) {
  let { upDownCount, listLength } = this.keyUpDownCount;
  const auotSearchList = domUtil.target$All(
    this.parentDom,
    ".search--toggle--li"
  );
  listLength = auotSearchList.length;
  // console.log(upDownCount, listLength);

  const listStyle = auotSearchList[upDownCount].style;
  listStyle.color = "black";

  this.checkUpOrDown(keyCode);
  listStyle.color = "#4285f4";
  // console.log(upDownCount, listLength);
};

SearchInputToggleView.prototype.checkUpOrDown = function (keyCode) {
  let { listLength, upDownCount } = this.keyUpDownCount;
  const KEY_UP = 38;
  const KEY_DOWN = 40;

  if (keyCode === KEY_UP) {
    this.keyUpDownCount.upDownCount--;
    if (upDownCount < 0) {
      this.keyUpDownCount.upDownCount = listLength;
    }
  } else if (keyCode === KEY_DOWN) {
    this.keyUpDownCount.upDownCount++;
    console.log(this.keyUpDownCount.upDownCount);
    if (upDownCount < listLength) {
      this.keyUpDownCount.upDownCount = 0;
    }
  }
};

export { SearchInputToggleView, SearchMenuToggleView };
