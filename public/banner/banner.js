import BannerStore from "./banner-store.js";
import BannerView from "./banner-view.js";
import { initDebouncing, delay } from "../utils.js";

export default class Banner {
    constructor(bannerBlock, bannerMenu) {
        this.view = new BannerView(bannerBlock, bannerMenu);
        this.store = new BannerStore();
        this.mouseoverDebouncing = initDebouncing({ delay: 50 });

        this.setEventHandler();
    }

    setEventHandler() {
        this.view.bannerMenuHoverEventHandler =
            this.bannerMenuHoverEventHandler.bind(this);

        this.view.initEvent();
        this.autoChangeBanner();
    }

    bannerMenuHoverEventHandler({ target }) {
        if (target.classList.contains("banner__menu--item")) {
            const originIdx = this.store.getBannerIdx();
            const nextIdx = target.dataset.idx;

            if (originIdx === nextIdx) return;

            this.mouseoverDebouncing().then(() =>
                this.changeCurBanner(originIdx, nextIdx)
            );
        }
    }

    changeCurBanner(originIdx, nextIdx) {
        this.store.setBannerIdx(nextIdx);

        const bannerImg = this.store.getCurBannerImg();
        this.view.renderImg(bannerImg);
        this.view.changeBorder(originIdx, nextIdx);
    }

    autoChangeBanner() {
        delay({ delay: 1500 }).then(() => {
            const bannerCount = this.store.getBannerCount();

            const originIdx = this.store.getBannerIdx();
            const nextIdx = originIdx + 1 === bannerCount ? 0 : originIdx + 1;

            this.changeCurBanner(originIdx, nextIdx);
            this.autoChangeBanner();
        });
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
