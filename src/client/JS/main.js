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

  moveWithUpDown = () => {
    const childLists = [...this.relativeList.children];
    console.log(this.relativeList);
    const selectedList = childLists.find((list) =>
      list.classList.contains("selected")
    );
  };

  handleKeyupEvent = async ({ target: { value }, key }) => {
    const upDownKey = ["ArrowDown", "ArrowUp"].find(
      (direction) => direction === key
    );
    if (upDownKey) return this.moveWithUpDown(upDownKey);
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
