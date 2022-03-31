import Component from '../core/Component.js';
import MainBannerViewModel from '../viewModel/MainBannerViewModel.js';

class MainBannerView extends Component {

  setup() {
    this.viewModel = MainBannerViewModel;
    this.viewModel.subscribe(() => this.render());
  }

  template() {
    const selectedBanner = this.viewModel.getSelectedBanner();
    const banners = this.viewModel.getAllBanners();

    return `<a href="#" class="banner-img">
              <img src="${selectedBanner.bannerImg}" alt="${selectedBanner.item}" />
            </a>
            <ul class="banner-category">
              ${banners.reduce((template, { item, categoryImg }) => {
                return template += `<li class="category-item">
                  <a href="#" class="category-link ${item === selectedBanner.item ? 'focus' : ''}">${item}</a>
                  <img src="${categoryImg}" alt="${item}" />
                </li>`
              }, '')}
            </ul>`;
  }

  setEvent() {
    this.addEvent('mouseover', '.banner-category', (event) => {
      this.viewModel.changeSelectedBanner(event.target.innerText);
    })
  }
}

export default MainBannerView;
