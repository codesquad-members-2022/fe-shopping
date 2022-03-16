class DropBox {
  constructor($element) {
    this.element = $element;
    this.$tag = document.querySelector(`#${this.element}`);
  }
  showDropbox() {
    if (this.$tag.style.display === "none") {
      Object.assign(this.$tag.style, {
        display: "block",
        height: "508px",
      });
    } else {
      Object.assign(this.$tag.style, {
        display: "none",
        height: "0px",
      });
    }
  }
}
export class SearchBarDropBox extends DropBox {
  constructor($element) {
    super($element);
    this.$tag = document.querySelector(`#${this.element}`);
  }

  changeContentText(target) {
    const $searchBarContent = document.querySelector("#search-bar-content-id");
    $searchBarContent.innerHTML = target.innerHTML;
  }
}

export class CategoryDropBox extends DropBox {
  constructor($element) {
    super($element);
  }
}
