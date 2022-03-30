// view
import { searchBar, searchInput, sampleButton } from "../view/view.js";
import { categoryButton } from "../view/dropDown.js";


// component
import { initCategoryList, attachCategoryList, detachCategoryList } from "./components/drop-down-menu/dropDownMenu.js";
import { searchDictionary } from "./components/search-bar/search.js";

import {sampleFunc} from "./components/sample/sample.js";

// data
import { dummyDic } from "../DB/miniDictionaryData.js";
const newDummyDic = Object.keys(dummyDic);

const category = ["패션의류", "출산/유아", "주방용품", "홈/인테리어", "스포츠/레저", "도서/음반", "문구/오피스", "유기농/친환경", "여행/티켓", "이벤트/쿠폰"];
const sampleData = {
    "menu":["sample string"]
}

let sweetSwitches = { 
    category : false,
    sample : false,
    search : false 
};

// router
// import express from "express";
// const router = express.Router();

// mvc 테스트
class Controller{
    constructor(thisIsData, thisIsSweetSwitch, thisIsEventListner){
        this.data = thisIsData;
        this.ownSweetSwitch = thisIsSweetSwitch;
        this.ownEventListener = thisIsEventListner;
    }

    switching(){
        if(this.ownSweetSwitch === false){
            return this.ownSweetSwitch = true;
        }else if(this.ownSweetSwitch === true){
            return this.ownSweetSwitch = false;
        } else {
            return console.log('SweetSwitch Error!');
        }
    }

    getdata(){
        return this.data;
    }

    geteventlistener(){
        return this.ownEventListener;
    }

}

Controller.prototype.initCategoryList = initCategoryList;
Controller.prototype.attachCategoryList = attachCategoryList;
Controller.prototype.detachCategoryList = detachCategoryList;
Controller.prototype.sampleFunc = sampleFunc;
Controller.prototype.searchDictionary = searchDictionary; // 어떻게 해야 searchDictionary 함수가 this.data와 input 들어온 것 모두를 써먹을 수 있을까..



const categoryController = new Controller(category, sweetSwitches.category, categoryButton);
const sampleController = new Controller(sampleData, sweetSwitches.sample, sampleButton);
const searchInputController = new Controller(newDummyDic, sweetSwitches.search, searchInput);


export {categoryController, sampleController, searchInputController};