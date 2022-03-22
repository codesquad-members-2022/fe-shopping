export default class FocusLinstener {
    constructor(target) {
        this.target = target;
        this.setEvent();
    }
    
    setEvent() {
        this.target.addEventListener("focus",this.openLatelySearchList);
        this.target.addEventListener("blur",this.closeLatelySearchList);
    }

    openLatelySearchList() {
        const eventTarget = document.querySelector(".search-lately");
        eventTarget.style.display = "block";
    }

    closeLatelySearchList() {
        const eventTarget = document.querySelector(".search-lately");
        eventTarget.style.display = "none";
    }

}