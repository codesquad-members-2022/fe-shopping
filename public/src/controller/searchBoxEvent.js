const setSearchBoxEvent = (searchBoxNode) => {
  const category = searchBoxNode.querySelector(".category__items");
  const searchBoxName = searchBoxNode.querySelector(".search-box__name");
  searchBoxNode.addEventListener("click", (e) => {
    if (category.classList.contains("visibility-hidden")) {
      category.classList.add("visibility-visible");
      category.classList.remove("visibility-hidden");
    } else {
      if (e.target.classList.contains("category__item")) {
        changeCategory(searchBoxName, e.target);
      }
      category.classList.add("visibility-hidden");
    }
  });
  document.addEventListener("click", (e) => {
    if (e.target.parentNode !== searchBoxNode && !category.classList.contains("visibility-hidden")) {
      category.classList.add("visibility-hidden");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !category.classList.contains("visibility-hidden")) {
      category.classList.add("visibility-hidden");
    }
  });
};

const changeCategory = (searchBoxNode, targetNode) => {
  searchBoxNode.firstChild.textContent = targetNode.firstChild.textContent;
};

export default setSearchBoxEvent;
