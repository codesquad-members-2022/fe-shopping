import { dummyDic } from "../DB/miniDictionaryData.js";

const main = document.querySelector('main');
const searchBar = document.querySelector('.search-bar');
// const newDummyDicValue = Object.values(dummyDic);

const wordList = {
    // Object.assign() : The Object.assign() method copies all enumerable own properties from one or more source objects to a target object. Object 여러개를 이어붙여주는 역할을 함. 제공받은 Object의 값도 달라짐.
    // Object.create() : 제공받은 Object를 골격으로 새로운 Object를 만들어냄.
    word: "word",
    meaning:"meaning"

};

function findMeaning(word){ // prototype.findValue 대신 일반함수를 썼다.
    // const def = dummyDic[word]; // object가 아니라는 error는 이부분 때문이었는듯..
    const searchResultValueDiv = document.createElement('div');
    searchResultValueDiv.className = 'search-result-value';
    main.appendChild(searchResultValueDiv);

    // console.log(word); // 개발자도구 Local에서 word: li.search-list-item innerHTML/innerText (둘 다) : "quinze", firstChild/lastChild 모두 text.

    // return searchResultValueDiv.innerText = "";
    return searchResultValueDiv.innerText = word.innerText;
}

function Meaning() {
    console.log('show Value 함수 작동중');

    if(document.querySelector('.search-result-list')){
        const searchResultItems = document.querySelectorAll('.search-list-item');
            for (let i = 0; i < searchResultItems.length; i++) {
                    searchResultItems[i].addEventListener('click', () => {
                        console.log(searchResultItems[i]);
                    });
            } // 에러 search-value.js:27 Uncaught TypeError: Failed to execute 'addEventListener' on 'EventTarget': parameter 2 is not of type 'Object'.
    } else {
        return console.log('no list');
    }
}




// mdn 강의 fetch
// const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

// fetchPromise.then( response => {
// const jsonPromise = response.json();
//     jsonPromise.then( json => {
//         console.log(json[0].name);
//     });
// });




export {Meaning};