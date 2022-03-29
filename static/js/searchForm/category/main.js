import CategoryView from './CategoryView.js';
import CategoryController from './CategoryController.js';

export default async function initCategory(searchModel) {
  const categoryView = new CategoryView();
  const categoryController = new CategoryController({
    model: searchModel,
    view: categoryView,
  });

  categoryController.init();
}
