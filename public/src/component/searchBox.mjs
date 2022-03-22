import { debounce, fetchData } from "../util/util.js";
import Component from "./component.mjs";

class SearchBox extends Component {
  constructor(parentNode, categoryData, recentSearch) {
    super(parentNode);
    this.recentSearch = recentSearch;
    this.categoryData = categoryData;
    this.relatedWords = [];
  }

  template() {
    return /* html */ `
      <div class="search-box">
        <div class="search-box__category">
          <span class="search-box__name">전체</span>
          <div class="icon select__category-btn"></div>
          <ul class="category__items visibility-hidden">
            ${this.categoryData.reduce((category, data) => {
              return category + `<li class="category__item">${data}</li>`;
            }, "")}
          </ul>
        </div>
        <form action="">
          <label for=""
            ><input placeholder="찾고 싶은 상품을 검색해보세요!" class="search__input" type="text"
          /></label>
        </form>
        <div class="icon search-btn"></div>
        <div class="recent-search-container"></div>
        <div class="related-search-container"></div>
      </div>
      <ul class="icon__container">
        <li class="icon__li">
          <div class="icon my-coupang"></div>
          <span class="icon__name">마이쿠팡</span>
        </li>
        <li class="icon__li">
          <div class="icon shopping-cart"></div>
          <span class="icon__name">장바구니</span>
        </li>
      </ul>
    `;
  }

  setEvent(targetNode) {
    setCategoryEvent(targetNode);
    setSearchEvent(targetNode);
  }
}

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
      fillRelatedSearchBox(relatedSearchBox.querySelector(".related-search-word-container"), searchInput.value);
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
        fillRelatedSearchBox(relatedSearchWordBox, searchInput.value);
        setRelatedSearchWordEvent(relatedSearchWordBox, searchInput);
      }
    }, 100)
  );
};

const fillRelatedSearchBox = async (parentNode, typeWord) => {
  const searchData = await fetchData("http://localhost:3000/searchData");
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

const renderRecentSearchBox = (parentNode) => {
  parentNode.innerHTML += /* html */ `
    <div class="recent-search-word-container">최근검색어</div>
    <ul class="recent-search-list">
    </ul>
    <div class="recent-search-footer">
      <div class="recent-search-delete-button">전체삭제</div>
      <div class="flexbox-blank"></div>
      <div class="recent-search-onoff-button">최근검색어끄기</div>
    </div>
  `;
};
const renderRelatedSearchBox = (parentNode) => {
  parentNode.innerHTML += /* html */ `
  <ul class="related-search-word-container">
  </ul>
  `;
};

const renderRelatedSearchWord = (parentNode, word) => {
  parentNode.innerHTML += /* html */ `
  <li class="related-search-word">${word}</li>
  `;
};

export default SearchBox;
