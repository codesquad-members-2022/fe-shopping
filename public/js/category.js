const headerCategoryTitle = document.querySelector(".header__choosecategory");
const categoryList = document.querySelector(".header__categorylist");
const categoryTitle = document.querySelector(".header__categorytitle");
const categoryIcon = document.querySelector(".check");

headerCategoryTitle.addEventListener("click", function () {
  categoryList.classList.toggle("show");
  categoryIcon.classList.toggle("showCheck");
});

categoryList.addEventListener("click", function (event) {
  let value = event.target.textContent;
  categoryTitle.innerText = value;
});

export { categoryList, headerCategoryTitle };
