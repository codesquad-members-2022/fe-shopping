export const $ = (selected) => document.querySelector(selected);

export const addEvent = (selected, eventName, callback) =>
  selected.addEventListener(eventName, callback);

export const fetchData = async (url) => {
  const successData = await fetch(url);
  return successData.json();
};

export function makeImageSlide(list) {
  return `
  <li class="image-element">
    <img src="${list.imgURL}" / alt="${list.imgTitle}" 이미지" width = "950" height = "330">
    </li>
  `;
}
