import { extend } from "../../util.js";
import View from "./View.js";

function CategoryButton () {
  View.apply(this, arguments);
}
extend(CategoryButton, View);

export default CategoryButton;