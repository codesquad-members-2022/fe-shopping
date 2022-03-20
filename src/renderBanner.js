
function renderBanner() {
    renderBannerContainer()
}

function renderBannerContainer() {
    const $bannerContainer = document.createElement('div')
    $bannerContainer.classList.add('.banner-container')
    document.body.appendChild($bannerContainer)
}

function renderBannerBigImg(parentElem) {
    const $bigImgContainer = document.createElement('div')
    $bigImgContainer.classList.add('.banner__bigImg-container')
    parentElem.appendChild($bigImgContainer)
}

function renderBannerSmallImg(parentElem) {

}