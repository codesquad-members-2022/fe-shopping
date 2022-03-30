import Component from "../../../core/Component.js";
import RecoWordFinder from "./recoWordFinder.js";
import recoitem from "../../../json/recoitem.js";

const RecoWordManager = new RecoWordFinder(recoitem);

export default class RecoSearch extends Component {

    render() {
        this.setEvent();
    }

    setEvent() {
        this.$target.addEventListener("keydown",this.addItem);
    }

    addItem() {
        const formChangeTarget = document.querySelector(".search-list");
        formChangeTarget.classList.add("reco-list");
        const addtarget = document.querySelector(".reco-list");
        const listItem = RecoWordManager.findRecoWords();
        const template = `
            <ul>
                ${listItem.map(item => `<li>${item}</li>`).join("")}
            </ul>
        `;
        addtarget.innerHTML = template;
    }
}