import BannerStore from "./banner-store.js";
import BannerView from "./banner-view.js";

export default class Banner {
    constructor(bannerImgs, bannerMenu) {
        this.view = new BannerView(bannerImgs, bannerMenu);
        this.store = new BannerStore();
    }

    async initBanner() {
        const bannerData = await this.getBannerDataFromServer();
        this.store.setBannerData(bannerData);

        this.renderBanner();
    }

    async getBannerDataFromServer() {
        try {
            const response = await fetch("../banner");

            if (!response.ok) {
                const error = response.status;
                throw Error(error);
            }

            const bannerData = await response.json();
            return bannerData;
        } catch (error) {
            console.error(error);
            return;
        }
    }

    renderBanner() {
        const bannerData = this.store.getBannerData();
        const bannerTitleData = this.store.getBannerTitleData();

        if (!bannerData || !bannerTitleData) {
            console.error("There is no banner data");
            return;
        }

        this.view.renderImgs(bannerData);
        this.view.renderMenu(bannerTitleData);
    }
}
