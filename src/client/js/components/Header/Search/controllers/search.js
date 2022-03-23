const handleBodyClick = ({ target }) => {
  const $searchCategoryList = document.body.querySelector(
    ".search__category-list"
  );
  const $target = target.closest(".search__category");
  const $searchCategory = document.body.querySelector(".search__category");

  const isSearchCategory = $target === $searchCategory;
  const isActingCategoryList =
    $searchCategoryList.classList.contains("list-act");
  const isClickOtherBody = !isSearchCategory && isActingCategoryList;

  if (isClickOtherBody) {
    $searchCategoryList.classList.remove("list-act");
  }
};

const handleSearchCategoryClick = ({ target }) => {
  const $searchCategory = target.closest(".search__category");
  const $searchCategoryList = $searchCategory.parentNode.querySelector(
    ".search__category-list"
  );
  $searchCategoryList.classList.toggle("list-act");
};

const handleCListTransStart = ({ target }) => {
  target.style.boxShadow = "0 4px 5px rgb(0 0 0 / 30%)";
  target.style.border = "1px #d1d8e0 solid";
};

const handleCListTransEnd = ({ target }) => {
  if (!target.classList.contains("list-act")) {
    target.style.boxShadow = "none";
    target.style.border = "none";
  }
};

export {
  handleBodyClick,
  handleSearchCategoryClick,
  handleCListTransStart,
  handleCListTransEnd,
};
