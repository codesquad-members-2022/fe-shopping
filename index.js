import { searchCategories, searchData } from "./data/data.js";
import carousel from "./carousel.js";
import {
  targetQuerySelector,
  createLiListTemplate,
  htmlString2htmlElement,
} from "./util/util.js";
import { inputData } from "./data/data.js";

import Store from "./Model/Store.js";
import SearchCategory from "./View/SearchCategory.js";
import SearchCategoryDropBox from "./View/SearchCategoryDropBox.js";
import SearchBar from "./View/SearchBar.js";
import SearchBarDropBox from "./View/SearchBarDropBox.js";

const store = new Store();
const state = store.getState();
const category = new SearchCategory();
const categoriesDropBox = new SearchCategoryDropBox();
category.onClickSearchCategory({
  handleClickSearchCatgory,
});
categoriesDropBox.appendElement({ data: searchCategories, appendDropBox });

const searchBar = new SearchBar();
const searchBarDropBox = new SearchBarDropBox();
searchBarDropBox.appendElement({ data: searchData, appendSearchBarDropBox });

searchBarDropBox.onClickDocumentWhenDropDown({
  handleClickOutDropBox,
});

searchBar.onKeyupKeywords({
  handleKeyupKeywords,
});

searchBar.onFocusInput({
  dropDown,
});

searchBar.onChangeInput({
  handleChangeInput,
});

const inputDropBox = new SearchBarDropBox();

function handleClickSearchCatgory(target) {
  const $search__category = targetQuerySelector({
    className: "search__category",
  });

  if (
    !categoriesDropBox.$search__categories__container.classList.contains(
      "hidden"
    )
  ) {
    categoriesDropBox.render();
    const $currentCategory = target.closest("li");
    const selectedCategory = $currentCategory?.textContent;
    const isInCategoryDropBox =
      $currentCategory?.parentNode ===
      categoriesDropBox.$search__categories__container;

    if (isInCategoryDropBox) {
      selectedCategory && store.setState({ ...store.state, selectedCategory });
      category.render(store.state.selectedCategory);
    }
  } else if (
    target === $search__category ||
    target === category.$selected__category
  ) {
    categoriesDropBox.render();
  }
}

function appendDropBox(data) {
  const $categories = createLiListTemplate(data);
  categoriesDropBox.$search__categories__container = htmlString2htmlElement({
    tag: "ul",
    htmlString: $categories,
    className: "search__dropbox",
  });

  category.$selected__category = targetQuerySelector({
    className: "selected__category",
  });

  category.$selected__category.insertAdjacentElement(
    "afterend",
    categoriesDropBox.$search__categories__container
  );

  categoriesDropBox.render(state.isCategoryDropBoxVisible);
}

function appendSearchBarDropBox() {
  store.setState({ ...store.state, isBarDropBoxVisible: false });
  const { isBarDropBoxVisible } = state;
  searchBarDropBox.render({ isBarDropBoxVisible });
}

function handleClickOutDropBox() {
  store.setState({ ...state, isBarDropBoxVisible: true });
  const { isBarDropBoxVisible } = state;
  searchBarDropBox.render({ isBarDropBoxVisible });
}

function handleKeyupKeywords() {
  let index = 0;
  const $ul = searchBarDropBox.$search__word__dropbox.children[0];
  const keywords = $ul.children;
  const keywordsLen = keywords.length;
  let previousKeywordIdx = -1;

  searchBar.$search.addEventListener("keyup", ({ code }) => {
    if (code === "ArrowDown") {
      let currentKeywordIdx = index % keywordsLen;
      keywords[currentKeywordIdx].style.textDecoration = "underline";
      store.setState({
        ...store.state,
        keyword: keywords[currentKeywordIdx].textContent,
      });
      const { keyword } = store.state;
      searchBar.render({ keyword });
      if (previousKeywordIdx >= 0) {
        store.setState({
          ...store.state,
          keyupKeyword: [previousKeywordIdx, "none"],
        });
        const { keyupKeyword } = store.state;
        searchBarDropBox.render({ keyupKeyword });
      }
      previousKeywordIdx = currentKeywordIdx;
      index += 1;
    } else if (code === "ArrowUp") {
      let currentKeywordIdx =
        (index - 1) % keywordsLen === 0 ? index : (index - 1) % keywordsLen;
      previousKeywordIdx = currentKeywordIdx - 1;
      if (previousKeywordIdx >= 0 && keywords[previousKeywordIdx]) {
        store.setState({
          ...store.state,
          keyupKeyword: [previousKeywordIdx, "underline"],
        });
        const { keyupKeyword } = store.state;
        searchBarDropBox.render({ keyupKeyword });
      } else if (previousKeywordIdx < 0) {
        store.setState({
          ...store.state,
          keyupKeyword: [0, "none"],
        });
        const { keyupKeyword } = store.state;
        searchBarDropBox.render({ keyupKeyword });
      }
      if (currentKeywordIdx > 0) {
        store.setState({
          ...store.state,
          keyupKeyword: [currentKeywordIdx, "none"],
        });
        const { keyupKeyword } = store.state;
        searchBarDropBox.render({ keyupKeyword });
      } else {
        store.setState({
          ...store.state,
          keyupKeyword: [0, "none"],
        });
        const { keyupKeyword } = store.state;
        searchBarDropBox.render({ keyupKeyword });
        return;
      }
      const keyword = keywords[previousKeywordIdx]
        ? keywords[previousKeywordIdx].textContent
        : null;

      store.setState({
        ...store.state,
        keyword,
      });

      searchBar.render({ keyword });
      currentKeywordIdx = previousKeywordIdx;
      index -= 1;
    }
  });
}

function dropDown() {
  store.setState({
    ...store.state,
    isBarDropBoxVisible: true,
  });
  const { isBarDropBoxVisible } = store.state;
  searchBarDropBox.render({ isBarDropBoxVisible });
}

function handleChangeInput() {
  searchBar.$search.addEventListener("keyup", (event) => {
    const word = event.target.value;
    searchBarDropBox.$search__word__dropbox.style.visibility = "hidden";
    let keywordData;

    if (inputData[word]) {
      keywordData = inputData[word].map(({ keyword }) => keyword);
    }

    inputDropBox?.$search__word__dropbox?.remove(); // Todo: dom추가/제거 방식이 아닌 데이터 바꿀때 리렌더링되도록 개선할 수 있을까?

    if (!keywordData) {
      const isBarDropBoxVisible = true;
      store.setState({
        ...store.state,
        isBarDropBoxVisible,
      });
      searchBarDropBox.render({ isBarDropBoxVisible });
    }

    const $search__bar = targetQuerySelector({
      className: "search__bar",
    });

    let htmlString = "";
    if (inputData[word] !== undefined) {
      htmlString = `
      <ul>
        ${createLiListTemplate(keywordData)}
      </ul>
    `;
    }

    inputDropBox.$search__word__dropbox = htmlString2htmlElement({
      htmlString,
      className: "search__word__dropbox",
    });

    inputDropBox.$search__word__dropbox.hasChildNodes() &&
      $search__bar.insertAdjacentElement(
        "afterend",
        inputDropBox.$search__word__dropbox
      );
    const isBarDropBoxVisible = true;
    store.setState({
      ...store.state,
      isBarDropBoxVisible,
    });
    inputDropBox.render(isBarDropBoxVisible);
  });
}

const $slideList = document.querySelector(".slide__list");
const $banner__category = document.querySelector(".banner__category");

carousel({ slides: $slideList, selector: $banner__category });
