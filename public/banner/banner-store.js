export default class BannerStore {
    async getBannerDataFromServer() {
        try {
            const response = await fetch("../banner");
            if (!response.ok) {
                const error = response.status;
                throw Error(error);
            }
            this.bannerData = await response.json();
        } catch (error) {
            console.error(error);
            return;
        }
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
