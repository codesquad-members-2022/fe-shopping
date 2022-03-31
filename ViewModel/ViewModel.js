import {
  targetQuerySelector,
  createLiListTemplate,
  htmlString2htmlElement,
} from "../util/util.js";
import { inputData } from "../data/data.js";

class ViewModel {
  constructor({
    categoriesDropBox,
    store,
    category,
    searchBarDropBox,
    searchBar,
    inputDropBox,
  }) {
    this.categoriesDropBox = categoriesDropBox;
    this.store = store;
    this.category = category;
    this.searchBarDropBox = searchBarDropBox;
    this.searchBar = searchBar;
    this.inputDropBox = inputDropBox;
  }

  handleClickSearchCatgory(target) {
    const $search__category = targetQuerySelector({
      className: "search__category",
    });

    if (
      !this.categoriesDropBox.$search__categories__container.classList.contains(
        "hidden"
      )
    ) {
      this.categoriesDropBox.render();
      const $currentCategory = target.closest("li");
      const selectedCategory = $currentCategory?.textContent;
      const isInCategoryDropBox =
        $currentCategory?.parentNode ===
        this.categoriesDropBox.$search__categories__container;

      if (isInCategoryDropBox) {
        selectedCategory &&
          this.store.setState({ ...this.store.state, selectedCategory });
        this.category.render(this.store.state.selectedCategory);
      }
    } else if (
      target === $search__category ||
      target === this.category.$selected__category
    ) {
      this.categoriesDropBox.render();
    }
  }

  appendDropBox(data) {
    const $categories = createLiListTemplate(data);
    this.categoriesDropBox.$search__categories__container =
      htmlString2htmlElement({
        tag: "ul",
        htmlString: $categories,
        className: "search__dropbox",
      });

    this.category.$selected__category = targetQuerySelector({
      className: "selected__category",
    });

    this.category.$selected__category.insertAdjacentElement(
      "afterend",
      this.categoriesDropBox.$search__categories__container
    );

    this.categoriesDropBox.render(this.store.state.isCategoryDropBoxVisible);
  }

  appendSearchBarDropBox() {
    this.store.setState({ ...this.store.state, isBarDropBoxVisible: false });
    const { isBarDropBoxVisible } = this.store.state;
    this.searchBarDropBox.render({ isBarDropBoxVisible });
  }

  handleClickOutDropBox() {
    this.store.setState({ ...this.store.state, isBarDropBoxVisible: false });
    const { isBarDropBoxVisible } = this.store.state;
    this.searchBarDropBox.render({ isBarDropBoxVisible });
  }

  handleKeyupKeywords() {
    let index = 0;
    const $ul = this.searchBarDropBox.$search__word__dropbox.children[0];
    const keywords = $ul.children;
    const keywordsLen = keywords.length;
    let previousKeywordIdx = -1;

    this.searchBar.$search.addEventListener("keyup", ({ code }) => {
      if (code === "ArrowDown") {
        let currentKeywordIdx = index % keywordsLen;
        keywords[currentKeywordIdx].style.textDecoration = "underline";
        this.store.setState({
          ...this.store.state,
          keyword: keywords[currentKeywordIdx].textContent,
        });
        const { keyword } = this.store.state;
        this.searchBar.render({ keyword });
        if (previousKeywordIdx >= 0) {
          this.store.setState({
            ...this.store.state,
            keyupKeyword: [previousKeywordIdx, "none"],
          });
          const { keyupKeyword } = this.store.state;
          this.searchBarDropBox.render({ keyupKeyword });
        }
        previousKeywordIdx = currentKeywordIdx;
        index += 1;
      } else if (code === "ArrowUp") {
        let currentKeywordIdx =
          (index - 1) % keywordsLen === 0 ? index : (index - 1) % keywordsLen;
        previousKeywordIdx = currentKeywordIdx - 1;
        if (previousKeywordIdx >= 0 && keywords[previousKeywordIdx]) {
          this.store.setState({
            ...this.store.state,
            keyupKeyword: [previousKeywordIdx, "underline"],
          });
          const { keyupKeyword } = this.store.state;
          this.searchBarDropBox.render({ keyupKeyword });
        } else if (previousKeywordIdx < 0) {
          this.store.setState({
            ...this.store.state,
            keyupKeyword: [0, "none"],
          });
          const { keyupKeyword } = this.store.state;
          this.searchBarDropBox.render({ keyupKeyword });
        }
        if (currentKeywordIdx > 0) {
          this.store.setState({
            ...this.store.state,
            keyupKeyword: [currentKeywordIdx, "none"],
          });
          const { keyupKeyword } = this.store.state;
          this.searchBarDropBox.render({ keyupKeyword });
        } else {
          this.store.setState({
            ...this.store.state,
            keyupKeyword: [0, "none"],
          });
          const { keyupKeyword } = this.store.state;
          this.searchBarDropBox.render({ keyupKeyword });
          return;
        }
        const keyword = keywords[previousKeywordIdx]
          ? keywords[previousKeywordIdx].textContent
          : null;

        this.store.setState({
          ...this.store.state,
          keyword,
        });

        this.searchBar.render({ keyword });
        currentKeywordIdx = previousKeywordIdx;
        index -= 1;
      }
    });
  }

  handleFocusInput() {
    this.store.setState({
      ...this.store.state,
      isBarDropBoxVisible: true,
    });
    const { isBarDropBoxVisible } = this.store.state;
    this.searchBarDropBox.render({ isBarDropBoxVisible });
  }

  // Todo: arrowDown인 경우와 arrowUp인 경우를 각각 함수화 하거나 전체 로직 다시 작성하기
  handleChangeInput() {
    this.searchBar.$search.addEventListener("keyup", (event) => {
      const word = event.target.value;
      this.searchBarDropBox.$search__word__dropbox.style.visibility = "hidden";
      let keywordData;

      if (inputData[word]) {
        keywordData = inputData[word].map(({ keyword }) => keyword);
      }

      this.inputDropBox?.$search__word__dropbox?.remove(); // Todo: dom추가/제거 방식이 아닌 데이터 바꿀때 리렌더링되도록 개선할 수 있을까?

      if (!keywordData) {
        const isBarDropBoxVisible = true;
        this.store.setState({
          ...this.store.state,
          isBarDropBoxVisible,
        });
        this.searchBarDropBox.render({ isBarDropBoxVisible });
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

      this.inputDropBox.$search__word__dropbox = htmlString2htmlElement({
        htmlString,
        className: "search__word__dropbox",
      });

      this.inputDropBox.$search__word__dropbox.hasChildNodes() &&
        $search__bar.insertAdjacentElement(
          "afterend",
          this.inputDropBox.$search__word__dropbox
        );
      const isBarDropBoxVisible = true;
      this.store.setState({
        ...this.store.state,
        isBarDropBoxVisible,
      });
      this.inputDropBox.render(isBarDropBoxVisible);
    });
  }
}

export default ViewModel;
