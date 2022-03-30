# fe-shopping

## 3주차 - 1

## 스마트 레이어

- 대각선이동 어떻게 처리할 지 시나리오

  - 대각선 이동은 카테고리 이동의 디바운스 시간보다 여유를 주는것이 사용자 경험 측면에서 더 좋을 것이라고 생각했다.
  - 위-아래 이동보다 커서->대각선맨아래 이동시간이 더 길기 때문

![image](https://user-images.githubusercontent.com/58503584/160738432-42203089-551b-4672-bc9c-c439e289cb36.png)

- 색칠된 영역에 있을 때 debounce msTime 을 동적으로 결정하자
- 기존 debounce 된 mouseover 이벤트가 실행이 되면 삼각형의 기준이 되는 포인트를 setState 하자.

- 기존의 debounce 를 활용하기에는 msTime 을 동적으로 처리하기 힘들었다.
  - event target 의 위치(clientX, clientY)가 삼각형 안에 있는지 확인하여 msTime 값을 동적을 결정하고 싶었는데, debounce 내부 로직에서 처리해야할 문제라고 생각했다.
  - 그래서 스마트 레이어만을 위한 debounce 를 만드는 것이 수월한 방법이라고 생각했다.

```js
const debounce = ({ msTime, callback }) => {
  const msDiffRange = 10;
  const eventTypes = {};
  return function (event) {
    const { type } = event;
    eventTypes[type] = new Date();
    delay(msTime).then(() => {
      const delayDate = new Date();
      const diff = delayDate - eventTypes[type];
      const isRangeIn = diff <= msTime + msDiffRange && diff >= msTime;
      if (isRangeIn) {
        callback(event);
      }
    });
  };
};
```

```js
const debounceForSmartLayer = ({ callback, mouseOn }) => {
  const msDiffRange = 10;
  const eventTypes = {};
  return function (event) {
    const { type, clientX, clientY } = event;
    // msTime 동적으로 결정
    const msTime = isTargetInLayer({ clientX, clientY }) ? 300 : 100;
    eventTypes[type] = new Date();
    delay(msTime).then(() => {
      const delayDate = new Date();
      const diff = delayDate - eventTypes[type];
      const isRangeIn = diff <= msTime + msDiffRange && diff >= msTime;
      // 현재 mouseOn 되어있는 state 가 event 의 mouseOn 과 같은지
      const isMouseOn = store.state.mouseOnCategory === mouseOn;
      if (isRangeIn && isMouseOn) {
        callback(event);
      }
    });
  };
};
```

## 버그 픽스 과정

### mouseover 가 계속 찍힌다?

- mouseover 가 되면 `한번` 만 찍혀야 하는데, 여러번 찍힌다.

![mouseover](https://user-images.githubusercontent.com/58503584/160739843-c0036f8b-bf31-4875-8e54-80d03615e0fa.gif)

- 아마도 setState 를 하면서 해당 li 태그가 re-rendering 되면서 새로 생긴 li 태그라고 인식해서 계속찍히는 것으로 생각된다.

  - ?) 마우스를 올렸을 때 Element 가 사라지게 하면 mouseout 이벤트가 발생하지 않는건가?

- 어떻게 해결할까?

  - mainCategory 를 render 하는 로직에 subCategory 와 연결이 되어 있는 부분을 끊어줘야 옵저버가 mainCategory 를 re-rendering 하지 않겠다는 생각을 했다.
  - 현재 Category 컴포넌트를 렌더링 할 때, store 에서 categoryDatas 와 subCategoryDatas 를 모두 get 하기 때문에 옵저버가 sub 를 렌더링할 때 main 의 렌더링 로직도 기억하고 있다.

  <img width="257" alt="스크린샷 2022-03-29 오전 11 22 44" src="https://user-images.githubusercontent.com/58503584/160740117-98d6b661-34f5-4c6d-a5d1-45cfa73230d5.png">

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

![mouseover-fix](https://user-images.githubusercontent.com/58503584/
160740156-c02581cb-bc49-4d4f-98e5-59dff39d9536.gif)

### ul - mouseover, mouseenter

- ul 태그에서 mouseover 사용시 ul 의 가장 바깥쪽 미미한 공간에 over 되었을 때 over 이벤트가 발생하고 li 태그로 이동하면서 mouseout 이벤트가 발생한 후, li 태그에 대해 over-out 이벤트가 계속 진행되었음

<img width="159" alt="스크린샷 2022-03-30 오전 11 19 38" src="https://user-images.githubusercontent.com/58503584/160737731-42e8bab4-fa8e-4f85-901d-f62ea2db9920.png">

- 옆에 아주 미미한 틈새.. 로 ul의 over-out 이벤트가 발생한다

- 원하는건 ul 태그에 over 되었을 때 딱 한번, out 되었을 때 딱 한번 되기를 원했다.
  - 오전 스크럼에서 해당 고민에대해서 이야기 했을 때, mouseenter 이벤트가 버블링을 일으키지 않아서 해당 요소에 대해서 딱 한번만 실행한다는 의견을 들을수 있었다.
  - 기존에 this.addEvent 메서드를 통해서 mouseenter 이벤트를 달아주니 실행되지 않았다. 아마도 addEvent 메서드는 내부적으로 event delegation 을 위한 로직을 담고있어서 제대로 실행되지 않는 것이라고 판단했다.
  - addEvent 메서드가 아니라 직접 addEventListener 를 달아서 mouseenter 이벤트를 달아주니 원하는대로 동작할 수 있었다.
