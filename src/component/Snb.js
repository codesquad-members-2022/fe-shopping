import Component from "../core/Component.js";
export default class Snb extends Component {
    template() {
        const { data } = this.$state;
        return `
            <div class="list-menu">
                ${data.map(item => `<li>${item}</li>`).join("")}
            </div>
        `
    }
    render() {
        this.$target.innerHTML = this.template();
        this.setEvent();
    }
    setEvent () {
        const $eventTarget = this.$target.parentElement;
        $eventTarget.addEventListener("mouseenter",this.enterEvent);
        $eventTarget.addEventListener("mouseleave",this.leaveEvent);
    }
    enterEvent() {
        document.querySelector(".list-menu").style.visibility = "visible";
    }
    leaveEvent() {
        document.querySelector(".list-menu").style.visibility = "hidden";
    }
}