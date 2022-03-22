import { $, removeClass, addClass, delay, filterInputData, template, makeRelatedTemplate, addEvent } from "../../utils/utils.js";
import { Element } from "./element.js";
class AutoComplete extends Element {
  constructor() {
    super();
    this.apiURL = "http://localhost:3000/items";
  }

  init() {
    addEvent(this.coupangSearch, "input", this.inputEventHandler);
  }

  inputEventHandler = (e) => {
    if (!this.coupangSearch.value) {
      removeClass(this.latestSearchContents, "down");
      removeClass(this.historyBtns, "down");
      template(this.searchedItems, "");
    } else {
      addClass(this.latestSearchContents, "down");
      addClass(this.historyBtns, "down");
      delay(this.renderItems, this.apiURL);
    }
  };

  renderItems = (data) => {
    const userInput = this.coupangSearch.value;

    const relatedItems = filterInputData(data, userInput);

    const itemList = makeRelatedTemplate(relatedItems, userInput);

    if (this.coupangSearch.value) {
      template(this.searchedItems, itemList);
    }
  };
}

export { AutoComplete };
