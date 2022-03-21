export const $ = (selected) => document.querySelector(selected);

export async function fetchData(url) {
  const successData = await fetch(url);
  const json = await successData.json();
  return json;
}

export async function getCompleteData(consonant) {
  const jsonData = await fetchData(
    './public/data/auto-complete/auto-complete.json'
  );
  const completeData = jsonData[`${consonant}data`];
  return completeData;
}

export function makeImageSlide(list) {
  return `
  <li class="image-element">
    <img src="${list.imgURL}" / alt="${list.imgTitle} 이미지" width = "950" height = "400">
    </li>
  `;
}

export function makeSideTeb(list) {
  return `
  <li class="side-teb-element">
    <img src="${list.subImgURL}" / alt="${list.imgTitle} 이미지" width = "200" height = "55">
    </li>
  `;
}
