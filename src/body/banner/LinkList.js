import { selector } from '../../utils/utils.js';

const BANNER_LINKLIST = 'banner-linklist';
const BANNER_LINK = 'banner-link';

export class Linklist {
  constructor() {
    this.$bannerLinkList = selector(`.${BANNER_LINKLIST}`);
  }
}
