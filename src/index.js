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

const fakeDB = fetch("./data/fakeDB.json").then((res) => res.json());

const $searchInput = document.querySelector(".search-input");
const $searchList = document.querySelector(".search-list");

$searchInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    $searchList.innerHTML = "";

    fakeDB.then((json) => {
      const searchList = json.products
        .filter((v) => v["search-keyword"].includes($searchInput.value))
        .sort((a, b) => b.views - a.views);

      for (let i = 0; i < 10; i++) {
        if (!searchList[i]) break;

        const content = document.createElement("li");
        content.textContent = searchList[i]["search-keyword"];
        $searchList.appendChild(content);
      }
    });
  }
});
