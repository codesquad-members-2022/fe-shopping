export default class SearchEngine {
  constructor($inputTag) {
    this.input = $inputTag;
    this.$dropbox = document.querySelector("#search-dropbox-id");
    this.recentSearchArr = [];
    this.$recentSearch = document.querySelector("#recent-search-id");
    this.$needtoHide = document.querySelectorAll(".need-to-Hide");
    this.childNodesidx = 0;
    this.$searchInput = document.querySelector("#search-keyboard-id");
  }
  saveSearchingValue() {
    const inputValue = this.input.value;
    if (localStorage.length !== 0) {
      this.recentSearchArr = JSON.parse(localStorage.getItem("recentSearch"));
    }
    this.recentSearchArr.push(inputValue);
    localStorage.setItem("recentSearch", JSON.stringify(this.recentSearchArr));
  }
  async getSearchResult() {
    for (const content of this.$needtoHide) {
      content.classList.add("hide");
    }
    const response = await fetch("/data");
    const data = await response.json();
    const inputValue = this.input.value;
    for (const key in data) {
      if (key === inputValue.replace(/ /g, "")) {
        this.renderSearchResult(data[key]);
      }
    }
  }
  renderSearchResult(data) {
    this.removeRecentSearch();
    data.map((value) => this.renderData(value));
  }
  renderRecentSearch() {
    for (const content of this.$needtoHide) {
      content.classList.remove("hide");
    }
    let searchedValues;
    localStorage.length === 0
      ? (searchedValues = ["최근 검색어 기록이 없습니다."])
      : (searchedValues = JSON.parse(localStorage.getItem("recentSearch")));
    const sortedValuesArr = [...new Set(searchedValues)];
    sortedValuesArr.map((value) => this.renderData(value));
  }
  renderData(value) {
    const $searchedValue = document.createElement("div");
    if (typeof value === "string") {
      $searchedValue.innerHTML = value;
    } else {
      const valueArr = value.keyword.replace(/ /g, "").split("");
      const inputValue = this.input.value;
      for (let i = 0; i < inputValue.replace(/ /g, "").length; i++) {
        valueArr.shift();
      }
      const searchedValueText = `<span class="inputValue">${inputValue}</span>${valueArr.join(
        ""
      )}`;
      $searchedValue.insertAdjacentHTML("afterbegin", searchedValueText);
    }
    this.$recentSearch.appendChild($searchedValue);
  }
  changeFocus(command) {
    const focusedContent = this.$recentSearch.childNodes[this.childNodesidx];
    if (
      command === "down" &&
      this.childNodesidx < this.$recentSearch.childNodes.length - 1
    ) {
      this.childNodesidx++;
    } else if (command === "up" && this.childNodesidx !== 0) {
      this.childNodesidx--;
    }
    for (const childNode of this.$recentSearch.childNodes) {
      childNode.style.textDecoration = "none";
    }
    focusedContent.style.textDecoration = "underline";
    this.$searchInput.value = focusedContent.innerText;
  }
  deleteAllRecentSearch() {
    localStorage.clear();
    this.recentSearchArr = [];
    this.renderRecentSearch();
    this.hideDropbox();
  }

  showDropbox() {
    this.$dropbox.style.display = "flex";
  }
  hideDropbox() {
    this.$dropbox.style.display = "none";
  }

  removeRecentSearch() {
    while (this.$recentSearch.hasChildNodes()) {
      this.$recentSearch.removeChild(this.$recentSearch.firstChild);
    }
  }
}
