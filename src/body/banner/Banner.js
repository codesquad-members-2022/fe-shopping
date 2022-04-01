import { bannerStore } from './bannerStore.js';
import { ImageList } from './ImageList.js';
import { LinkList } from './LinkList.js';
import { TabList } from './TabList.js';

export class Banner {
  constructor() {
    this.imageList = new ImageList();
    this.linkList = new LinkList();
    this.tabList = new TabList();
  }

  init() {
    const defaultInterval = 2000;
    bannerStore.register(this.imageList);
    bannerStore.register(this.linkList);
    bannerStore.register(this.tabList);
    bannerStore.setTabLength(this.tabList.$bannerTabList.children.length);
    bannerStore.setCarouselInterval(defaultInterval);
  }
}
