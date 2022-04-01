import Component from '../core/Component.js';
import MainBannerViewModel from '../viewModel/MainBannerViewModel.js';
import { myInterval, throttle } from '../utils/index.js';

class MainBannerView extends Component {

  setup() {
    this.viewModel = MainBannerViewModel;
    this.viewModel.subscribe(() => this.render());
  }

  template() {
    this.selectedBanner = this.viewModel.getSelectedBanner();
    this.banners = this.viewModel.getAllBanners();

    return `<a href="#" class="banner-img">
              <img src="${this.selectedBanner.bannerImg}" alt="${this.selectedBanner.item}" />
            </a>
            <ul class="banner-category">
              ${this.banners.reduce((template, { item, categoryImg }) => {
                return template += `<li class="category-item">
                  <a href="#" class="category-link ${item === this.selectedBanner.item ? 'focus' : ''}">${item}</a>
                  <img src="${categoryImg}" alt="${item}" />
                </li>`;
              }, '')}
            </ul>`;
  }

  setEvent() {
    this.addEvent('mouseover', '.banner-category',
      throttle(({ target }) => {
        this.stopBannerChanging();
        this.viewModel.changeSelectedBanner(target.innerText);
      }, 50));
  }

  mounted() {
    this.stopBannerChanging = this.changeBanner();
  }

  changeBanner() {
    return myInterval(() => {
      const nextBanner = this.getNextBanner();
      this.viewModel.changeSelectedBanner(nextBanner);
    }, 2000);
  }

  getNextBanner() {
    let currentIndex = this.banners.findIndex(banner => banner.item === this.selectedBanner.item);
    const nextIndex = currentIndex === this.banners.length - 1 ? 0 : ++currentIndex;
    return this.banners[nextIndex].item;
  }
}

export default MainBannerView;
