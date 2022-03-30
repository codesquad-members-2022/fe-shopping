import Component from "../../../core/Component.js";
import { LatelyManager } from "./lately-store.js";
export default class LatelySearch extends Component {
    template() {
        return `
            <h3>최근 검색어</h3>
            <ul>
            </ul>
        `
    }

    render() {
        this.$target.innerHTML = this.template();
        this.setEvent();
    }

    addItem() {
        const target = document.querySelector(".search-list ul");
        const data = LatelyManager.getLocalData();
        const dataStr = data.map(item => `<li>${item}</li>`).join("");
        target.innerHTML = dataStr;
    }

    setEvent() {
        LatelyManager.init();
        const eventTarget = document.querySelector(".search-btn");
        eventTarget.addEventListener("click", this.setNewData);
        eventTarget.addEventListener("click", this.addItem);
    }

    setNewData() {
        const input = document.querySelector(".search-form input")
        LatelyManager.checkData(input.value);
    }
}