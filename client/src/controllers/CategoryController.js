import { MainCategoryView } from '../views/MainCategoryView.js';
import { mainCategoryData } from '../constants/data.js';
import { CategoryModel } from '../models/CategoryModel.js';

export class CategoryController {
  constructor() {
    this.categoryView = new MainCategoryView();
    this.categoryModel = new CategoryModel();
    this.categoryView.getCategoryDataHandler = this.getCategoryDataHandler.bind(this);
    this.categoryView.run();
  }

  getCategoryDataHandler() {
    this.categoryModel.save(mainCategoryData);
    return this.categoryModel.getCategoryData();
  }
}
