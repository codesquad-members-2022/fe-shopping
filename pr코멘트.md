저번주 금요일날 몸상태가 좋지 못해 pr을 보내지 못했습니다.😰

> 리드미에 미션을 진행하면서 생긴 고민과 과정을 자세히 기록해두었습니다. 작성하다보니 리드미가 너무 길어져 내용을 요약해봤습니다.

# 결과

### 1. 검색창

- [x] 입력 값에 따라 관련 자동완성리스트 받기
- [x] input창이 클릭되면 최근검색어 목록 보여주기
- [x] 최근검색어: 삭제, 추가, 전체삭제, 클릭시 해당페이지로 이동
- [x] 최근검색어목록, 자동완성목록 방향키로 이동
- [x] 검색 옵션 창 활성화
- [x] form이 제출되면 옵션 값과 검색어어로 이동 (/search?option=옵션4&text=g)
- [ ] debounce과 throttling활용해서 인풋이벤트 다루기
- [ ] 방향키 이동에 따른 커서 버그
- [ ] 방향키 이동에 따른 한글 버그

### 2. 관심사별로 코드를 묶어보기

카테고리, 검색창, 네비게이션 등등 기준을 잡고 분리해봤습니다.

기준 : html구조 상 부모-자식관계인지, 공통된 데이터를 쓰는지

목표: 부모 아래 여러 자식들이 있을 경우 자식들은 본인이 넘겨받은 데이터가가 변할 때만 리랜더링될 수 있도록 하기

# 시도한 것들

### 1. 데이터 바인딩

목표: 부모에서 뿌려주는 값이 변하면 자식요소에서 알아서 리렌더링될 수 있도록 하기

- 1번: 자식1에서 쓰는 데이터가 변하면 자식1의 부모가 포함하는 모든 자식들 리렌더링
- ✅ 2번: 부모요소에서 자식요소에 어떤 데이터를 넘겨줬는지 인지하고 있다가, 해당 데이터가 바뀌면 자식요소를 직접 리렌더링
- 3번: 2번과 비슷하지만, 부모가 자식요소를 리렌더링 시키지 않고 자식요소들이 자신들이 쓰는 데이터가 바뀌면 알아서 리렌더링

### 2. 이벤트 핸들러

목표: 이벤트핸들러를 컴포넌트(htmlElement)가 정의된 코드 아래 묶지 않고 따로 선언해뒀는데, 컴포넌트에 넣어 보려고 했습니다.

```js
// 현재상태
export default function SearchBox($element, args) {
  HtmlElement.call(this, $element, args);
}
SearchBox.prototype.setEvent = function () {
  this.$element.addEventListener('click', handleClick.bind(this));
};
function handleClick({ target }) {
  showCategory.apply(this);
  showRecord.call(this, target);
}
function showCategory() {}
function showRecord(target) {}
```

이유: 이벤트 동작 함수를 element.prototype안에 묶어두지 않아서, this를 bind나 call로 묶어야했는데 이렇게 하니까 코드가 복잡해지고 수정이 어려워졌습니다.

문제점:

- call,apply,bind는 안써도 되지만 컴포넌트가 비대해졌습니다.
- 뭔가 차이가 더 있을 것 같은데 잘 모르겠습니다.

```js
// 시도
export default function SearchBox($element, args) {
  HtmlElement.call(this, $element, args);
}
SearchBox.prototype.setEvent = function () {
  const {handleClick} = this.eventHandler;
  this.$element.addEventListener('click', handleClick);
};
SearchBox.prototype.eventHandler = {
  handleClick({ target }) {
    this.showCategory();
    this.showRecord(target));
  },
  showCategory() {},
  showRecord(target) {},
};
```

### 3. 의도적인 이벤트 딜레이

debounce과 throttling을 구현하려고 했는데 생각처럼 되지 않았다. mouse움직이나 input, change 이벤트가 발생할 때마다 특정 작업을 실행하지 않고 약간의 시간을 가졌다가 작업을 실행하게 할 생각이었습니다.

문제점

- 함수를 인자로 넘길 때, `함수()`로 해야하는지 `함수`로 해야하는지 차이를 잘모르겠습니다.
  `element.addEventListener(type, callback)` vs `element.addEventListener(type, (event) => callback(event, something))`
- 넘기는 함수의 종류(화살표함수, 표현식, 선언문)에 따라 차이가 있는거 같아서 알아 보는 중입니다.

```js
// 1번
$input.addEventListener('input', handleInput);
function handleInput(event) {}
// const handleInput = () => {};

// 2번
$input.addEventListener('input', (event) => handleInput(event, something));
const handleInput = (event, something) => {};
```

# 앞으로 시도할 것들

위에서 언급한 `문제점`에 대해서 더 고민해보고 검색창에서 발생한 `버그`를 수정할 예정입니다.
