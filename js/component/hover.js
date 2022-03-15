export const HoverEvent = {
    hovering : function() {
        document.querySelector(".snb-list").style.visibility = "visible";
    },
    unhovering : function() {
        document.querySelector(".snb-list").style.visibility = "hidden";
    }
}