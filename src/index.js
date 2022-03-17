import { renderHeader } from "./render.js";
import { initSelectCategoryEvent } from "./selectCategoryController.js";
import { SearchController } from "./searchController.js";



function init() {
    renderHeader()
    initSelectCategoryEvent()

}


init();
const searchController = new SearchController()
searchController.initSearchController()