const fakeDB = fetch("http://localhost:3000/fakeDB")
  .then((res) => res.json());

// const $('.coupang-search') = document.querySelector('.coupang-search');
const $historyList = document.querySelector('.latest-search-keyword')


function historyBar(className) {
  this.className = className;
}

historyBar.prototype.template = function () {
  if (this.className === "latest-search-contents") {
    const node = new makeNode();
    // const node2 = new makeNode();
    node.createNode(div, this.className);
    node.appendNode(`<h3>                   
                      <span>최근</span>
                          "검색어"
                    </h3>`);
    return node;

    
    //   `<div class="latest-search-contents">
    //   <h3>                   
    //     <span>최근</span>
    //     "검색어"
    //   </h3>
    //   <ol>
    //   </ol>
    // </div>`
    // } else if (this.className === "searched-items") {
    //   return `<div class="searched-items">
    //             <a href="#"></a>
    //           </div>`
    // }
  }
}

function makeNode() {
  this.node = null;
}

makeNode.prototype.createNode = function (tagName, className) {
  const nodeTag = document.createElement(`${tagName}`);
  if (className) {    
    nodeTag.classList.add(`${className}`);
  }
  
  this.node = nodeTag;
}

makeNode.prototype.appendNode = function (content) {
  const nodeText = document.createTextNode(`${content}`);
  this.node.appendChild(nodeText);
  
}

function historyBar(className) {
  this.className = className;
}

function makenode(tagName, className) {
  const node = document.createElement(`${tagName}`);
  if (className) {    
    node.classList.add(`${className}`);
  }
  return node;
}
function appendText(node, content) {
  const nodeText = document.createTextNode(`${content}`);
  node.appendChild(nodeText);
}
function appendnode(parentNode, childNodeArr) {
  childNodeArr.forEach(el => {
    parentNode.appendChild(el);
  });
}
const div = makenode('div', 'latest-search-contents');
const h3 = makenode('h3');
const span = makenode('span');
const ol = makenode('ol');
appendText(span, '최근 검색어');
appendnode(div, [h3, ol]);


$('.coupang-search').addEventListener('keyup', (e) => {
  // let historyBarTpl = new historyBar("latest-search-contents");
  // let historyBarTpl2 = new historyBar("searched-items");
  
  if (e.keyCode === 13) {   //엔터 누르면 아래 기록 다 사라지고 결과창 렌더
    $historyList.innerHTML = '';
    // console.log(historyBarTpl.template())
  }
  const $historyListOl = document.querySelector('.latest-search-keyword>div>ol');
  $historyListOl.innerHTML = '';
  console.log(1111, $historyListOl)
  const $liAll = document.querySelectorAll('.latest-search-keyword>div>ol>li');

  fakeDB.then((json) => {

    const filteredItems = json.items
      .filter(v => v["name"].includes($('.coupang-search').value))
      .sort((a, b) => b.views - a.views);
    console.log(filteredItems)
    filteredItems.forEach(node => {
      console.log($liAll)
      const li = makenode('li');
      let nodeText = document.createTextNode(`${node.name}`);
      for (let i = 0; i < $liAll.length; i++) {
        if ($liAll[i].innerHTML !== node.name) {
          
          li.appendChild(nodeText);
          $historyListOl.appendChild(li);          
          break;
        }
      }
      
      
    })
    // $liAll.forEach(el => {
    //   if (!el.innerHTML.includes($input.value)) {
    //     el.innerHTML = '';
    //   }

    // })
  });
});



function makeNode() {
  this.node = null;
}

makeNode.prototype.createNode = function (tagName, className) {
  const nodeTag = document.createElement(`${tagName}`);
  if (className) {    
    nodeTag.classList.add(`${className}`);
  }
  
  this.node = nodeTag;
}

makeNode.prototype.appendNode = function (content) {
  const nodeText = document.createTextNode(`${content}`);
  this.node.appendChild(nodeText);
  
}

function historyBar(className) {
  this.className = className;
}