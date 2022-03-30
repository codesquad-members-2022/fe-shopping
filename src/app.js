import SNB from "./component/SNB.js"
import FocusLinstener from "./component/search-bar/focus-listener.js";
import LatelySearch from "./component/search-bar/lately-search/lately-search.js";
import RecoSearch from "./component/search-bar/reco-search/reco-search.js";


export default class App {
    constructor(data) {
        new SNB(document.querySelector(".snb-list"),data);
        new FocusLinstener(document.querySelector(".search-form input"));
        new LatelySearch(document.querySelector(".search-list"));
        new RecoSearch(document.querySelector(".search-form input"));
    }
}