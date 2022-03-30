const searchBar = document.querySelector('.search-bar');
const searchInput = document.querySelector('.search-input');
const sampleButton = document.querySelector('.sample-btn')

export {searchBar, searchInput, sampleButton}

import {sampleController, searchInputController, categoryController} from '../model/header.js'

searchInput.addEventListener('input', function(){
    const inputWord = searchInput.value.replaceAll(/\s/g, '');
    const data = searchInputController.getdata();

    // 검색 결과
    const searchResult = searchInputController.searchDictionary(inputWord, data);
    
    function printSearchResultWord() {
        const newDiv = document.createElement('div');
        newDiv.className = 'search-result-list'
        newDiv.innerHTML += searchResult;
        return searchBar.appendChild(newDiv);
    }

    function removeSearchResultList() {
        if(document.querySelector('.search-result-list')){
            document.querySelector('.search-result-list').remove();
        }
    }

    removeSearchResultList();
    printSearchResultWord();

});

sampleButton.addEventListener('click', function(){
    sampleController.switching();
    sampleController.sampleFunc();
    console.log(sampleController.ownSweetSwitch);

});
