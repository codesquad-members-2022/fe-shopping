import { renderRecentSearchBox, renderRelatedSearchBox } from "../render/searchBox.js";
import { debounce } from "./util.js";

const setSearchBoxEvent = (searchBoxNode) => {
  setCategoryEvent(searchBoxNode);
  setSearchEvent(searchBoxNode);
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

const setSearchEvent = (searchBoxNode) => {
  const searchInput = searchBoxNode.querySelector(".search__input");
  const recentSearchBox = searchBoxNode.querySelector(".recent-search-container");
  const relatedSearchBox = searchBoxNode.querySelector(".related-search-container");

  searchInput.addEventListener("focusin", (e) => {
    renderRecentSearchBox(recentSearchBox);
    if (searchInput.value.length !== 0) {
      renderRelatedSearchBox(relatedSearchBox);
    }
  });
  searchInput.addEventListener("focusout", (e) => {
    recentSearchBox.innerHTML = "";
    relatedSearchBox.innerHTML = "";
  });
  searchInput.addEventListener(
    "input",
    debounce((e) => {
      relatedSearchBox.innerHTML = "";
      console.log(searchInput.value);
      if (searchInput.value.length !== 0) {
        renderRelatedSearchBox(relatedSearchBox);
      }
    }, 100)
  );
};

export default setSearchBoxEvent;
