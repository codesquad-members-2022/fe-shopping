import { BatchimMaker } from "./make-Batchim.js";
import JaumChanger from "./chgJaumTo-word.js";
import { Jaum } from "../../../json/jaumIndex.js";


const JaumManager = new JaumChanger(Jaum);

export default class RecoWordFinder {
    constructor(data) {
        this.MaxData = 9;
        this.recoData = data;
        this.recoItems = [];
        this.searchInput = document.querySelector(".search-form input");
    }

    findRecoWords() {
        const value = this.getInputValue();
        if(!this.isWord(value)) {
            const regExp = this.makeRegExp(value);
            this.findWords(regExp);
            return this.recoItems;
        }
        const regExp = new RegExp(`[${value}-${BatchimMaker.makeBatchim(value)}]`);
        this.findWords(regExp);
        return this.recoItems;
    }

    getInputValue() {
        return this.searchInput.value;
    }

    isWord(value) {
        const ValueUni = value.charCodeAt(0);
        const WordUni = 44032;
        if(ValueUni < WordUni) {
            return false;
        }
        return true;
    }

    makeRegExp(value) {
        const JaumWord = JaumManager.chgJaumToword(value);
        const JaumEndWord = BatchimMaker.makeEndOfWord(JaumWord);
        const regExp = new RegExp(`[${JaumWord}-${JaumEndWord}]`);
        return regExp;
    }

    findWords(regExp) {
        for(const Jaum in this.recoData) {
            if(this.recoItems.length >= this.MaxData) return this.recoItems;
            this.checkIncludeWord(this.recoData[Jaum],regExp);
        }
        return this.recoItems;
    }

    checkIncludeWord(itemsarr,regExp) {
        itemsarr.forEach(item => {
            if(this.recoItems.length >= this.MaxData) return;
            if(this.isInclude(item,regExp)) this.recoItems.push(item);
        })
    }

    isInclude(item,reg) {
        return reg.test(item);
    }
}