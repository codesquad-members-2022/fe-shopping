import { searchCategories, searchData } from "./data/data.js";

import Store from "./Model/Store.js";
import SearchCategory from "./View/SearchCategory.js";
import SearchCategoryDropBox from "./View/SearchCategoryDropBox.js";
import SearchBar from "./View/SearchBar.js";
import SearchBarDropBox from "./View/SearchBarDropBox.js";
import carousel from "./carousel.js";
import ViewModel from "./ViewModel/ViewModel.js";

const controller = {
  init({
    store,
    category,
    categoriesDropBox,
    inputDropBox,
    searchBar,
    searchBarDropBox,
  }) {
    this.store = store;
    this.category = category;
    this.categoriesDropBox = categoriesDropBox;
    this.searchBar = searchBar;
    this.searchBarDropBox = searchBarDropBox;
    this.viewModel = new ViewModel({
      store,
      category,
      categoriesDropBox,
      inputDropBox,
      searchBar,
      searchBarDropBox,
    });

    this.appendDropBoxes({
      categoriesDropBoxArgs: {
        targetView: this.categoriesDropBox,
        source: {
          data: searchCategories,
          appendDropBox: this.viewModel.appendDropBox.bind(this.viewModel),
        },
      },
      searchBarDropBoxArgs: {
        targetView: this.searchBarDropBox,
        source: {
          data: searchData,
          appendSearchBarDropBox: this.viewModel.appendSearchBarDropBox.bind(
            this.viewModel
          ),
        },
      },
    });

    this.onDropDown({
      onCategoryDropDown: this.category.onClickSearchCategory,
      handleClickSearchCatgory: this.viewModel.handleClickSearchCatgory.bind(
        this.viewModel
      ),
      onSearchBarDropDown: this.searchBarDropBox.onClickDocumentWhenDropDown,
      handleClickOutDropBox: this.viewModel.handleClickOutDropBox.bind(
        this.viewModel
      ),
    });

    this.onSearchBarChange({
      onKeyupKeywords: this.searchBar.onKeyupKeywords.bind(searchBar),
      handleKeyupKeywords: this.viewModel.handleKeyupKeywords.bind(
        this.viewModel
      ),
      onFocusInput: this.searchBar.onFocusInput.bind(searchBar),
      handleFocusInput: this.viewModel.handleFocusInput.bind(this.viewModel),
      onChangeInput: this.searchBar.onChangeInput.bind(searchBar),
      handleChangeInput: this.viewModel.handleChangeInput.bind(this.viewModel),
    });
  },

  appendElement({ targetView, source }) {
    targetView.appendElement(source);
  },

  appendDropBoxes({ categoriesDropBoxArgs, searchBarDropBoxArgs }) {
    this.appendElement(categoriesDropBoxArgs);
    this.appendElement(searchBarDropBoxArgs);
  },

  onDropDown({
    onCategoryDropDown,
    handleClickSearchCatgory,
    onSearchBarDropDown,
    handleClickOutDropBox,
  }) {
    onCategoryDropDown({ handleClickSearchCatgory });
    onSearchBarDropDown({ handleClickOutDropBox });
  },

  onSearchBarChange({
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
  },
};

controller.init({
  store: new Store(),
  category: new SearchCategory(),
  categoriesDropBox: new SearchCategoryDropBox(),
  inputDropBox: new SearchBarDropBox(),
  searchBar: new SearchBar(),
  searchBarDropBox: new SearchBarDropBox(),
});

carousel({
  slides: document.querySelector(".slide__list"),
  selector: document.querySelector(".banner__category"),
});
