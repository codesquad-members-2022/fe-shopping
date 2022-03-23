export class SearchCategoryController {
  constructor() {
    this.$selectCategoryWrap = document.querySelector(".select-category-wrap");
    this.$selectCategoryList = document.querySelector(".select-category-list");
    this.$selectToggle = document.querySelector(".select-toggle");
    this.$selectCategory = document.querySelector(".select-category");
    this.dropdownToggle = false;
  }

  categoryDropdownHandler(argArr) {
    argArr.forEach((v) => v.classList.toggle("is-opened"));
    if (this.dropdownToggle) {
      this.dropdownToggle = false;
      return;
    } else {
      this.dropdownToggle = true;
    }
  }

  textContentHandler(e, tagname, changed) {
    if (e.target.tagName === tagname) {
      changed.textContent = e.target.textContent;
    }
  }

  otherClickHandler(e, argArr) {
    if (e.target.parentNode.className !== "select-category-wrap is-opened") {
      if (this.dropdownToggle) {
        argArr.forEach((v) => v.classList.remove("is-opened"));
        this.dropdownToggle = false;
      }
    }
  }

  addEvents() {
    this.$selectCategoryWrap.addEventListener("click", () =>
      this.categoryDropdownHandler([
        this.$selectCategoryWrap,
        this.$selectToggle,
        this.$selectCategoryList,
      ])
    );

    this.$selectCategoryList.addEventListener("click", (e) =>
      this.textContentHandler(e, "LI", this.$selectCategory)
    );

    document.addEventListener("click", (e) =>
      this.otherClickHandler(e, [
        this.$selectCategoryWrap,
        this.$selectToggle,
        this.$selectCategoryList,
      ])
    );
  }
}
