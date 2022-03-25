export function makeImageSlide(list) {
  return `
  <li id= "${list.id}" class="image-element">
    <img src="${list.imgURL}" / alt="${list.imgTitle} 이미지" width = "950" height = "400" style = 'object-fit: cover'>
    </li>
  `;
}

export function makeSideTab(list) {
  return `
  <li id= "${list.id}" class="side-tab-element">
    <img src="${list.subImgURL}" / alt="${list.imgTitle} 이미지" width = "200" height = "55" >
    </li>
  `;
}

export function makeShoppingCategory(categoryData, step) {
  return [...categoryData].reduce(
    (pre, curContent) => (pre += `<button class = ${step}>${curContent[`${step}`]}</button></br>`),
    ''
  );
}
