// import { dummyDic } from "../DB/miniDictionaryData.js";

// const animals = [ // 배열 형태
//     "Cat",
//     "Dog",
//     "Elephant",
//     "Fish",
//     "Gorilla",
//     "Monkey",
//     "Turtle",
//     "Whale",
//     "Aligator",
//     "Donkey",
//     "Horse"
// ] 

// const a = { // json 형태
//     "animals":"Cat",
//     "animals":"Dog",
//     "animals":"Elephant",
//     "animals":"Fish",
//     "animals":"Gorilla",
//     "animals":"Monkey",
//     "animals":"Turtle",
//     "animals":"Whale",
//     "animals":"Aligator",
//     "animals":"Donkey",
//     "animals":"Horse"
// }


// // 검색기능
// const searchBar = document.querySelector('.search-bar');
// const searchInputArea = document.querySelector('.search-input');

// // 사전 데이터
// const newDummyDic = Object.keys(dummyDic);




// 검색함수
function searchDictionary(searchInput, dictionaryData) {
    let searchResult = []; // 검색결과가 들어감.
    // let result = '';

    if(searchInput.length > 0){
        for (let i = 0; i < dictionaryData.length; i++) {  
            dictionaryData[i].includes(searchInput) ? searchResult.push(dictionaryData[i]) : '';
        }
    } else {
        searchResult.push('NO INPUT?');
    }

    
    const draw = drawSearchResultDiv(searchResult);    
    return draw;

}

// template literal
const drawSearchResultDiv = (result) => {
    let innerHTMLData = '';
    for (const iterator of result) {
        innerHTMLData += '<li class="search-list-item item">'+ iterator +'</li>';
    }

    // console.log(typeof innerHTMLData); // string
    return innerHTMLData;

}

// (만들어뒀지만 사용안할 함수)검색결과를 저장할 div... object 형태로 view에 넘어가기 때문에 사용하기 쉽지 않아서 string 형태 데이터까지만 넘기기로...
const createResultDiv = () => {
    const resultStoredDiv = document.createElement('div');
    resultStoredDiv.className = 'search-result-list';
    return resultStoredDiv;
};


export {searchDictionary};