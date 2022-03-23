import SearchBox from "../component/searchBox.mjs";
import { $, fetchData } from "../util/util.js";

const searchCategoryData = await fetchData("./searchCategoryData.json");
const searchBoxModel = new SearchBox($(".header__contents").querySelector(".header__container"), searchCategoryData.categoryData, localStorage);

export default searchBoxModel;
