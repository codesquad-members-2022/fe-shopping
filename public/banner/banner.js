import BannerStore from "./banner-store.js";
import BannerView from "./banner-view.js";

export default class Banner {
    constructor(bannerImgs, bannerMenu) {
        this.view = new BannerView(bannerImgs, bannerMenu);
        this.store = new BannerStore();
    }

    async initBanner() {
        await this.store.getBannerDataFromServer();

        const bannerData = this.store.getBannerData();
        const bannerTitleData = this.store.getBannerTitleData();
        if (!bannerData || !bannerTitleData) {
            console.error("There is no banner data");
            return;
        }

        this.renderBanner(bannerData, bannerTitleData);
    }

    renderBanner(bannerData, bannerTitleData) {
        this.view.renderImgs(bannerData);
        this.view.renderMenu(bannerTitleData);
    }
}
