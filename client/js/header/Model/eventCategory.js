import { getJsonData } from "../../util.js";

export const EventCategory = function () {};

EventCategory.prototype = {
  constructor: EventCategory,
  createEventsCategory(data) {
    return `
      <div class="search-section__events-category flex-row-between">
        <img
          class="events-category__logo-img"
          src="${data.img.src}"
          alt="${data.img.alt}"
        />
        <div class="events-category__text small-text">${data.content}</div>
        <img
          class="new-icon${data.img.new ? "" : " display-none"}"
          src="https://static.coupangcdn.com/image/coupang/common/ico_new.png"
          alt="신규아이콘"
        />
      </div>
    `;
  },

  createTemplate(data) {
    return data.headerEventCategoryData
      .map((todayEventList) => this.createEventsCategory(todayEventList))
      .join("");
  },
  exportDataPromise() {
    return getJsonData("/header/eventCategory").then((data) => this.createTemplate(data));
  },
};
