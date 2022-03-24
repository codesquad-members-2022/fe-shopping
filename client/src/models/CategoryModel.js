export class CategoryModel {
  constructor() {
    this.categoryData = {};
  }

  save(categoryData) {
    this.categoryData = categoryData;
  }

  getCategoryData() {
    return this.categoryData;
  }
}
