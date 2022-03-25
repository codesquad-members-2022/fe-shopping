import Search from "./search/search.js";
import SearchInput from "./search/search-input/search-input.js";
import SearchCategory from "./search/search-category/search-category.js";
import SearchListStore from "./search/search-list/search-list-store.js";
import RecentSearchList from "./search/search-list/recent-search-list/recent-search-list.js";
import RecentSearchListView from "./search/search-list/recent-search-list/recent-search-list-view.js";
import RecentSearchListStore from "./search/search-list/recent-search-list/recent-search-list-store.js";
import RelatedSearchList from "./search/search-list/related-search-list/related-search-list.js";
import RelatedSearchListView from "./search/search-list/related-search-list/related-search-list-view.js";
import { DIRECTION_UP, DIRECTION_DOWN, ENTER } from "./utils.js";

const searchbar = document.querySelector(".search__input");
const searchInput = new SearchInput(searchbar);

const searchRecentList = document.querySelector(".search__recent-list");
const searchRecentListContainer = document.querySelector(
    ".search__recent-list--container"
);
const recentSearchListView = new RecentSearchListView(
    searchRecentList,
    searchRecentListContainer
);
const recentSearchListStore = new RecentSearchListStore();
const recentSearchList = new RecentSearchList(
    recentSearchListView,
    recentSearchListStore
);

const searchRelatedList = document.querySelector(".search__related-list");
const searchRelatedListContainer = document.querySelector(
    ".search__related-list--container"
);
const relatedSearchListView = new RelatedSearchListView(
    searchRelatedList,
    searchRelatedListContainer
);
const relatedSearchListStore = new SearchListStore();
const relatedSearchList = new RelatedSearchList(
    relatedSearchListView,
    relatedSearchListStore
);

const category = document.querySelector(".search__category");
const categoryList = document.querySelector(".search__category-list");
const searchCategory = new SearchCategory(category, categoryList);

const search = new Search(
    searchInput,
    recentSearchList,
    relatedSearchList,
    searchCategory
);

search.initEvents();

const hideLists = () => {
    recentSearchList.hide();
    relatedSearchList.hide();
    searchCategory.hide();
};

const searchCategoryKeydownEventHandler = (event) => {
    event.preventDefault();

    if (event.key === DIRECTION_DOWN) {
        searchCategory.focusNextItem();
    }

    if (event.key === DIRECTION_UP) {
        searchCategory.focusPreviousItem();
    }

    if (event.key === ENTER) {
        searchCategory.hide();
    }
};

document.body.addEventListener("click", ({ target }) => {
    if (!target.closest(".search")) {
        hideLists();
    }
});
document.body.addEventListener("keydown", (event) => {
    const searchCategoryIsVisible = searchCategory.store.getVisibility();
    if (searchCategoryIsVisible) {
        searchCategoryKeydownEventHandler(event);
    }
});
