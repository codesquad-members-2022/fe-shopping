import BannerStore from "./banner-store.js";
import BannerView from "./banner-view.js";

export default class Banner {
    constructor(bannerBlock, bannerMenu) {
        this.view = new BannerView(bannerBlock, bannerMenu);
        this.store = new BannerStore();

        this.setEventHandler();
    }

    setEventHandler() {
        this.view.bannerMenuHoverEventHandler =
            this.bannerMenuHoverEventHandler.bind(this);

        this.view.initEvent();
    }

    bannerMenuHoverEventHandler({ target }) {
        if (target.classList.contains("banner__menu--item")) {
            const originIdx = this.store.getBannerIdx();
            const curIdx = target.dataset.idx;

            if (originIdx === curIdx) return;

            this.store.setBannerIdx(curIdx);
            const bannerImg = this.store.getCurBannerImg();
            this.view.renderImg(bannerImg);
        }
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
        const curBannerImg = this.store.getCurBannerImg();
        const bannerTitleData = this.store.getBannerTitleData();

        if (!curBannerImg) {
            console.error("There is no banner data");
            return;
        }

        this.view.renderImg(curBannerImg);
        this.view.renderMenu(bannerTitleData);
    }
}
