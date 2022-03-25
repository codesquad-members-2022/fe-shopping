import { MainCategoryView } from '../views/MainCategoryView.js';
import { mainCategoryData } from '../constants/data.js';
import { CategoryModel } from '../models/CategoryModel.js';

export class MainCategoryController {
  constructor() {
    this.categoryView = new MainCategoryView();
    this.categoryModel = new CategoryModel();
    this.categoryView.getCategoryDataHandler = this.getCategoryDataHandler.bind(this);
    this.categoryView.run();
  }

  getCategoryDataHandler() {
    if (this.categoryModel.open) {
      return;
    }
    this.categoryModel.save(mainCategoryData);
    this.categoryView.categoryElement.insertAdjacentHTML(
      'beforeend',
      this.categoryView.drawCategory(this.categoryModel.getCategoryData())
    );
  }
}
