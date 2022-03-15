import { addClickEventToElement } from "./utils/utils.js";

const $selectCategoryWrap = document.querySelector(".select-category-wrap");
const $selectCategoryList = document.querySelector(".select-category-list");
const $selectToggle = document.querySelector(".select-toggle");
const $selectCategory = document.querySelector(".select-category");

$selectCategoryWrap.addEventListener("click", () => {
  if ($selectCategoryWrap.classList.contains("is-opned")) {
    $selectCategoryWrap.classList.remove("is-opned");
    $selectToggle.style.transform = "rotate(360deg)";
    $selectCategoryList.style.display = "none";
    return;
  }

  $selectCategoryWrap.classList.add("is-opned");
  $selectToggle.style.transform = "rotate(180deg)";
  $selectCategoryList.style.display = "block";
});

$selectCategoryList.addEventListener("click", (e) => {
  $selectCategory.textContent = e.target.textContent;
});
