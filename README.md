# fe-shopping

## 목표
-------------------
- 일단 검색창만 구현한다. (하다보니... 쇼핑몰보다는 사전이 되어버린 느낌.)
- html, css는 최대한 간소화하고 검색 알고리즘과 검색결과를 브라우저에 보내는 것에 집중했다.
- 그 외 공부하면서 정리한 개념은 따로 md파일을 만들어 적어두었다.

## JavaScript
--------------------
```javascript
// main.js 메인함수

import {searchAnimals} from './search.js'

const input = document.querySelector('.search-input');
const removeController = document.querySelector('.remove-controller');

input.addEventListener('keydown', (e) => searchAnimals(e)); // 검색창에 글자가 들어가면 이벤트가 발동한다. 검색 결과는 브라우저창에 계속 기록된다.


removeController.addEventListener('click', () => { // 브라우저 창에 적힌 단어들 한번에 제거하는 버튼^^ㅋ
    let resultDiv = document.querySelector('.result');
    resultDiv.innerHTML = ' <div class="result">result</div>';
});

```

```javascript
// search.js 검색을 처리하는 함수.

let animals = [ // 일단 배열을 데이터로 썼다. 추후 json을 처리하는 방식으로 바꿀 예정.
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


const result = document.querySelector('.result');
const showResultOnScreen = (word) => {
    return result.innerHTML += `<div>${word}</div>`
}; // result와 showResultOnScreeen 모두 검색결과를 브라우저에 보내는데 쓰는 변수이다.(하나는 에로우함수이지만 변수취급하는걸로^^!)


function searchAnimals(e) {
    let input = e.key; // 입력받은 값.
    for (let i = 0; i < animals.length; i++) {
        animals[i].includes(input) ? showResultOnScreen(animals[i]) : '';
    } // 입력받은 값(알파벳)이 단어의 철자 안에 있을 경우 브라우저에 내보낸다.
}


export {searchAnimals};

```

## Data (현재 여기에 있음!!)
-----------------------
검색창을 테스트하는데 필요한 데이터는 인터넷에 올라와있는는 webster english dictionary가 json파일로 된 것을 갖다 쓰기로 했다. 

그런데... 데이터를 그대로 for문으로 돌리면 시간이 너무 많이 들거 같아(원 데이터 파일의 크기는 22mb이다. 데이터를 작게 잘라서 쓸 수도 있었지만 좀 아쉬워서 손을 봐서 통으로 쓰기로^^ㅋ) **검색을 빠르게 할 수 있도록 데이터를 조금 손보기**로 했다. 데이터를 손보는데는 hashmap을 써보기로 했다.



## 참고자료
------------------
[자바스크립트를 이용한 이진탐색 알고리즘](https://code.tutsplus.com/tutorials/the-binary-search-algorithm-in-javascript--cms-30003)
[dummy data로 사용한 웹스터 영어사전 json data](https://github.com/matthewreagan/WebstersEnglishDictionary)
[geeksforgeeks의 html,css,javascript를 이용한 검색바만들기](https://www.geeksforgeeks.org/search-bar-using-html-css-and-javascript/)


