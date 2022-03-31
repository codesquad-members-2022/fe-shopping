import CarouselView from '../view/carouselview.js';
import CarouselModel from '../model/carouselmodel.js';

export default class CarouselController {
  constructor() {
    this.carouselView = new CarouselView();
    this.carouselModel = new CarouselModel();
  }

  init() {
    this.carouselView.init('.carousel');
    this.setUp();
  }

  setUp() {
    this.deliverCarouselData();
  }

  async deliverCarouselData() {
    const data = await this.carouselModel.fetchCarouselData();
    await this.carouselView.parseCarouselImg(data.carousel);
    await this.carouselView.parseCarouselLnbImg(data.carouselLnb);
  }
}
