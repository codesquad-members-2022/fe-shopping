import { delay } from "../util";
import { SearchBox } from "./SearchBox";
import { delayTime } from "../constant";
import { async } from "regenerator-runtime";

class SearchBoxKeyup extends SearchBox {
  constructor(target, transformer) {
    super(target, transformer);
    this.inputDelayController = null;
  }

  findRefinedData = async (address, value = "") => {
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

  drawRelativeListForm = () => {
    if (this.relativeTitle) {
      this.relativeTitle.remove();
      this.relativeOption.remove();
    }
  };

  drawListFromData = (data) => {
    return data.reduce((pre, post) => pre + `<li>${post}</li>`, "");
  };

  changeRelativeList = (refinedData) => {
    const innerList = this.drawListFromData(refinedData);
    this.relativeList.innerHTML = innerList;
  };

  waitInputDelay = async (delayTime) => {
    if (this.inputDelayController) this.inputDelayController.abort();

    this.inputDelayController = new AbortController();
    const inputDelaySignal = this.inputDelayController.signal;
    await delay({ time: delayTime, signal: inputDelaySignal });

    this.inputDelayController = null;
  };

  showRelativeList = async (value) => {
    const address = "keyword";
    const refinedData = await this.findRefinedData(address, value);
    const isRefinedData = refinedData.length;

    this.transformer.classList[isRefinedData ? "remove" : "add"]("hidden");
    this.changeRelativeList(refinedData);
    this.drawRelativeListForm();
  };

  drawRecentListForm = () => {
    this.transformer.classList.remove("hidden");
    this.transformer.append(
      this.relativeTitle,
      this.relativeList,
      this.relativeOption
    );
  };

  showRecentList = async () => {
    const address = "recent";
    const refinedData = await this.findRefinedData(address);

    this.changeRelativeList(refinedData);
    this.drawRecentListForm();
  };

  findNextListIndex = (key, childLists, selectedListIndex) => {
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

  findSelectedInChildren = () => {
    const childLists = [...this.relativeList.children];
    const selectedListIndex = childLists.findIndex((list) =>
      list.classList.contains("selected")
    );
    const selectedList = childLists[selectedListIndex];
    return { childLists, selectedListIndex, selectedList };
  };

  moveWithUpDown = (key) => {
    const { childLists, selectedListIndex } = this.findSelectedInChildren();
    const nextListIndex = this.findNextListIndex(
      key,
      childLists,
      selectedListIndex
    );

    childLists[nextListIndex].classList.add("selected");
    const selectedKeyword = childLists[nextListIndex].innerText;
    this.changeSearchKeyword(selectedKeyword);
  };

  showDataByInput = async (value) => {
    await this.waitInputDelay(delayTime);
    const isValueEmpty = value === "";
    isValueEmpty
      ? await this.showRecentList()
      : await this.showRelativeList(value);
  };

  handleKeyupEvent = async ({ target: { value }, key }) => {
    const isUpDown = ["ArrowDown", "ArrowUp"].includes(key);
    isUpDown ? this.moveWithUpDown(key) : this.showDataByInput(value);
  };

  init = () => {
    this.target.addEventListener("keyup", this.handleKeyupEvent);
  };
}

export { SearchBoxKeyup };
