import "../SCSS/style.scss";
import regeneratorRuntime from "regenerator-runtime";
import { selector } from "./util.js";

class FocusBlur {
  constructor(target, transformer) {
    this.target = target;
    this.transformer = transformer;
  }

  toggleTransformerHidden = () => {
    this.transformer.classList.toggle("hidden");
  };

  getFocusBlurEvent = () => {
    this.target.addEventListener("focus", this.toggleTransformerHidden);
    this.target.addEventListener("blur", this.toggleTransformerHidden);
  };
}

class CenterSearchBox extends FocusBlur {
  constructor(target, transformer) {
    super(target, transformer);
    this.relativeTitle = selector("h3", transformer);
    this.relativeList = selector("ul", transformer);
    this.relativeOption = selector("div", transformer);
    this.searchedKeyword;
  }

  getRefinedData = async (address, value = "") => {
    const dataAddress = __dirname + `data/${address}`;
    const data = await fetch(dataAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    });
    const refinedData = await data.json();
    return refinedData;
  };

  getRelativeListForm = () => {
    if (this.relativeTitle) {
      this.relativeTitle.remove();
      this.relativeOption.remove();
    }
  };

  changeRelativeList = (refinedData) => {
    const innerList = refinedData.reduce(
      (pre, post) => pre + `<li>${post}</li>`,
      ""
    );
    this.relativeList.innerHTML = innerList;
  };

  showRelativeData = async (value) => {
    const address = "keyword";
    const refinedData = await this.getRefinedData(address, value);
    !refinedData.length
      ? this.transformer.classList.add("hidden")
      : this.transformer.classList.remove("hidden");
    this.changeRelativeList(refinedData);
    this.getRelativeListForm();
  };

  showRecentData = async () => {
    const address = "recent";
    const refinedData = await this.getRefinedData(address);
    this.changeRelativeList(refinedData);
    this.transformer.append(
      this.relativeTitle,
      this.relativeList,
      this.relativeOption
    );
  };

  changeSearchKeyword = (selectedKeyword) => {
    this.target.value = selectedKeyword;
  };

  moveWithUpDown = (key) => {
    const childLists = [...this.relativeList.children];
    const selectedListIndex = childLists.findIndex((list) =>
      list.classList.contains("selected")
    );
    const isSelectedListIndex = selectedListIndex > -1;
    let nextListIndex;

    switch (key) {
      case "ArrowDown":
        if (!isSelectedListIndex) {
          nextListIndex = 0;
        } else {
          nextListIndex = childLists[selectedListIndex + 1]
            ? selectedListIndex + 1
            : 0;
          childLists[selectedListIndex].classList.remove("selected");
        }
        break;
      case "ArrowUp":
        if (!isSelectedListIndex) {
          nextListIndex = childLists.length - 1;
        } else {
          nextListIndex = childLists[selectedListIndex - 1]
            ? selectedListIndex - 1
            : childLists.length - 1;
          childLists[selectedListIndex].classList.remove("selected");
        }
        break;
    }
    childLists[nextListIndex].classList.add("selected");
    const selectedKeyword = childLists[nextListIndex].innerText;
    this.changeSearchKeyword(selectedKeyword);
  };

  handleKeyupEvent = async ({ target: { value }, key }) => {
    const upDownKey = ["ArrowDown", "ArrowUp"].includes(key);
    if (upDownKey) return this.moveWithUpDown(key);
    value === ""
      ? await this.showRecentData()
      : await this.showRelativeData(value);
  };

  getKeydownEvent = () => {
    this.target.addEventListener("keyup", this.handleKeyupEvent);
  };

  init = () => {
    this.getKeydownEvent();
    this.getFocusBlurEvent();
  };
}

const centerSearchInput = selector("input", selector(".center-search"));
const centerRelativeInfo = selector(".center-relative-info");
const centerSearchBoxHandler = new CenterSearchBox(
  centerSearchInput,
  centerRelativeInfo
);

centerSearchBoxHandler.init();
