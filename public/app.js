import Search from "./search/search.js";
import SearchInput from "./search/search-input/search-input.js";
import SearchCategory from "./search/search-category/search-category.js";
import SearchListStore from "./search/search-list/search-list-store.js";
import RecentSearchList from "./search/search-list/recent-search-list/recent-search-list.js";
import RecentSearchListView from "./search/search-list/recent-search-list/recent-search-list-view.js";
import RecentSearchListStore from "./search/search-list/recent-search-list/recent-search-list-store.js";
import RelatedSearchList from "./search/search-list/related-search-list/related-search-list.js";
import RelatedSearchListView from "./search/search-list/related-search-list/related-search-list-view.js";
import Banner from "./banner/banner.js";

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

const bannerBlock = document.querySelector(".banner");
const bannerMenu = document.querySelector(".banner__menu");

const banner = new Banner(bannerBlock, bannerMenu);

search.initEvents();
banner.initBanner();
