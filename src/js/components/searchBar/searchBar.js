//input 값이 들어오면 연관검색어 노드를 display 해주고
//값이 없으면 최근 검색어 노드를 display 나머진 display:none;
import { $, $$ } from '../../utils/querySelector.js';


//연관 기능 검색
class SearchBar {
  constructor() {
  }

  init() {
    this.renderHistoryBar();
    this.latestSearch();
  }

  renderHistoryBar() {
    document.addEventListener('click', (e) => {      
      if (e.target === $('.coupang-search')) {
        $('.latest-search').classList.remove('down');
      $('.latest-search').classList.add('up');
    } else if(e.target.closest('.latest-search')) { //부모요소에 latest Search가 있으면 true 리턴
      return;
    } else {
      $('.latest-search').classList.remove('up');
      $('.latest-search').classList.add('down');
    }
  })
  
  $('.coupang-search').addEventListener('click', (e) => {
    const delay = () => {
      return new Promise((resolve) =>
        setTimeout(() => {
          const fakeDB = fetch("http://localhost:3000/fakeDB")
            .then((res) => res.json());
            resolve(fakeDB);
          }, 500)
          );
    };
    delay().then((data) => this.inputEvent(data));
  })
  }

  inputEvent(data) {
    $('.coupang-search').addEventListener('input', (word) => {
      if (!$('.coupang-search').value) {
        $('.searched-items').classList.add('down');
        $('.latest-search-contents').classList.remove('down');
      $('.history-btns').classList.remove('down');
    } else {
      $('.searched-items').classList.remove('down');
      $('.latest-search-contents').classList.add('down');
      $('.history-btns').classList.add('down');
    }
    
    const userInput = $('.coupang-search').value;
  
      const relatedItems = data.items
        .filter(v => v["name"].includes($('.coupang-search').value))
        .sort((a, b) => b.views - a.views);
  
      const itemList = relatedItems.reduce((acc, el) => {
        const [unrelatedHead, unrelatedTail] = el.name.split($('.coupang-search').value);  //유저 입력값만 색깔을 바꿔주기 위해 head와 tail로 나눔
        return acc + `<a href="#">${unrelatedHead}<span class="related-word">${$('.coupang-search').value}</span>${unrelatedTail}</a>`;
      },'');
      $('.searched-items').innerHTML = itemList;       
    });
  }

  latestSearch() {
    let searchedItems = [];
    $('.headerSearchForm').addEventListener('submit', (search) => {
      //최근 검색어 저장
      search.preventDefault();
      $('.searched-items').classList.add('down');
      $('.latest-search-contents').classList.add('up');
      $('.latest-search-contents').classList.remove('down');
      $('.history-btns').classList.remove('down');
      
      if(!$('.history-onoff').classList.contains('off')) {
        searchedItems.unshift($('.coupang-search').value);
        localStorage.setItem('searchedItems', JSON.stringify(searchedItems));
        
        const searchedList = JSON.parse(localStorage.getItem('searchedItems')).reduce((acc, el, idx) => {
          return acc + `<li>${el}</li>`;
        }, '');
        $('ol').innerHTML = searchedList;
      }
    });
    
    $('.delete-all-history-btn').addEventListener('click', (e) => {
      localStorage.removeItem('searchedItems');
      $('ol').innerHTML = '';
      searchedItems = [];
    })

    $('.history-onoff').addEventListener('click', (e) => {
      if ($('.history-onoff').classList.contains('off')) {
        $('.history-onoff').classList.remove('off');
        $('.latest-search-keyword').classList.remove('size-auto');
        $('.history-btns').classList.remove('fixTop');
        $('.history-onoff').innerHTML = '최근검색어끄기';
        $('.latest-search-contents').innerHTML = `<h3><span>최근</span> 검색어</h3><ol><li></li></ol>`
      } else {
          searchedItems = [];  
          $('.latest-search-contents').innerHTML = `<span class="history-off-msg">최근 검색어 저장 기능이 꺼져 있습니다.</span>`
          $('.latest-search-keyword').classList.add('size-auto');
          $('.searched-items').classList.add('down');
          $('.history-btns').classList.add('fixTop');
          $('.history-onoff').innerHTML = '최근검색어켜기';
          $('.history-onoff').classList.add('off');
      }      
    })
  }
}


export { SearchBar };