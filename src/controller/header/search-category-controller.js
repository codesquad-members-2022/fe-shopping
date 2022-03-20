export class SearchCategoryController {
  constructor() {
    this.$selectCategoryWrap = document.querySelector(".select-category-wrap");
    this.$selectCategoryList = document.querySelector(".select-category-list");
    this.$selectToggle = document.querySelector(".select-toggle");
    this.$selectCategory = document.querySelector(".select-category");
    this.dropdownToggle = false;
  }
  static toggle = false;
  addEvents() {
    this.$selectCategoryWrap.addEventListener("click", () =>
      categoryDropdownHandler(
        [
          this.$selectCategoryWrap,
          this.$selectToggle,
          this.$selectCategoryList,
        ],
        "is-opened"
      )
    );

    this.$selectCategoryList.addEventListener("click", (e) =>
      textContentHandler(e, "LI", this.$selectCategory)
    );

    document.addEventListener("click", (e) =>
      otherClickHandler(
        e,
        "select-category-wrap is-opened",
        [
          this.$selectCategoryWrap,
          this.$selectToggle,
          this.$selectCategoryList,
        ],
        "is-opened"
      )
    );
  }
}

const categoryDropdownHandler = (argArr, toggleClassName) => {
  argArr.forEach((v) => v.classList.toggle(toggleClassName));
  if (SearchCategoryController.toggle) {
    SearchCategoryController.toggle = false;
    return;
  } else {
    SearchCategoryController.toggle = true;
  }
};

const textContentHandler = (e, tagname, changed) => {
  if (e.target.tagName === tagname) {
    changed.textContent = e.target.textContent;
  }
};

const otherClickHandler = (e, matchedClassName, argArr, toggleClassName) => {
  if (e.target.parentNode.className !== matchedClassName) {
    if (SearchCategoryController.toggle) {
      argArr.forEach((v) => v.classList.toggle(toggleClassName));
      SearchCategoryController.toggle = false;
    }
  }
};
