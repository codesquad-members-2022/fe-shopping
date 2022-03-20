
import { bannerBigImages, bannerSmallImages } from "./data.js";

const $body = document.body

function renderBanner() {
    renderBannerContainer()
    const $bannerContainer = document.querySelector('.banner-container')
    renderBigImgContainer($bannerContainer)
    renderSmallImgContainer($bannerContainer)

    const $bigImgContainer = document.querySelector('.banner__bigImg-container')
    const $smallImgContainer = document.querySelector('.banner__smallImg-container')
    renderBannerSmallImg($smallImgContainer, bannerSmallImages)
    renderBannerBigImg($bigImgContainer, 0)
}

function renderBannerContainer() {
    const bannerContainer = document.createElement('div')
    bannerContainer.classList.add('banner-container')
    $body.appendChild(bannerContainer)
}

function renderBigImgContainer(parentElem) {
    const bigImgContainer = document.createElement('div')
    bigImgContainer.classList.add('banner__bigImg-container')
    parentElem.appendChild(bigImgContainer)
}

function renderSmallImgContainer(parentElem) {
    const smallImgContainer = document.createElement('ul')
    smallImgContainer.classList.add('banner__smallImg-container')
    parentElem.appendChild(smallImgContainer)
}

function renderBannerBigImg(target, urlIndex) {
    const url = bannerBigImages[urlIndex]
    const template = `<a>
                        <img src="${url}">
                      </a>`
    target.innerHTML = template
}

function renderBannerSmallImg(target, urlList) {
    const template = urlList.reduce((acc, cur, idx) => {
        return acc + `<li>
               <a><img data-index="${idx}" src="${cur}"></a>
            </li>`}, ``)
    target.innerHTML = template
}

export { renderBanner, renderBannerBigImg, renderBannerSmallImg }