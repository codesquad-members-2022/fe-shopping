export default class JaumChanger {
    constructor(JaumIndex) {
        this.nextJaumUni = 588;
        this.startWordUni = 44032;
        this.JaumIndex = JaumIndex;
    }

    chgJaumToword(jaum) {
        const wordUni = this.startWordUni + (this.JaumIndex[jaum] * this.nextJaumUni);
        const word = String.fromCharCode(wordUni);
        return word;
    }
}

