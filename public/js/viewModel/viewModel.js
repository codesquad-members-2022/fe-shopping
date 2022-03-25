import { model } from "../model/model.js";
import storage from "../util/storage.js";
import option from "../common/options.js";
import SearchView from "../view/SearchView.js";

export const viewModel = {
  init({
    localStorage,
    viewOptions,
    viewModelOptions: { suggestionUrl, suggestionDelay, message },
  }) {
    this.localStorage = localStorage;
    this.searchView = new SearchView(viewOptions);
    this.message = message;
    this.suggestionUrl = suggestionUrl;
    this.suggestionDelay = suggestionDelay;

    model.init();
    this.searchView.init();
  },

  getRecentSearchData() {
    model.recentWordData = storage.getLocalStorage(option.recentSearchKeyName);
    this.searchView.render();
  },
};
