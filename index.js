import { searchCategories, searchData } from "./data/data.js";
import carousel from "./carousel.js";
import SearchCategory from "./components/SearchCategory.js";
import SearchBar from "./components/SearchBar.js";
import SearchCategoryDropBox from "./components/SearchCategoryDropBox.js";
import SearchBarDropBox from "./components/SearchBarDropBox.js";
import {
  targetQuerySelector,
  createLiListTemplate,
  htmlString2htmlElement,
} from "./util/util.js";
import { inputData } from "./data/data.js";

const category = new SearchCategory();
const categoriesDropBox = new SearchCategoryDropBox();
category.onClickSearchCategory({
  handleClickSearchCatgory,
});
categoriesDropBox.appendElement({ data: searchCategories, appendDropBox });
categoriesDropBox.onClickSearchCategory({
  showDropBox,
});

const searchBar = new SearchBar();
const searchBarDropBox = new SearchBarDropBox();
searchBarDropBox.appendElement({ data: searchData, appendSearchBarDropBox });

searchBarDropBox.onClickDocumentWhenDropDown({
  handleClickOutDropBox,
});

searchBarDropBox.onKeyupKeywords({
  handleKeyupKeywords,
});

searchBar.onFocusInput({
  dropDown,
});

searchBar.onChangeInput({
  handleChangeInput,
});

carousel();

const inputDropBox = new SearchBarDropBox();

function appendSearchBarDropBox(data) {
  const $search__bar = targetQuerySelector({
    className: "search__bar",
  });

  const liClissName = "header__input__keyword";
  const $latestSearch__data = createLiListTemplate(data, liClissName);

  const htmlString = `
          <ul>
            ${$latestSearch__data}
          </ul>
          <button class="search__delete">전체삭제</button>
          <button class="current__search__off">최근검색어끄기</button>
        `;

  searchBarDropBox.$search__word__dropbox = htmlString2htmlElement({
    htmlString,
    className: "search__word__dropbox",
  });

  $search__bar.insertAdjacentElement(
    "afterend",
    searchBarDropBox.$search__word__dropbox
  );
  searchBarDropBox.$search__word__dropbox.style.visibility = "hidden";
}

function handleChangeInput() {
  searchBar.$search.addEventListener("keyup", (event) => {
    const word = event.target.value;
    searchBarDropBox.$search__word__dropbox.style.visibility = "hidden";
    let keywordData;

    if (inputData[word]) {
      keywordData = inputData[word].map(({ keyword }) => keyword);
    }

    console.log(keywordData);
    inputDropBox?.$search__word__dropbox?.remove(); // Todo: dom추가/제거 방식이 아닌 데이터 바꿀때 리렌더링되도록 개선할 수 있을까?

    if (!keywordData) {
      searchBarDropBox.$search__word__dropbox.style.visibility = "visible";
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
    inputDropBox.$search__word__dropbox.style.visibility = "visible";
  });
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
  categoriesDropBox.setState(data);
}

function showDropBox() {
  document.addEventListener("click", ({ target }) => {
    const { visibility } =
      categoriesDropBox.$search__categories__container.style;

    const $search__category = targetQuerySelector({
      className: "search__category",
    });

    if (visibility === "visible") {
      return;
    }

    if (
      target === $search__category ||
      target === category.$selected__category
    ) {
      categoriesDropBox.$search__categories__container.style.visibility =
        "visible";
    }
  });
}

function handleClickSearchCatgory() {
  document.addEventListener("click", ({ target }) => {
    const visibility = categoriesDropBox.style?.visibility;
    if (visibility !== "visible") {
      return;
    }

    categoriesDropBox.style.visibility = "hidden";
    const $currentCategory = target.closest("li");

    if ($currentCategory?.parentNode !== categoriesDropBox) {
      return;
    }

    const selectedCategoryText = $currentCategory.textContent;
    category.setState(selectedCategoryText || "전체");
  });
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
      showKeyword(keywords[currentKeywordIdx].textContent);
      if (previousKeywordIdx >= 0) {
        keywords[previousKeywordIdx].style.textDecoration = "none";
      }
      previousKeywordIdx = currentKeywordIdx;
      index += 1;
    } else if (code === "ArrowUp") {
      let currentKeywordIdx =
        (index - 1) % keywordsLen === 0 ? index : (index - 1) % keywordsLen;
      previousKeywordIdx = currentKeywordIdx - 1;
      if (previousKeywordIdx >= 0) {
        keywords[previousKeywordIdx].style.textDecoration = "underline";
      } else if (previousKeywordIdx < 0) {
        keywords[0].style.textDecoration = "none";
      }
      if (currentKeywordIdx > 0) {
        keywords[currentKeywordIdx].style.textDecoration = "none";
      } else {
        keywords[0].style.textDecoration = "none";
        return;
      }

      const keyword = keywords[previousKeywordIdx]
        ? keywords[previousKeywordIdx].textContent
        : null;
      showKeyword(keyword);
      currentKeywordIdx = previousKeywordIdx;
      index -= 1;
    }
  });
}

function showKeyword(keyword) {
  searchBar.setState({
    keyword,
  });
}

function dropDown(hasDropBox) {
  if (hasDropBox) {
    searchBarDropBox.render();
  }
}

function handleClickOutDropBox() {
  const $search__delete = targetQuerySelector({
    className: "search__delete",
  });

  const $current__search__off = targetQuerySelector({
    className: "current__search__off",
  });

  document.addEventListener("click", ({ target }) => {
    if (
      target === searchBar.$search ||
      target === $search__delete ||
      target === $current__search__off
    ) {
      return;
    } else {
      searchBarDropBox.$search__word__dropbox.style.visibility = "hidden";
    }
  });
}
