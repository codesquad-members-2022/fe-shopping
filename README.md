# fe-shopping

## 3주차 - 1

- mouseover가 계속 찍힌다?

  - mouseover 가 되면 `한번` 만 찍혀야 하는데, 여러번 찍힌다.
  - 아마도 setState 를 하면서 해당 li 태그가 re-rendering 되면서 새로 생긴 li 태그라고 인식해서 계속찍히는 것으로 생각된다.
    - ?) 마우스를 올렸을 때 Element 가 사라지게 하면 mouseout 이벤트가 발생하지 않는건가?

- 어떻게 해결할까?
  - mainCategory 를 render 하는 로직에 subCategory 와 연결이 되어 있는 부분을 끊어줘야 옵저버가 mainCategory 를 re-rendering 하지 않겠다는 생각을 했다.
  - Category 에서 두 컴포넌트 모두 렌더링 하던 로직에서 mainCategory 와 subCategory 를 분리해야겠다고 생각을 했고, Category 컴포넌트에서는 해당 데이터를 get 하지 않도록 해서 observer 가 참고하지 않도록 해야겠다고 생각했다.

```js
Category.prototype.template = function () {
  const { categoryDatas, subCategoryDatas } = store.state;
  return `
    <div class="category__icon">
        <i class="fas fa-bars"></i>
    </div>
    <div class="category__text">
        <span>카테고리</span>
    </div>
    <ul class="category__main">
      ${categoryDatas.map(({ name }) => `<li>${name}</li>`).join("")}
    </ul>
    <ul class="category__sub">
      ${subCategoryDatas.map(({ name }) => `<li>${name}</li>`).join("")}
    </ul>
    <ul class="category__third"></ul>
  `;
};
```

```js
Category.prototype.template = function () {
  // categoryDatas, subCategoryDatas 를 참조하는 로직을 빼서 observer 가 기억하지 않도록 한다.
  // const { categoryDatas, subCategoryDatas } = store.state;
  return `
    <div class="category__icon">
        <i class="fas fa-bars"></i>
    </div>
    <div class="category__text">
        <span>카테고리</span>
    </div>
    <ul class="category__main"></ul>
    <ul class="category__sub"></ul>
    <ul class="category__third"></ul>
  `;
};
```

- mount 메서드도 마찬가지로 CategoryMain 과 CategorySub 를 참조하지 않도록 수정하고 분리한다.

```js
Category.prototype.mount = function () {
  const { categoryDatas, subCategoryDatas } = store.state;
  const $categoryMain = this.$target.querySelector(".category__main");
  const $categorySub = this.$target.querySelector(".category__sub");
  $categoryMain.style.boxShadow = categoryDatas.length
    ? "0 4px 5px rgb(0 0 0 / 30%)"
    : "none";
  $categorySub.style.boxShadow = subCategoryDatas.length
    ? "0 4px 5px rgb(0 0 0 / 30%)"
    : "none";
  $categorySub.style.height = subCategoryDatas.length
    ? $categoryMain.offsetHeight + "px"
    : 0;
};
```

```js
// Category.js
Category.prototype.mount = function () {
  const $categoryMain = this.$target.querySelector(".category__main");
  const $categorySub = this.$target.querySelector(".category__sub");
  const categoryMain = new CategoryMain($categoryMain);
  const categorySub = new CategorySub($categorySub);
  [categoryMain, categorySub].forEach((component) => component.initRender());
};

// CategoryMain.js
CategoryMain.prototype.mount = function () {
  const { categoryDatas } = store.state;
  this.$target.style.boxShadow = categoryDatas.length
    ? "0 4px 5px rgb(0 0 0 / 30%)"
    : "none";
};

// CategorySub.js
CategorySub.prototype.mount = function () {
  const { subCategoryDatas } = store.state;
  const $categoryMain =
    this.$target.parentNode.querySelector(".category__main");

  this.$target.style.boxShadow = subCategoryDatas.length
    ? "0 4px 5px rgb(0 0 0 / 30%)"
    : "none";
  this.$target.style.height = subCategoryDatas.length
    ? $categoryMain.offsetHeight + "px"
    : 0;
};
```

- 여러번 mouseover 가 되던 상황을 수정하였다.
  - 뷰의 렌더링 과정을 상상하면서 어떻게 분리를 해야하는지를 좀 더 깨달았다.
