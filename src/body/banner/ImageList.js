import { selector, toggleClass } from '../../utils/utils.js';

const BANNER_IMAGELIST = 'banner-imagelist';
const SELECTED = 'is-selected';

export class ImageList {
  constructor() {
    this.$bannerImageList = selector(`.${BANNER_IMAGELIST}`);
  }

  update(tabNum) {
    const $prevImage = selector(`.${SELECTED}`, this.$bannerImageList);
    const $curImage = this.$bannerImageList.children[tabNum];

    toggleClass(SELECTED, $prevImage);
    toggleClass(SELECTED, $curImage);
  }
}
