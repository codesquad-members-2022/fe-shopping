import { delay } from "../util";
import { SearchBox } from "./SearchBox";

class SearchBoxKeyup extends SearchBox {
  constructor(target, transformer) {
    super(target, transformer);
    this.delayCount = 0;
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

  checkDelay = async () => {
    this.delayCount++;
    await delay(500);
    this.delayCount--;
    if (this.delayCount) return true;
  };

  showRelativeData = async (value) => {
    if (await this.checkDelay()) return;

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

  getNextListIndex = (key, childLists, selectedListIndex) => {
    const isSelectedListIndex = selectedListIndex > -1;
    const keyIndex = {
      ArrowDown: {
        noTarget: 0,
        isTarget: selectedListIndex + 1,
      },
      ArrowUp: {
        noTarget: childLists.length - 1,
        isTarget: selectedListIndex - 1,
      },
    };
    const { noTarget, isTarget } = keyIndex[key];
    let nextListIndex;

    if (!isSelectedListIndex) {
      nextListIndex = noTarget;
    } else {
      nextListIndex = childLists[isTarget] ? isTarget : noTarget;
      childLists[selectedListIndex].classList.remove("selected");
    }

    return nextListIndex;
  };

  changeSearchKeyword = (selectedKeyword) => {
    this.target.value = selectedKeyword;
  };

  getSelectedInChildren = () => {
    const childLists = [...this.relativeList.children];
    const selectedListIndex = childLists.findIndex((list) =>
      list.classList.contains("selected")
    );
    const selectedList = childLists[selectedListIndex];
    return { childLists, selectedListIndex, selectedList };
  };

  moveWithUpDown = (key) => {
    const { childLists, selectedListIndex } = this.getSelectedInChildren();
    const nextListIndex = this.getNextListIndex(
      key,
      childLists,
      selectedListIndex
    );

    childLists[nextListIndex].classList.add("selected");
    const selectedKeyword = childLists[nextListIndex].innerText;
    this.changeSearchKeyword(selectedKeyword);
  };

  handleKeyupEvent = async ({ target: { value }, key }) => {
    const isUpDown = ["ArrowDown", "ArrowUp"].includes(key);
    if (isUpDown) return this.moveWithUpDown(key);

    const isValueEmpty = value === "";
    isValueEmpty
      ? await this.showRecentData()
      : await this.showRelativeData(value);
  };

  getKeyupEvent = () => {
    this.target.addEventListener("keyup", this.handleKeyupEvent);
  };

  init = () => {
    this.getKeyupEvent();
  };
}

export { SearchBoxKeyup };
