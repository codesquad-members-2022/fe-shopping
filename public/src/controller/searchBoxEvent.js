import { renderRecentSearchBox, renderRelatedSearchBox, renderRelatedSearchWord } from "../render/searchBox.js";
import { debounce } from "./util.js";

const setSearchBoxEvent = (searchBoxNode, searchData) => {
  setCategoryEvent(searchBoxNode);
  setSearchEvent(searchBoxNode, searchData);
};

const setCategoryEvent = (searchBoxNode) => {
  const categoryNode = searchBoxNode.querySelector(".search-box__category");
  const categories = searchBoxNode.querySelector(".category__items");
  const searchBoxName = searchBoxNode.querySelector(".search-box__name");

  categoryNode.addEventListener("click", (e) => {
    if (categories.classList.contains("visibility-hidden")) {
      categories.classList.add("visibility-visible");
      categories.classList.remove("visibility-hidden");
    } else {
      if (e.target.classList.contains("category__item")) {
        changeCategory(searchBoxName, e.target);
      }
      categories.classList.add("visibility-hidden");
    }
  });
  document.addEventListener("click", (e) => {
    if (e.target.parentNode !== categoryNode && !categories.classList.contains("visibility-hidden")) {
      categories.classList.add("visibility-hidden");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !categories.classList.contains("visibility-hidden")) {
      categories.classList.add("visibility-hidden");
    }
  });
};

const changeCategory = (searchBoxNode, targetNode) => {
  searchBoxNode.firstChild.textContent = targetNode.firstChild.textContent;
};

const setSearchEvent = (searchBoxNode, searchData) => {
  const searchInput = searchBoxNode.querySelector(".search__input");
  const recentSearchBox = searchBoxNode.querySelector(".recent-search-container");
  const relatedSearchBox = searchBoxNode.querySelector(".related-search-container");

  searchInput.addEventListener("focusin", (e) => {
    renderRecentSearchBox(recentSearchBox);
    if (searchInput.value.length !== 0) {
      renderRelatedSearchBox(relatedSearchBox);
      fillRelatedSearchBox(relatedSearchBox.querySelector(".related-search-word-container"), searchData, searchInput.value);
    }
  });
  searchInput.addEventListener("focusout", (e) => {
    setTimeout(() => {
      recentSearchBox.innerHTML = "";
      relatedSearchBox.innerHTML = "";
    }, 200);
  });
  searchInput.addEventListener(
    "input",
    debounce((e) => {
      relatedSearchBox.innerHTML = "";
      if (searchInput.value.length !== 0) {
        renderRelatedSearchBox(relatedSearchBox);
        const relatedSearchWordBox = relatedSearchBox.querySelector(".related-search-word-container");
        fillRelatedSearchBox(relatedSearchWordBox, searchData, searchInput.value);
        setRelatedSearchWordEvent(relatedSearchWordBox, searchInput);
      }
    }, 100)
  );
};

const fillRelatedSearchBox = (parentNode, searchData, typeWord) => {
  Object.entries(searchData).forEach(([searchWord, searchResult]) => {
    if (searchWord === typeWord) {
      searchResult.forEach((word) => {
        renderRelatedSearchWord(parentNode, word);
      });
    }
  });
};

const setRelatedSearchWordEvent = (relatedSearchBox, searchInput) => {
  relatedSearchBox.addEventListener("click", (e) => {
    searchInput.value = e.target.firstChild.textContent;
  });
};

export default setSearchBoxEvent;
