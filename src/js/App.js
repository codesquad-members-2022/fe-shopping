//모든 js 파일을 로드해서 하나로 합치고 index.js로 보내준다
import { SearchBar } from "./components/searchBar/searchBar.js";
function init() {
  const searchBar = new SearchBar();
  searchBar.init();
}

export { init };