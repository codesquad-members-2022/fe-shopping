import { getData } from "../utils/getData.js";
import { dom } from "../utils/dom.js";

import SearchModel from "./SearchModel.js";

import CategoryView from "./category/CategoryView.js";
import HistoryView from "./history/HistoryView.js";
import AutoCompleteView from "./autoComplete/AutoCompleteView.js";
import InputView from "./input/InputView.js";

import CategoryController from "./category/CategoryController.js";
import HistoryController from "./history/HistoryController.js";
import AutoCompleteController from "./autoComplete/AutoCompleteController.js";
import InputController from "./input/InputController.js";

export async function initSearchForm() {
  // set Model
  const user = await getData("http://127.0.0.1:3000/", "data", "user");
  const searchCategories = await getData("http://127.0.0.1:3000/", "data", "searchCategories");

  const initialModelState = {
    mode: user.mode,
    history: user.history,
    categories: searchCategories,
    currentCategory: searchCategories[0],
  };

  const searchModel = new SearchModel(initialModelState);

  // set Views
  const el = {
    currentCategory: dom.select(".searchForm__current-category"),
    categoryList: dom.select(".searchForm__category-list"),
    history: dom.select(".searchForm__history"),
    historyList: dom.select(".searchForm__history-list"),
    historyClearButton: dom.select(".searchForm__history-button--clear"),
    autoComplete: dom.select(".searchForm__autoComplete"),
    autoCompleteList: dom.select(".searchForm__autoComplete-list"),
    input: dom.select(".searchForm__input"),
    result: dom.select(".searchForm__result"),
    submitButton: dom.select(".searchForm__submit"),
  };

  const categoryView = new CategoryView({
    currentCategoryEl: el.currentCategory,
    categoryListEl: el.categoryList,
  });

  const historyView = new HistoryView({
    historyEl: el.history,
    historyListEl: el.historyList,
    clearButtonEl: el.historyClearButton,
  });

  const autoCompleteView = new AutoCompleteView({
    autoCompleteEl: el.autoComplete,
    autoCompleteListEl: el.autoCompleteList,
  });

  const inputView = new InputView({
    inputEl: el.input,
    resultEl: el.result,
    submitButtonEl: el.submitButton,
  });

  // set Controllers
  const categoryController = new CategoryController({
    model: searchModel,
    view: categoryView,
  });

  const historyController = new HistoryController({
    model: searchModel,
    view: historyView,
  });

  const autoCompleteController = new AutoCompleteController({
    model: searchModel,
    view: autoCompleteView,
  });

  const inputController = new InputController({
    model: searchModel,
    view: inputView,
    historyView: historyView,
    autoCompleteView: autoCompleteView,
  });

  categoryController.init();
  historyController.init();
  autoCompleteController.init();
  inputController.init();
}
