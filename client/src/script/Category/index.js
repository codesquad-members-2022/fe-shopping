import { getCategories } from "../api.js";
import Controller from "./controller/Controller.js";
import Model from "./models/Model.js";
import CategoryButton from "./views/CategoryButton.js";
import LargeCategory from "./views/LargeCategory.js";

async function init () {
  const largeCategories = await getCategories('large');
  const categoryButton = new Controller(new CategoryButton('.category-button'), null);
  const largeCategory = new Controller(new LargeCategory('.category-wrapper'), new Model(largeCategories));
  categoryButton.addEventListener('mouseenter', () => largeCategory.show());
  categoryButton.addEventListener('mouseleave', () => largeCategory.hide());
}

init();
