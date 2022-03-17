//input 값이 들어오면 연관검색어 노드를 display 해주고
//값이 없으면 최근 검색어 노드를 display 나머진 display:none;


const fakeDB = fetch("http://localhost:3000/fakeDB")
  .then((res) => res.json());

const $input = document.querySelector('.coupang-search');
const $latestSearchKeywd = document.querySelector('.latest-search-keyword');
const $latestSearchContent = document.querySelector('.latest-search-contents');
const $searchedItems = document.querySelector('.searched-items');
const $latestSearch = document.querySelector('.latest-search');
const $headerSearchForm = document.querySelector('.headerSearchForm');
const $latestSearchList = document.querySelector('ol');
const $deleteAllBtn = document.querySelector('.delete-all-history-btn');
const $historyBtns = document.querySelector('.history-btns');
const $historyOnOff = document.querySelector('.history-onoff');
//연관 기능 검색

document.addEventListener('click', ( e ) => {  
  console.log(e.target);
  if (e.target === $input) {
    $latestSearch.classList.remove('down');
    $latestSearch.classList.add('up');
  } else if(e.target.closest('.latest-search')) { //부모요소에 latest Search가 있으면 true 리턴
    return;
  } else {
    $latestSearch.classList.remove('up');
    $latestSearch.classList.add('down');
  }
})


$input.addEventListener('input', (word) => {
  if (!$input.value) {
    $searchedItems.classList.add('down');
    $latestSearchContent.classList.remove('down');
    $historyBtns.classList.remove('down');
  } else {
    $searchedItems.classList.remove('down');
    $latestSearchContent.classList.add('down');
    $historyBtns.classList.add('down');
  }
  
  const userInput = $input.value;
  
  fakeDB.then(json => {
    const relatedItems = json.items
      .filter(v => v["name"].includes($input.value))
      .sort((a, b) => b.views - a.views);

    const itemList = relatedItems.reduce((acc, el, idx) => {
      const [unrelatedHead, unrelatedTail] = el.name.split($input.value);  //유저 입력값만 색깔을 바꿔주기 위해 head와 tail로 나눔
      return acc + `<a href="#">${unrelatedHead}<span class="related-word">${$input.value}</span>${unrelatedTail}</a>`;
    },'');
    $searchedItems.innerHTML = itemList; 
  
  });
})

//submit한 데이터를 localStorage에 저장했다가 받아와서 출력
function latestSearch() {
  
  let searchedItems = [];
  $headerSearchForm.addEventListener('submit', (search) => {
    //최근 검색어 저장
    search.preventDefault();
    $searchedItems.classList.add('down');
    $latestSearchContent.classList.add('up');
    $latestSearchContent.classList.remove('down');
    $historyBtns.classList.remove('down');
    
    if(!$historyOnOff.classList.contains('off')) {
      searchedItems.unshift($input.value);
      localStorage.setItem('searchedItems', JSON.stringify(searchedItems));
      
      const searchedList = JSON.parse(localStorage.getItem('searchedItems')).reduce((acc, el, idx) => {
        return acc + `<li>${el}</li>`;
      }, '');
      const $latestSearchList = document.querySelector('ol');
      $latestSearchList.innerHTML = searchedList;
    }
  });
  $deleteAllBtn.addEventListener('click', (e) => {
    localStorage.removeItem('searchedItems');
    $latestSearchList.innerHTML = '';
    searchedItems = [];
  })
  $historyOnOff.addEventListener('click', (e) => {

    if ($historyOnOff.classList.contains('off')) {
      $historyOnOff.classList.remove('off');
      $latestSearchKeywd.classList.remove('size-auto');
      $historyBtns.classList.remove('fixTop');
      $latestSearchContent.innerHTML = `<h3><span>최근</span> 검색어</h3><ol><li></li></ol>`
    } else {
      searchedItems = [];  
      $latestSearchContent.innerHTML = `<span class="history-off-msg">최근 검색어 저장 기능이 꺼져 있습니다.</span>`
        $latestSearchKeywd.classList.add('size-auto');
        $searchedItems.classList.add('down');
        $historyBtns.classList.add('fixTop');
        $historyOnOff.innerHTML = '최근검색어켜기';
        $historyOnOff.classList.add('off');
    }
    
  })
}

latestSearch()

