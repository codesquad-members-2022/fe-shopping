export const mainCategory = data => {
  return /* html */ `
        <ul class="category-list">
            ${data.reduce((prev, cur, index) => {
              return (prev += `<li class="category-item" data-id=${index}>${cur}</li>`);
            }, '')}
        </ul>
    `;
};
