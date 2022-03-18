import { dummyDic } from "./mini.js";

const animals = [ // 배열 형태
    "Cat",
    "Dog",
    "Elephant",
    "Fish",
    "Gorilla",
    "Monkey",
    "Turtle",
    "Whale",
    "Aligator",
    "Donkey",
    "Horse"
] 

const a = { // json 형태
    "animals":"Cat",
    "animals":"Dog",
    "animals":"Elephant",
    "animals":"Fish",
    "animals":"Gorilla",
    "animals":"Monkey",
    "animals":"Turtle",
    "animals":"Whale",
    "animals":"Aligator",
    "animals":"Donkey",
    "animals":"Horse"
}


// 검색기능
const searchBar = document.querySelector('.search-bar');

// 사전 데이터
const newDummyDic = Object.keys(dummyDic);

const stylingResultList = (result) => {
    return result.map(x => '<li class="search-list-item">'+x+'</li>');
}

// 검색결과를 자동완성 목록으로 띄워주는 함수
const drawSearchResultDiv = (result) => {
    searchBar.children[2] ? searchBar.removeChild(searchBar.children[2]):'';

    const resultDiv = document.createElement('div');
    resultDiv.className = 'search-result-list';
    
    searchBar.appendChild(resultDiv);
  
    console.log(result); // 개발자도구도 이용하고 있지만 아직 콘솔에서 벗어날 수 업다..

    const organizedResultList = stylingResultList(result);
    return resultDiv.innerHTML = `${organizedResultList}`;

};

// 검색함수
function searchDictionary(e) {
    const searchInput = document.querySelector('.search-input').value.replaceAll(/\s/g, '');
    let result = []; // 검색결과가 들어감.
    if(searchInput.length > 0) {
        for (let i = 0; i < newDummyDic.length; i++) {
            newDummyDic[i].includes(searchInput) ? result.push(newDummyDic[i]) : '';
        }
    } else {
        result.push('검색결과가 없습니다.');
    }
    
    return drawSearchResultDiv(result);

}


export {searchDictionary};