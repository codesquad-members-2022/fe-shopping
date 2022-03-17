import { addClickEventToElement } from "./utils/utils.js";

//카테고리 클릭 이벤트
const $selectCategoryWrap = document.querySelector(".select-category-wrap");
const $selectCategoryList = document.querySelector(".select-category-list");
const $selectToggle = document.querySelector(".select-toggle");
const $selectCategory = document.querySelector(".select-category");

let categoryPop = false;
$selectCategoryWrap.addEventListener("click", () => {
  $selectCategoryWrap.classList.toggle("is-opened");
  $selectToggle.classList.toggle("is-opened");
  $selectCategoryList.classList.toggle("is-opened");
  if (categoryPop) {
    categoryPop = false;
    return;
  }
  categoryPop = true;
});

$selectCategoryList.addEventListener("click", (e) => {
  $selectCategory.textContent = e.target.textContent;
});

document.addEventListener("click", (e) => {
  if (e.target.parentNode.className !== "select-category-wrap is-opened") {
    if (categoryPop) {
      $selectCategoryWrap.classList.toggle("is-opened");
      $selectToggle.classList.toggle("is-opened");
      $selectCategoryList.classList.toggle("is-opened");
      categoryPop = false;
    }
  }
});

//seach 이벤트
const fakeDB = fetch("./data/fakeDB.json").then((res) => res.json());

const $searchInput = document.querySelector(".search-input");
const $searchList = document.querySelector(".search-list");

//최근 검색어
let keywordStorage = [];

$searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    localStorage.setItem(`${$searchInput.value}`, `${$searchInput.value}`);
    keywordStorage.push($searchInput.value);
    $searchInput.value = "";
  }
});

$searchInput.addEventListener("click", () => {
  if (!$searchInput.value) {
    $searchList.innerHTML = "";
    $searchList.innerHTML += `<div class="search-list__auto">최근 검색어</div>`;

    const length = keywordStorage.length - 1;
    for (let i = 0; i < 8; i++) {
      if (!keywordStorage[length - i]) break;

      const keyword = document.createElement("li");
      keyword.textContent = localStorage.getItem(keywordStorage[length - i]);
      $searchList.appendChild(keyword);
    }
  }
});

function storageClear() {
  keywordStorage = [];
  localStorage.clear();
}

// $searchInput.addEventListener("keyup", (e) => {
//   if (e.key === "Enter") {
//     $searchList.innerHTML = "";

//     fakeDB.then((json) => {
//       const searchList = json.products
//         .filter((v) => v["search-keyword"].includes($searchInput.value))
//         .sort((a, b) => b.views - a.views);

//       for (let i = 0; i < 10; i++) {
//         if (!searchList[i]) break;

//         const content = document.createElement("li");
//         content.textContent = searchList[i]["search-keyword"];
//         $searchList.appendChild(content);
//       }
//     });
//   }
// });
