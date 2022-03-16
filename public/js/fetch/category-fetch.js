export function fetchCategoryData() {
  fetch('http://localhost:3000/category/data')
    .then((res) => res.json())
    .then((json) => {
      parseCategoryTitle(json.category);
    });
}

function parseCategoryTitle(data) {
  const categoryTitles = document.querySelectorAll('.category__link');
<<<<<<< HEAD
=======
  console.log(categoryTitles);
>>>>>>> fcce232 (style: 검색창 카테고리 마크업, 스타일링 완료)
  categoryTitles.forEach((e, i) => {
    e.insertAdjacentHTML('beforeend', data[i].title);
  });
}
