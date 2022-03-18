//input 값이 들어오면 연관검색어 노드를 display 해주고
//값이 없으면 최근 검색어 노드를 display 나머진 display:none;
import {$, removeClass, addClass }  from '../../utils/utils.js';
import { RenderHistoryBar } from "./historyBar.js";
import { AutoComplete } from "./autoComplete.js";
import { latestSearchBar } from "./latestSearch.js";
//연관 기능 검색
class SearchBar {
  constructor() {
    this.apiURL = 'http://localhost:3000/items';
  }

  init() {
    let historyBar = new RenderHistoryBar();
    let autocomplt = new AutoComplete();
    let latestBar = new latestSearchBar();
    latestBar.init();
    autocomplt.init();
    historyBar.init();
  }
}

//   latestSearch() {
//     let searchedItems = [];
//     $('.headerSearchForm').addEventListener('submit', (search) => {
//       //최근 검색어 저장
//       search.preventDefault();
//       $('.searched-items').classList.add('down');
//       $('.latest-search-contents').classList.add('up');
//       $('.latest-search-contents').classList.remove('down');
//       $('.history-btns').classList.remove('down');
      
//       if(!$('.history-onoff').classList.contains('off')) {
//         searchedItems.unshift($('.coupang-search').value);
//         localStorage.setItem('searchedItems', JSON.stringify(searchedItems));
        
//         const searchedList = JSON.parse(localStorage.getItem('searchedItems')).reduce((acc, el, idx) => {
//           return acc + `<li>${el}</li>`;
//         }, '');
//         $('ol').innerHTML = searchedList;
//       }
//     });
    
//     $('.delete-all-history-btn').addEventListener('click', (e) => {
//       localStorage.removeItem('searchedItems');
//       $('ol').innerHTML = '';
//       searchedItems = [];
//     })

//     $('.history-onoff').addEventListener('click', (e) => {
//       if ($('.history-onoff').classList.contains('off')) {
//         $('.history-onoff').classList.remove('off');
//         $('.latest-search-keyword').classList.remove('size-auto');
//         $('.history-btns').classList.remove('fixTop');
//         $('.history-onoff').innerHTML = '최근검색어끄기';
//         $('.latest-search-contents').innerHTML = `<h3><span>최근</span> 검색어</h3><ol><li></li></ol>`
//       } else {
//           searchedItems = [];  
//           $('.latest-search-contents').innerHTML = `<span class="history-off-msg">최근 검색어 저장 기능이 꺼져 있습니다.</span>`
//           $('.latest-search-keyword').classList.add('size-auto');
//           $('.searched-items').classList.add('down');
//           $('.history-btns').classList.add('fixTop');
//           $('.history-onoff').innerHTML = '최근검색어켜기';
//           $('.history-onoff').classList.add('off');
//       }      
//     })
//   }
// }


export { SearchBar };