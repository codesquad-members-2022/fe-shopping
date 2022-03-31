export default class BannerStore {
    setBannerData(bannerData) {
        this.bannerData = bannerData;
    }

    getBannerData() {
        return this.bannerData;
    }

    getBannerImgsData() {
        return this.bannerData.map((it) => it.img);
    }

    getBannerTitleData() {
        return this.bannerData.map((it) => it.title);
    }
}
