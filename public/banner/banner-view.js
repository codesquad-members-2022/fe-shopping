export default class BannerView {
    constructor(bannerBlock, bannerMenu) {
        this.bannerBlock = bannerBlock;
        this.bannerMenu = bannerMenu;
    }

    initEvent() {
        this.bannerMenu.addEventListener(
            "mouseover",
            this.bannerMenuHoverEventHandler
        );
    }

    renderImg(bannerImgData) {
        this.bannerBlock.style.backgroundImage = `url(${bannerImgData})`;
    }

    getBannerMenuItem(bannerData, idx) {
        return `<p class="banner__menu--item 
                    l--flex 
                    l--vertical-center"
                    ${idx === 0 ? "id=focus--border" : ""}
                    data-idx="${idx}"
                >
                    ${bannerData}
                </p>`;
    }

    getBannerMenu(bannerData) {
        const bannerMenu = bannerData.reduce(
            (acc, cur, idx) => acc + this.getBannerMenuItem(cur, idx),
            ""
        );
        return bannerMenu;
    }

    renderMenu(bannerData) {
        const bannerMenu = this.getBannerMenu(bannerData);
        this.bannerMenu.innerHTML = bannerMenu;
    }

    changeBorder(originIdx, curIdx) {
        const bannerMenuList = this.bannerMenu.querySelectorAll(
            ".banner__menu--item"
        );

        bannerMenuList[originIdx].id = "";
        bannerMenuList[curIdx].id = "focus--border";
    }
}
