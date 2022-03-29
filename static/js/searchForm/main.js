import { getData } from "../utils/getData.js";

import SearchModel from "./SearchModel.js";

import InputView from "./input/InputView.js";
import CategoryView from "./category/CategoryView.js";
import HistoryView from "./history/HistoryView.js";
import AutoCompleteView from "./autoComplete/AutoCompleteView.js";

import InputController from "./input/InputController.js";
import CategoryController from "./category/CategoryController.js";
import HistoryController from "./history/HistoryController.js";
import AutoCompleteController from "./autoComplete/AutoCompleteController.js";

export async function initSearchForm() {
  const user = await getData("http://127.0.0.1:3000/", "data", "user");
  const searchCategories = await getData("http://127.0.0.1:3000/", "data", "searchCategories");

  const initialModelState = {
    mode: user.mode,
    history: user.history,
    categories: searchCategories,
    currentCategory: searchCategories[0],
  };

  const searchModel = new SearchModel(initialModelState);

  const inputView = new InputView();
  const categoryView = new CategoryView();
  const historyView = new HistoryView();
  const autoCompleteView = new AutoCompleteView();

  const inputController = new InputController({ model: searchModel, view: inputView });
  const categoryController = new CategoryController({ model: searchModel, view: categoryView });
  const historyController = new HistoryController({ model: searchModel, view: historyView });
  const autoCompleteController = new AutoCompleteController({ model: searchModel, view: autoCompleteView });

  inputController.init();
  categoryController.init();
  historyController.init();
  autoCompleteController.init();
}
