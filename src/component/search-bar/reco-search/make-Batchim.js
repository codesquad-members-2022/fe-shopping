export const BatchimMaker = {
    lastUnicode : 27,
    lastWordUni : 560,

    chgWordtoUni(word) {
        return word.charCodeAt(0);
    },

    chgUnitoWord(uni) {
        return String.fromCharCode(uni);
    },

    makeBatchim(word) {
        const crrUni = this.chgWordtoUni(word);
        const BatchimUni = crrUni + this.lastUnicode;
        return this.chgUnitoWord(BatchimUni);
    },

    makeEndOfWord(word) {
        const wordUni = this.chgWordtoUni(word);
        const EndWordUni = wordUni + this.lastWordUni;
        return String.fromCharCode(EndWordUni);
    }
}