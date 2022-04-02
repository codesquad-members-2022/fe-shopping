export default class BannerStore {
    constructor() {
        this.curIdx = 0;
        this.bannerCount = 0;
    }

    setBannerIdx(idx) {
        this.curIdx = Number(idx);
    }

    getBannerIdx() {
        return this.curIdx;
    }

    setBannerData(bannerData) {
        this.bannerData = bannerData;
        this.bannerCount = bannerData.length;
    }

    getBannerCount() {
        return this.bannerCount;
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

    getCurBannerImg() {
        return this.bannerData[this.curIdx].img;
    }
}
