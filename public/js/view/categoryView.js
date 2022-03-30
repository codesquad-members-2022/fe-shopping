import { $ } from "../util/dom.js";
import { categoryData } from "../../data/data.js";

export const categoryView = {
  $categoryNav: $(".category-area").querySelector("ul"),

  init() {
    $(".category-button-items").addEventListener("mouseover", () => {
      console.log("mouse over");
    });

    this.loadCategories();
  },

  loadCategories() {
    this.$categoryNav.innerHTML =
      this.createElements(categoryData, "firstContent") +
      this.createElements(categoryData, "child");
  },

  createElements(data, content) {
    const elements = data.reduce((prev, cur) => {
      return (
        prev +
        `
      <li>
      <a href="#" class="content">
        <div class="parent">
          ${cur[content]}
        </div>
        </a>
      </li>
      `
      );
    }, "");

    return elements;
  },
};
