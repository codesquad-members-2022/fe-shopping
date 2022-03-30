import { selector } from '../../utils/utils.js';

const BANNER_LINKLIST = 'banner-linklist';
const BANNER_LINK = 'banner-link';

export class LinkList {
  constructor() {
    this.$bannerLinkList = selector(`.${BANNER_LINKLIST}`);
  }
}
