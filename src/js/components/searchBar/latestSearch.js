import { $, removeClass, addClass, delay, filterInputData, template, makeRelatedTemplate, addEvent, webStorage } from '../../utils/utils.js';
import { Element } from './element.js';
class latestSearchBar extends Element {
  constructor() {
    super();
    this.searchedItemsArr = [];
    this.onOffState = false;
  }
  
  init() {
    this.latestSearch();
  }
  
  latestSearch() {
    addEvent(this.headerSearchForm, 'submit', this.submitEventHandler);
    addEvent(this.deleteAllHistory, 'click', this.deleteEventHandler);
    addEvent(this.historyOnOff, 'click', this.historyBtnHandler);
  }

  submitEventHandler = (e) => {
    e.preventDefault();
    addClass(this.searchedItems, 'down');
    addClass(this.latestSearchContents, 'up');
    removeClass(this.latestSearchContents, 'down');
    removeClass(this.historyBtns, 'down');
    console.log(this.onOffState)
    
    if(!this.onOffState) {
      const userInput = this.coupangSearch.value;
      this.searchedItemsArr.unshift(userInput);
      webStorage.set('searchedItems', this.searchedItemsArr);
      const searchedList = JSON.parse(webStorage.get('searchedItems')).reduce((acc, el, idx) => {
        return acc + `<li>${el}</li>`;
      }, '');
      console.log(searchedList)
      template($('ol'), searchedList); //template에 this를 쓰면 전에 기억하고있는 node가 됨
    }
  }

  deleteEventHandler = (e) => {
    webStorage.clear('searchedItems');
    template(this.latestList, '');
    this.searchedItemsArr = [];
  }

  historyBtnHandler = (e) => {
    if (this.onOffState) { //기능 꺼져있음
      this.onOffState = false;
      removeClass(this.latestSearchKwd, 'size-auto');
      removeClass(this.historyBtns, 'fixTop');
      template(this.historyOnOff, '최근검색어끄기');
      template(this.latestSearchContents, `<h3><span>최근</span> 검색어</h3><ol><li></li></ol>`);
    } else { //기능 켜져있음
      this.searchedItemsArr = [];  
      template(this.latestSearchContents, `<span class="history-off-msg">최근 검색어 저장 기능이 꺼져 있습니다.</span>`);
      addClass(this.latestSearchKwd, 'size-auto');
      addClass(this.searchedItems, 'down');
      addClass(this.historyBtns, 'fixTop');
      template(this.historyOnOff, '최근검색어켜기');
      this.onOffState = true;
    }      
  }
}


export { latestSearchBar };