import { searchCategories, searchData } from "./data/data.js";

import Store from "./Model/Store.js";
import SearchCategory from "./View/SearchCategory.js";
import SearchCategoryDropBox from "./View/SearchCategoryDropBox.js";
import SearchBar from "./View/SearchBar.js";
import SearchBarDropBox from "./View/SearchBarDropBox.js";
import carousel from "./carousel.js";
import ViewModel from "./ViewModel/ViewModel.js";

const store = new Store();

const views = createViews({
  category: new SearchCategory(),
  categoriesDropBox: new SearchCategoryDropBox(),
  inputDropBox: new SearchBarDropBox(),
  searchBar: new SearchBar(),
  searchBarDropBox: new SearchBarDropBox(),
});

const {
  category,
  categoriesDropBox,
  inputDropBox,
  searchBar,
  searchBarDropBox,
} = views;

const viewModel = new ViewModel({
  categoriesDropBox,
  store,
  category,
  searchBarDropBox,
  searchBar,
  inputDropBox,
});

appendDropBoxes({
  appendElement,
  categoriesDropBoxArgs: {
    targetView: categoriesDropBox,
    source: {
      data: searchCategories,
      appendDropBox: viewModel.appendDropBox.bind(viewModel),
    },
  },
  searchBarDropBoxArgs: {
    targetView: searchBarDropBox,
    source: {
      data: searchData,
      appendSearchBarDropBox: viewModel.appendSearchBarDropBox.bind(viewModel),
    },
  },
});

onDropDown({
  onCategoryDropDown: category.onClickSearchCategory,
  handleClickSearchCatgory: viewModel.handleClickSearchCatgory.bind(viewModel),
  onSearchBarDropDown: searchBarDropBox.onClickDocumentWhenDropDown,
  handleClickOutDropBox: viewModel.handleClickOutDropBox.bind(viewModel),
});

onSearchBarChange({
  onKeyupKeywords: searchBar.onKeyupKeywords.bind(searchBar),
  handleKeyupKeywords: viewModel.handleKeyupKeywords.bind(viewModel),
  onFocusInput: searchBar.onFocusInput.bind(searchBar),
  handleFocusInput: viewModel.handleFocusInput.bind(viewModel),
  onChangeInput: searchBar.onChangeInput.bind(searchBar),
  handleChangeInput: viewModel.handleChangeInput.bind(viewModel),
});

function createViews({
  category,
  categoriesDropBox,
  inputDropBox,
  searchBar,
  searchBarDropBox,
}) {
  const views = {
    category,
    categoriesDropBox,
    inputDropBox,
    searchBar,
    searchBarDropBox,
  };

  return views;
}

function appendElement({ targetView, source }) {
  targetView.appendElement(source);
}

function appendDropBoxes({
  appendElement,
  categoriesDropBoxArgs,
  searchBarDropBoxArgs,
}) {
  appendElement(categoriesDropBoxArgs);
  appendElement(searchBarDropBoxArgs);
}

function onDropDown({
  onCategoryDropDown,
  handleClickSearchCatgory,
  onSearchBarDropDown,
  handleClickOutDropBox,
}) {
  onCategoryDropDown({ handleClickSearchCatgory });
  onSearchBarDropDown({ handleClickOutDropBox });
}

function onSearchBarChange({
  onKeyupKeywords,
  handleKeyupKeywords,
  onFocusInput,
  handleFocusInput,
  onChangeInput,
  handleChangeInput,
}) {
  onKeyupKeywords({ handleKeyupKeywords });
  onFocusInput({ handleFocusInput });
  onChangeInput({ handleChangeInput });
}

viewModel.handleClickSearchCatgory();

carousel({
  slides: document.querySelector(".slide__list"),
  selector: document.querySelector(".banner__category"),
});
