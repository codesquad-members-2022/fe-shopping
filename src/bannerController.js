import { renderBannerBigImg } from "./renderBanner.js";

export class BannerController {
    constructor() {
        this.timer = null
        this.$smallImgContainer = document.querySelector('.banner__smallImg-container')
        this.$bigImgContainer = document.querySelector('.banner__bigImg-container')
        this.smallImgElements = [...this.$smallImgContainer.children]
        this.bigImgElements = [...this.$bigImgContainer.children]
        this.bannerIndex = 0
        this.bannerMaxIndex = this.smallImgElements.length
        this.intervalTime = 2000
    }

    initBannerController() {
        this.changeBanner()
        this.setIntervalEvent()
        this.setSmallContainerEvent()
    }

    setSmallContainerEvent() {
        this.$smallImgContainer.addEventListener('mouseover', (e) => this.smallContainerMouseoverHandler(e))
        this.$smallImgContainer.addEventListener('mouseleave', (e) => this.smallContainerMouseleaveHandler(e))
    }

    setIntervalEvent() {
        this.timer = setInterval(this.autoChangeBanner.bind(this), this.intervalTime)
    }

    smallContainerMouseleaveHandler(e) {
        this.setIntervalEvent()
    }

    smallContainerMouseoverHandler(e) {
        if(e.target.tagName !== 'LI') return

        const curIndex = Number(e.target.dataset.index)
        this.bannerIndex = curIndex

        this.clearTimer()
        this.changeBanner()
    }

    changeBanner() {
        this.toggleSmallImgBlueBorder(this.smallImgElements[this.bannerIndex])
        this.toggleBigImg(this.bannerIndex)
    }

    autoChangeBanner() {
        this.bannerIndex += 1
        if(this.bannerIndex === this.bannerMaxIndex) this.bannerIndex = 0

        const targetElement = this.smallImgElements[this.bannerIndex]
        this.toggleSmallImgBlueBorder(targetElement)
        this.toggleBigImg(this.bannerIndex)
    }

    clearTimer() {
        if(this.timer) return clearInterval(this.timer)
    }

    toggleBigImg(index) {
        this.hiddenAllBigImg()
        this.unHiddenBigImg(index)
    }

    unHiddenBigImg(index) {
        const targetElement = this.bigImgElements[index]
        this.removeVisibilityHidden(targetElement)
    }

    hiddenAllBigImg() {
        this.bigImgElements.forEach((element) => this.addVisibilityHidden(element))
    }

    toggleSmallImgBlueBorder(target) {
        this.removeSmallImgBlueBorder()
        this.addSmallImgBlueBorder(target)
    }

    addSmallImgBlueBorder(target) {
        target.classList.add('banner__smallImg-blueBorder')
    }

    removeSmallImgBlueBorder() {
        this.smallImgElements.forEach(element => {
            if(element.classList.contains('banner__smallImg-blueBorder')){
                element.classList.remove('banner__smallImg-blueBorder')
            }
        })
    }

    addVisibilityHidden(target) {
        target.classList.add('visibility-hidden')
    }

    removeVisibilityHidden(target) {
        target.classList.remove('visibility-hidden')
    }
}