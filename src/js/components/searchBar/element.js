import { $ } from '../../utils/utils.js';
class Element {
  constructor() {
    this.apiURL = 'http://localhost:3000/items';
    this.searchedItems = $('.searched-items');
    this.historyBtns = $('.history-btns');
    this.coupangSearch = $('.coupang-search');
    this.latestSearchContents = $('.latest-search-contents');
    this.historyOnOff = $('.history-onoff');
    this.deleteAllHistory = $('.delete-all-history-btn');
    this.latestSearchKwd = $('.latest-search-keyword');
    this.headerSearchForm = $('.headerSearchForm');
    this.latestList = $('ol');
  }
}

export { Element };