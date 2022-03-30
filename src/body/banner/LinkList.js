import { selector, toggleClass } from '../../utils/utils.js';

const BANNER_LINKLIST = 'banner-linklist';
const BANNER_LINK = 'banner-link';
const SELECTED = 'is-selected';

export class LinkList {
  constructor() {
    this.$bannerLinkList = selector(`.${BANNER_LINKLIST}`);
  }

  update(tabNum) {
    const $prevLink = selector(`.${SELECTED}`, this.$bannerLinkList);
    const $curLink = this.$bannerLinkList.children[tabNum];

    toggleClass(SELECTED, $prevLink);
    toggleClass(SELECTED, $curLink);
  }
}
