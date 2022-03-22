import SNB from "./component/SNB.js"
import FocusLinstener from "./component/search-bar/focus-listener.js";
export default class App {
    constructor(data) {
        new SNB(document.querySelector(".snb-list"),data);
        // debugger;
        new FocusLinstener(document.querySelector(".search-form input"));
    }
}