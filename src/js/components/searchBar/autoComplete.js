import { $, removeClass, addClass, delay, filterInputData, template, makeRelatedTemplate, addEvent } from '../../utils/utils.js';
import { Element } from './element.js';
class AutoComplete extends Element {
  constructor() {
    super();
    this.apiURL = 'http://localhost:3000/items';
  }

  init() {
    addEvent(this.coupangSearch, 'input', this.inputEventHandler);
  }
  
  inputEventHandler = (e) => {
      if (!this.coupangSearch.value) {
        addClass(this.searchedItems, 'down');
        removeClass(this.latestSearchContents, 'down');
        removeClass(this.historyBtns, 'down');
    } else {
      removeClass(this.searchedItems, 'down');
      addClass(this.latestSearchContents, 'down');
      addClass(this.historyBtns, 'down');
      }
      
    delay(this.renderItems, this.apiURL); 
  };

  
  renderItems = (data) => {     
    const userInput = this.coupangSearch.value;

    const relatedItems = filterInputData(data, userInput);
    
    const itemList = makeRelatedTemplate(relatedItems, userInput); 
    
    template(this.searchedItems, itemList);
  }
}  

export { AutoComplete };



