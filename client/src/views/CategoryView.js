export default class CategoryView {
  constructor() {}

  drawCategory(data) {
    return /* html */ `
        <ul class="search-list">
          ${data.reduce((prev, cur, index) => {
            return (prev += `<li class="search-item" data-id=${index}>${cur}</li>`);
          }, '')}
        </ul>
    `;
  }
}
