export default class CarouselModel {
  async fetchCarouselData() {
    const res = await fetch('/carousel/data');
    const data = await res.json();

    return data;
  }
}
