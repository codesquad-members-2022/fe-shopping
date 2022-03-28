export function fetchCategoryData() {
  fetch('/category/data')
    .then((res) => res.json())
    .then((json) => {
      parseCategoryTitle(json.category);
    });
}

function parseCategoryTitle(data) {
  const categoryTitles = document.querySelectorAll('.category__link');
  categoryTitles.forEach((e, i) => {
    e.insertAdjacentHTML('beforeend', data[i].title);
  });
}
