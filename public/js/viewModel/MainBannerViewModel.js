import MainBannerModel from '../model/MainBannerModel.js';

class MainBannerViewModel {
  constructor() {
    this.observe(MainBannerModel);
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  observe(model) {
    this.model = model;
    this.model.subscribe('selectedBanner', () => this.notify());
  }

  notify() {
    this.listeners.forEach(callback => callback());
  }

  changeSelectedBanner(banner) {
    this.model.setSelectedItem(banner);
  }

  getAllBanners() {
    return this.model.getAllItems();
  }

  getSelectedBanner() {
    return this.model.getSelectedItem();
  }
}

export default new MainBannerViewModel();
