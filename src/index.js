import { renderHeader } from "./headerRender.js";
import { renderBanner } from "./renderBanner.js";
import { selectCategoryController } from "./selectCategoryController.js";
import { SearchController } from "./searchController.js";
import { StorageManager } from "./storageManager.js";
import { BannerController } from "./bannerController.js";

function init() {
    renderHeader()
    selectCategoryController('init')

    const historyManager = new StorageManager('history')
    const searchController = new SearchController(historyManager)
    searchController.initSearchController()

    renderBanner()
    const bannerController = new BannerController()
    bannerController.initBannerController()
}

init();