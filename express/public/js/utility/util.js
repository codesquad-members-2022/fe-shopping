export const $ = (selected) => document.querySelector(selected);
export const addEvent = (selected, eventName, callback) =>
  selected.addEventListener(eventName, callback);
