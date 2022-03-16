export function fetchCategoryData() {
  fetch('http://localhost:3000/category/data')
    .then((res) => res.json())
    .then((json) => {
      parseCategoryTitle(json.category);
    });
}

function parseCategoryTitle(data) {
  const categoryTitles = document.querySelectorAll('.category__link');
  console.log(categoryTitles);
  categoryTitles.forEach((e, i) => {
    e.insertAdjacentHTML('beforeend', data[i].title);
  });
}
