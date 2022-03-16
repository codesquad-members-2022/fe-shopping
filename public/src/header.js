const fakeDB = fetch("http://localhost:3000/fakeDB")
  .then((res) => res.json());

const $input = document.querySelector('.coupang-search');
const $historyList = document.querySelectorAll('.latest-search-keyword>ol>li')
console.log($input)
$historyList[0].innerHTML = '2'
console.log($historyList[0])
$input.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {   //엔터 누르면 아래 기록 다 사라지고 결과창 렌더
    $historyList.forEach((list, idx) => {
      list.innerHTML = "";
    });
  }
  console.log($input.value)
  fakeDB.then((json) => {
    console.log(json)
    const filteredItems = json.items
      .filter(v => v["name"].includes($input.value))
      .sort((a, b) => b.views - a.views);
    for (let i = 0; i < filteredItems.length; i++) {
      $historyList[i].innerHTML = filteredItems[i].name;
    }
  });
});