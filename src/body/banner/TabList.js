import { selector, toggleClass } from '../../utils/utils.js';
import { bannerStore } from './bannerStore.js';

const BANNER_TABLIST = 'banner-tablist';
const BANNER_TAB = 'banner-tab';
const SELECTED = 'is-selected';

export class TabList {
  constructor() {
    this.$bannerTabList = selector(`.${BANNER_TABLIST}`);
    this.init();
  }

  init() {
    this.$bannerTabList.addEventListener('mouseover', this.handleMouseOver);
  }

  update(tabNum) {
    const $prevTab = selector(`.${SELECTED}`, this.$bannerTabList);
    const $curTab = this.$bannerTabList.children[tabNum];

    toggleClass(SELECTED, $prevTab);
    toggleClass(SELECTED, $curTab);
  }

  handleMouseOver = (e) => {
    const $bannerTab = e.target.closest(`.${BANNER_TAB}`);
    if (!$bannerTab) return;
    const selectedTabNum = Array.prototype.indexOf.call(
      this.$bannerTabList.children,
      $bannerTab
    );

    if (selectedTabNum === bannerStore.getTabNum()) return;
    bannerStore.setTabNum(selectedTabNum);
  };
}
