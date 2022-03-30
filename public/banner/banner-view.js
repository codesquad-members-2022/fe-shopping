export default class BannerView {
    constructor(bannerImgs, bannerMenu) {
        this.bannerImgs = bannerImgs;
        this.bannerMenu = bannerMenu;
    }

    getBannerImg(bannerData) {
        return `<li class="banner__img-container">
                    <img 
                        class="banner__img" 
                        src="${bannerData.img}" 
                        alt="${bannerData.title}" 
                    />
                </li>`;
    }

    getBannerImgs(bannerData) {
        const bannerImgs = bannerData.reduce(
            (acc, cur) => acc + this.getBannerImg(cur),
            ""
        );
        return bannerImgs;
    }

    renderImgs(bannerData) {
        const bannerImgs = this.getBannerImgs(bannerData);
        this.bannerImgs.innerHTML = bannerImgs;
    }

    getBannerMenuItem(bannerData) {
        return `<p class="banner__menu--item 
                    l--flex 
                    l--vertical-center"
                >
                    ${bannerData}
                </p>`;
    }

    getBannerMenu(bannerData) {
        const bannerMenu = bannerData.reduce(
            (acc, cur) => acc + this.getBannerMenuItem(cur),
            ""
        );
        return bannerMenu;
    }

    renderMenu(bannerData) {
        const bannerMenu = this.getBannerMenu(bannerData);
        this.bannerMenu.innerHTML = bannerMenu;
    }
}
