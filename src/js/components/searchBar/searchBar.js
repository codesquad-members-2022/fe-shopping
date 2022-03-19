//input 값이 들어오면 연관검색어 노드를 display 해주고
//값이 없으면 최근 검색어 노드를 display 나머진 display:none;
import {$, removeClass, addClass }  from '../../utils/utils.js';
import { RenderHistoryBar } from "./historyBar.js";
import { AutoComplete } from "./autoComplete.js";
import { latestSearchBar } from "./latestSearch.js";
//연관 기능 검색
class SearchBar {
  constructor() {
    this.apiURL = 'http://localhost:3000/items';
  }

  init() {
    let historyBar = new RenderHistoryBar();
    let autocomplt = new AutoComplete();
    let latestBar = new latestSearchBar();
    latestBar.init();
    autocomplt.init();
    historyBar.init();
  }
}

export { SearchBar };