export default class ModelController {
  constructor() {
    this.categoryData;
  }

  getData(categoryData) {
    this.categoryData = categoryData;
  }

  printData() {
    return this.categoryData;
  }
}
