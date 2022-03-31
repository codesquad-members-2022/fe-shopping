import { banners } from '../../data';

class MainBannerModel {

  constructor(banners) {
    this.banners = banners;
    this.selectedBanner = this.banners[0];
    this.listeners = {};
  }

  subscribe(state, callback) {
    if (this[state] && !this.listeners[state]) this.listeners[state] = [];
    this.listeners[state].push(callback);
  }

  notify(state) {
    this.listeners[state].forEach(callback => callback());
  }

  setSelectedItem(selectedItem) {
    this.selectedBanner = this.banners.find(banner => banner.item === selectedItem);
    this.notify('selectedBanner');
  }

  getAllItems() {
    return this.banners;
  }

  getSelectedItem() {
    return this.selectedBanner;
  }
}

export default new MainBannerModel(banners);
