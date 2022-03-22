import Element from "./Element.js";
import {
  createLiListTemplate,
  htmlString2htmlElement,
  targetQuerySelector,
} from "../util/util.js";

class SearchBarDropBox extends Element {
  constructor() {
    super();
    this.$search__word__dropbox = null;
  }

  appendElement({ data = "" }) {
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

  onClickDocumentWhenDropDown({ handleClickOutDropBox }) {
    handleClickOutDropBox();
  }

  onKeyupKeywords({ handleKeyupKeywords }) {
    handleKeyupKeywords();
  }

  render() {
    this.$search__word__dropbox.style.visibility = "visible";
  }
}

export default SearchBarDropBox;
