export const $ = (selected) => document.querySelector(selected);

export const fetchData = async (url) => {
  const successData = await fetch(url);
  return successData.json();
};

export async function getCompleteData(name) {
  const completeData = await fetchData(
    `./public/data/auto-complete/${name}.json`
  );
  return completeData.data;
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
