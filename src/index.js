import { renderHeader } from "./render.js";
import { initSelectCategoryEvent } from "./selectCategoryController.js";
import { SearchController } from "./searchController.js";
import { StorageManager } from "./storageManager.js";

function init() {
    renderHeader()
    initSelectCategoryEvent()

    const historyManager = new StorageManager('history')
    const searchController = new SearchController(historyManager)
    searchController.initSearchController()
}

init();