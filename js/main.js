import {searchAnimals} from './search.js'

console.log("main script loaded!");

const input = document.querySelector('.search-input');
const removeController = document.querySelector('.remove-controller');

input.addEventListener('keydown', (e) => searchAnimals(e)); // 검색창에 글자가 들어가면 바로 발동!


removeController.addEventListener('click', () => { // 브라우저 창에 적힌 단어들 한번에 제거하는 버튼^^ㅋ
    let resultDiv = document.querySelector('.result');
    resultDiv.innerHTML = ' <div class="result">result</div>';
});

