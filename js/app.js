import { HoverEvent } from "./component/hover.js";

const snb = document.querySelector(".header-snb");
snb.addEventListener('mouseover',HoverEvent.hovering);
snb.addEventListener('mouseout',HoverEvent.unhovering);