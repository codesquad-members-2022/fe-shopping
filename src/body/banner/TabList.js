import { selector } from '../../utils/utils.js';

const BANNER_TABLIST = 'banner-tablist';
const BANNER_TAB = 'banner-tab';

export class TabList {
  constructor() {
    this.$bannerTabList = selector(`.${BANNER_TABLIST}`);
  }
}
