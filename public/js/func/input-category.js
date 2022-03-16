let dropdownFlag = true;

export function chooseCategory() {
  const category = document.querySelector('.category');
  const searchCategoryLink = document.querySelector('.search-category__link');

  category.addEventListener('click', (e) => {
    searchCategoryLink.textContent = e.target.textContent;
  });
}

export function toggleDropdown() {
  const searchCategory = document.querySelector('.search-category');

  searchCategory.addEventListener('click', () => {
    const categoryList = document.querySelector('.category__list');
    const categoryItems = document.querySelectorAll('.category__item');

    if (dropdownFlag) {
      categoryList.style.height = '238px';
      categoryItems.forEach((e) => {
        e.style.visibility = 'visible';
      });
      dropdownFlag = false;
    } else {
      categoryList.style.height = '0';
      categoryItems.forEach((e) => {
        e.style.visibility = 'hidden';
      });
      dropdownFlag = true;
    }
  });
}
