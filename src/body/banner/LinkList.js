import { selector, toggleClass } from '../../utils/utils.js';
import { bannerStore } from './bannerStore.js';

const BANNER_LINKLIST = 'banner-linklist';
const BANNER_LINK = 'banner-link';
const SELECTED = 'is-selected';

export class LinkList {
  constructor() {
    this.$bannerLinkList = selector(`.${BANNER_LINKLIST}`);
    this.$bannerLinkListWrapper = this.$bannerLinkList.parentNode;
    this.init();
  }

  init() {
    const defaultInterval = 2000;
    const longInterval = 5000;
    this.$bannerLinkListWrapper.addEventListener('mouseover', () => {
      bannerStore.setCarouselInterval(longInterval);
    });
    this.$bannerLinkListWrapper.addEventListener('mouseleave', () => {
      bannerStore.setCarouselInterval(defaultInterval);
    });
  }

  update(tabNum) {
    const $prevLink = selector(`.${SELECTED}`, this.$bannerLinkList);
    const $curLink = this.$bannerLinkList.children[tabNum];

    toggleClass(SELECTED, $prevLink);
    toggleClass(SELECTED, $curLink);
  }
}
