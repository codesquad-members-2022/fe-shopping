import SearchBox from "../component/searchBox.mjs";
import { fetchData } from "../util/util.js";

const searchCategoryData = await fetchData("http://localhost:3000/searchCategoryData");
const searchBoxModel = new SearchBox(
  document.querySelector(".header__contents").querySelector(".header__container"),
  searchCategoryData.categoryData,
  localStorage
);

export default searchBoxModel;
