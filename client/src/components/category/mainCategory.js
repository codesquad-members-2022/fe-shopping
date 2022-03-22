// export const mainCategory = data => {
//   return /* html */ `
//         <ul class="category-list">
//             ${data.reduce((prev, cur, index) => {
//               console.log(cur);
//               return (prev += `<li class="category-item" data-id=${index}>${Object.values(
//                 cur.name
//               )}<i class=""></i></li>`);
//             }, '')}
//         </ul>
//     `;
// };

export const mainCategory = data => {
  return /* html */ `
        <ul class="category-list">
            ${Object.keys(data).reduce((prev, key, index) => {
              return (prev += `<li class="category-item" data-id=${index}>
                  <a class="category-item__link">
                    ${data[key].name}
                  </a>
              </li>`);
            }, '')}
        </ul>
    `;
};
