const setSearchBoxEvent = (searchBoxNode) => {
  const category = searchBoxNode.querySelector(".category__items");
  const searchBoxName = searchBoxNode.querySelector(".search-box__name");
  searchBoxNode.addEventListener("click", (e) => {
    if (!category.classList.contains("display-none")) {
      changeCategory(searchBoxName, e.target);
    } else {
      category.classList.remove("display-none");
    }
  });
  document.addEventListener("click", (e) => {
    if (e.target.parentNode !== searchBoxNode && !category.classList.contains("display-none")) {
      category.classList.add("display-none");
    }
  });
};

const changeCategory = (searchBoxNode, targetNode) => {
  searchBoxNode.firstChild.textContent = targetNode.firstChild.textContent;
};

export default setSearchBoxEvent;
