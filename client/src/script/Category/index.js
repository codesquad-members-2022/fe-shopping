import Controller from "./controller/Controller.js";
import Model from "./models/Model.js";
import CategoryButton from "./views/CategoryButton.js";
import LargeCategory from "./views/LargeCategory.js";

const largeCategoryData = {
  largeCategories: [
    '패션의류',
    '뷰티',
    '출산/유아동',
    '식품',
    '주방용품',
    '생활용품',
    '등등등'
  ]
};
const categoryButton = new Controller(new CategoryButton('.category-button'), null);
const largeCategory = new Controller(new LargeCategory('.category-wrapper'), new Model(largeCategoryData));
categoryButton.addEventListener('mouseenter', () => largeCategory.show());
categoryButton.addEventListener('mouseleave', () => largeCategory.hide());
