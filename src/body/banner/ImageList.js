import { selector } from '../../utils/utils.js';

const BANNER_IMAGELIST = 'banner-imagelist';
const BANNER_IMAGE = 'banner-image';

export class ImageList {
  constructor() {
    this.$bannerImageList = selector(`.${BANNER_IMAGELIST}`);
  }
}
