import Element from "./Element.js";
import {
  createLiListTemplate,
  htmlString2htmlElement,
  targetQuerySelector,
} from "../util/util.js";

class SearchBarDropBox extends Element {
  constructor() {
    super();
    this.$search = null;
    this.$search__word__dropbox = null;
  }

  appendElement({ data = "" }) {
    this.$search = targetQuerySelector({
      className: "search",
    });

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

    this.$search__word__dropbox = htmlString2htmlElement({
      htmlString,
      className: "search__word__dropbox",
    });

    $search__bar.insertAdjacentElement("afterend", this.$search__word__dropbox);
    this.$search__word__dropbox.style.visibility = "hidden";
  }

  onClickDocumentWhenDropDown() {
    const $search__delete = targetQuerySelector({
      className: "search__delete",
    });

    const $current__search__off = targetQuerySelector({
      className: "current__search__off",
    });

    document.addEventListener("click", ({ target }) => {
      if (
        target === this.$search ||
        target === $search__delete ||
        target === $current__search__off
      ) {
        return;
      } else {
        this.$search__word__dropbox.style.visibility = "hidden";
      }
    });
  }

  onKeyupKeywords({ showKeyword }) {
    let index = 0;
    const $ul = this.$search__word__dropbox.children[0];
    const keywords = $ul.children;
    const keywordsLen = keywords.length;
    let previousKeywordIdx = -1;

    this.$search.addEventListener("keyup", ({ code }) => {
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

  render() {
    this.$search__word__dropbox.style.visibility = "visible";
  }
}

export default SearchBarDropBox;
