import {
  createLiListTemplate,
  htmlString2htmlElement,
  targetQuerySelector,
} from "./util/util.js";
import { searchCategories } from "./data/data.js";

const $categories = createLiListTemplate(searchCategories);
const $search__categories__container = htmlString2htmlElement({
  tag: "ul",
  htmlString: $categories,
  className: "search__dropbox",
});

$search__categories__container.style.visibility = "hidden";

const htmlString = `
  <button class="search__delete">전체삭제</button>
  <button class="current__search__off">최근검색어끄기</button>
`;

const $search__word__dropbox = htmlString2htmlElement({
  htmlString,
  className: "search__word__dropbox",
});

const $search__category = targetQuerySelector({
  className: "search__category",
});

const $selected__category = targetQuerySelector({
  className: "selected__category",
});

const $search = targetQuerySelector({
  className: "search",
});

const $search__bar = targetQuerySelector({
  className: "search__bar",
});

$search__bar.insertAdjacentElement("afterend", $search__word__dropbox);
$search__word__dropbox.style.visibility = "hidden";

$search.addEventListener("focus", (event) => {
  $search__word__dropbox.style.visibility = "visible";
});

const $search__delete = targetQuerySelector({
  className: "search__delete",
});

const $current__search__off = targetQuerySelector({
  className: "current__search__off",
});

$selected__category.insertAdjacentElement(
  "afterend",
  $search__categories__container
);

document.addEventListener("click", ({ target }) => {
  const { visibility } = $search__categories__container.style;
  if (visibility === "visible") {
    $search__categories__container.style.visibility = "hidden";
    const $currentCategory = target.closest("li");

    // Todo : 함수화하여 이중if문을 if문 하나만 사용하도록 리팩토링
    if ($currentCategory?.parentNode === $search__categories__container) {
      const selectedCategoryText = $currentCategory.textContent;
      $selected__category.innerText = selectedCategoryText;
    }
  } else if (target === $search__category || target === $selected__category) {
    $search__categories__container.style.visibility = "visible";
  }
});

document.addEventListener("click", ({ target }) => {
  if (
    target === $search ||
    target === $search__delete ||
    target === $current__search__off
  ) {
    return;
  } else {
    $search__word__dropbox.style.visibility = "hidden";
  }
});

const $slideList = document.querySelector(".slide__list");
const $banner__category = document.querySelector(".banner__category");
const liCount = $slideList.childElementCount;
let count = 1;

const showNextSlide = (id) => {
  const remaindar = id % liCount;
  const moveNum = remaindar === 0 ? 0 : remaindar;
  console.log(moveNum);
  $slideList.style.transform = `translateX(-${moveNum * 100}vw)`;
  count = id;
  count += 1;
};

const sec = 3000;
setInterval(() => {
  showNextSlide(count);
}, sec);

$banner__category.addEventListener("mouseover", (event) => {
  const $category = event.target.closest("li");
  const currentId = $category.dataset.id - 1;
  showNextSlide(currentId);
});
