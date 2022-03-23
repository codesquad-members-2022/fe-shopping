# 학습 목표

- [x] ES Modules 이해
- [x] prototype 공부
- [x] prototype 기반 객체 활용
- [ ] css preprocessor 중 sass 활용 (extension -> webpack)
- [x] 서버 역할 결정 (검색사이트니까 ssr?)
- [ ] 클라이언트 기능(검색창, 카테고리, 캐러샐..)마다 feature브랜치 만들어서 관리

# 목표

> 어떤 문제를 만났는데 어떻게 해결했다. 일단 다쓰고 pr전에 정리해보자

- [x] 클라이언트에서 탬플릿을 랜더링하고 이벤트를 등록하는 과정 구현해보기
- [x] 검색창 개발 - 버그 수정중
- [ ] 카테고리
  - hover 바로바로 뜨는 ui변경 -> click? 혹은 몇초 이상 머물 때
- [ ] 캐러셀
  - 새로 만들고 (재사용가능하게) 이전에 만들었던 캐러셀이랑 비교해보기
  - 스으윽 미끄러지는 애니매이션 추가

# 진행순서

1. html 뼈대 만들기 및 레이아웃 scss적용
2. 클라이언트 사이드 작업

   - 컴포넌트로 구현
   - 검색창, 카테고리: 의도적인 이벤트 딜레이 구현
     <span style="font-size: 22px">`...진행중🏃‍♂️`</span>
   - 데이터 바인딩: 부모에서 전달받은 상태가 변하면 알아서 리랜더링되게하기

3. 서버에서 홈화면 및 검색어에 따른 화면 렌더링 (innerHTML or pug)
   - 서버사이드에서 html렌더링하기
   - api서버 만들기
4. webpack 및 nodejs에 es6 적용

# 고민목록

🤔 어려웠던 부분들

## 1. [개발자 황준일 - Vanilla Javascript로 웹 컴포넌트 만들기](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/): 해당 블로그와 리액트 흐름을 너무 따라하지 않았나 싶다.

어떻게 하면 클라이언트에서 렌더링을 관리하게 할 수 있을까 고민하다 해당 블로그 글을 보게되었다. js컴포넌트 흐름과 상속구조가 이해하기 쉽게 정리되어 있어 참고만 해야겠다는 생각으로 포스트를 읽었다. 코드를 완전히 복사하고 붙혀 넣을 생각 없이 '이런 아이디어도 있구나'하고 참고만 할 생각이었다.

하지만 걱정한 대로 `해당 포스트에서 읽은 내용`과 내가 알고 있던 spa흐름(`리액트 라이프 사이클`)이 머리 속에 각인되어 나만의 아이디어를 생각하지 못하게 되었다. 블로그 포스트를 계속 참고하면서 하지 않았지만 코드를 짜고 보니 흐름이 비슷해서 뜨끔했다. 나도 모르게 블로그를 따라하지 않았나 싶다. 좀 더 고민하고 나만의 아이디어를 짜는 시간을 길게 가져야겠다.

## 2. Html Component구성 (cra, prototype)

탬플릿을 만들고 렌더링해야겠다는 흐름은 이해했지만 부모요소에 자식요소를 어떻게 끼워 넣어야하는지 감이 잡히지 않았다. 부모요소와 자식요소 간의 관계가 중요한 이유는 특정 상태가 변했을 때 특정 상태를 렌더링하는 요소만 리렌더링해야하기 때문이다. 부모요소에 자식1, 자식2가 있고 자식2에서 쓰는 상태가 변했을 때, 자식1까지 다시 렌더링하지 않게 하고 싶었다.

컴포넌트가 작동하기 위해 2단계(템플릿 작성 -> 렌더링)로 생각했다. 이렇게 하다보니 각 단계에서 해야하는 역할이 커졌다. 그래서 다음과 같이 세분화했다.

- `init()`: 부모요소로부터 받은 값을 자신의 상태로 만들기
- `setEvent()`: 런더링이후 이벤트 등록.
- `setState()`: 상태가 바뀌면 해당 상태를 쓰는 컴포넌트만 render()호출
- `setTemplate() -> render() -> renderChild()`: 자신의 템플릿만들기 -> 가장 큰 변화가 있던 부분,
  - `insertAdjacentHTML vs innerHTML`: insertAdjacentHTML이 돔을 삽입할 때 성능이 더 좋지만 innerHTML으로 템플릿을 짜는게 가독성이 훨씬 좋아 innerHTML으로 템플릿을 만들었다.
  - 자식요소에서 부모를 인자로 받아 부모에 본인을 삽입했는데, 부모에서 자식을 삽입하는 방법으로 바꿔 구조 파악이 더 쉬워졌다.

### `이전`

```js
export default HtmlElement(htmlTag, $parent){
  this.$element = document.createElement(htmlTag);
}
HtmlElement.prototype.setTemplate = function (){
  $element.classList.add = ".temp"
  $element.id = "#temp"
  $element.innerHtml = ``
}
HtmlElement.prototype.render = function(){
  $parent && $parent.appendchild($element);
}

// 상속예시
//Section.js
Section.prototype.setTemplate = function () {
  const logoArea = document.createElement('div');
  logoArea.classList.add('logo-area');
  logoArea.insertAdjacentHTML('beforeend', imgTemplate);
  new SearchBox('div', logoArea);
  logoArea.insertAdjacentHTML('beforeend', userInfoTemplate);
  this.$element.appendChild(logoArea);
  new Navigation('nav', this.$element);
};
```

### `이후`

```js
export default function HtmlElement($element, args) {
  this.$element = $element;
  this.args = args;
  this.state;
  this.init();
  this.render();
  this.setEvent();
}
HtmlElement.prototype.setTemplate = function () {
  return ``;
};
HtmlElement.prototype.renderChild = function () {};
HtmlElement.prototype.render = function () {
  this.$element.innerHTML = this.setTemplate();
  this.renderChild();
};

//Section.js
Section.prototype.setTemplate = function () {
  return `
  <div class="logo-area">
    <div class="search"></div>
  </div>
  <div class="gnb"></div>
`;
};

Section.prototype.renderChild = function () {
  const $gnb = findTargetClassElement(this.$element, 'gnb');
  const $searchBox = findTargetClassElement(this.$element, 'search');
  new SearchBox($searchBox);
  new Navigation($gnb);
};
```

## 3. 데이터 바인딩

목표: 부모에서 뿌려주는 값이 변하면 자식요소에서 알아서 리렌더링될 수 있도록 하기

- 1번: 부모요소에서 this.setState()해도 자식요소에 쓰는 상태가 바뀌면 알아서 바뀔 수 있도록 하기(지금은 자식전부다 리렌더링)
- 2번: 자식요소를 선언해 놓고, 자식요소.setState()로 변경을 감지하도록 하고 있음.
- 3번: 부모.setState하되, 자식들은 본인이 넘겨받은 state가 변할 때만 리랜더링

```bash
└── SearchBox
    ├── AutoComplete.js
    ├── RecentSearchList.js
    ├── Selector.js
    └── index.js
```

### 1번 부모.setState() -> 부모 아래 자식 모두 리랜더링

```js
// index.js
SearchBox.prototype.renderChild = function () {
  const { option, recentSearchList, autoSearchList } = this.state;
  // 생략
  new Selector($selector, {
    option,
    changeSearchOption: changeSearchOption.bind(this),
  });
  new RecentSearchList($searchRecord, {
    option,
    recentSearchList,
  });
  new AutoComplete($searchAuto, { autoSearchList });
};

SearchBox.prototype.setState = function (newState) {
  this.state = { ...this.state, ...newState };
  this.renderChild();
};

function handleSubmit(event) {
  // 생략
  this.setState({ inputValue: '', recentSearchList: updatedRecentSearchList });
  this.$input.value = '';
  // 생략
}

async function handleInput({ target }) {
  // 생략
  this.setState({ inputValue, autoSearchList: reponseTerms });
}
```

### 2번: 선택적으로 자식.setState()실행

```js
// HtmlElement.js
HtmlElement.prototype.setState = function (newState) {
  this.state = { ...this.state, ...newState };
  this.render();
};

//index.js
SearchBox.prototype.init = function () {
  this.state = {
    showHistroy: true,
    option: '전체',
    inputValue: '',
    recentSearchList: myLocalStorage.get(RECENT_SEARCH_LIST) || [],
    autoSearchList: [],
  };
};

SearchBox.prototype.renderChild = function () {
  const { option, recentSearchList, autoSearchList } = this.state;
  // 생략
  this.$Selector = new Selector($selector, {
    option,
    changeSearchOption: changeSearchOption.bind(this),
  });
  this.$RecentSearchList = new RecentSearchList($searchRecord, {
    option,
    recentSearchList,
  });
  this.$AutoComplete = new AutoComplete($searchAuto, { autoSearchList });
};

// SearchBox 인풋이 바뀔때마다 리렌더링이 일어나서 render()실행하지 않게 오버라이딩
SearchBox.prototype.setState = function (newState) {
  this.state = { ...this.state, ...newState };
};

// 검색어를 입력하면 RecentSearchList.js에서도 변경되어야해서
function handleSubmit(event) {
  // 생략
  this.setState({ inputValue: '' });
  this.$RecentSearchList.setState({
    recentSearchList: updatedRecentSearchList,
  });
  this.$input.value = '';
  // 생략
}

async function handleInput({ target }) {
  // 생략
  this.$AutoComplete.setState({ autoSearchList: reponseTerms });
  this.setState({ inputValue, autoSearchList: reponseTerms });
}
```

### 3번: 부모.setState하되, 자식들은 본인이 넘겨받은 state가 변할 때만 리랜더링

## 4. 이벤트핸들러 함수 vs 객체

이벤트 핸들러를 객체나 클래스로 선언해보기

🎯 의도

이벤트핸들러를 컴포넌트(htmlElement)가 정의된 코드 아래 묶지 않고 따로 선언해뒀는데, 컴포넌트에 넣어 보려고 함.

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

이유:

- 이벤트 동작 함수를 element.prototype안에 묶어두지 않아서, this를 bind나 call로 묶어야했는데 이렇게 하니까 코드가 복잡해지고 수정이 어려워짐

🤔 문제점

- 컴포넌트 안에서 선언하니까 컴포넌트가 비대해짐
- switch문을 안쓰려고 했는데 분기처리하려면 어차피 switch문처럼 만들어야함.

```js
const getMethodName = (text) => 'on' + text[0].toUpperCase() + text.slice(1);
Main.prototype.init = function () {
  this.handleClick = {
    // 축약으로 하면 bind안 됨
    // handleEvent(event) {
    //   console.log(event, this);
    // }.bind(this),
    handleEvent: function (event) {
      const {
        target: {
          dataset: { click },
        },
      } = event;
      this.EventHandler.onClick[getMethodName(click)](event);
    }.bind(this),
  };
};

Main.prototype.setTemplate = function () {
  return `
      <h1>메인</h1>
      <div data-click="tomato" style="width: 500px; height: 500px; background-color: tomato"></div>
      <div data-click="darkgreen" style="width: 500px; height: 500px; background-color: darkgreen"></div>`;
};

Main.prototype.setEvent = function () {
  this.$element.addEventListener('click', this.handleClick);
};

Main.prototype.EventHandler = {
  onClick: {
    onTomato(event) {
      alert(event.target.dataset.click);
    },
    onDarkgreen(event) {
      alert(event.target.dataset.click);
    },
  },
};
```

## 5. 의도적인 이벤트 딜레이

> input, keyup, mousemove, resize

debounce과 throttling을 구현하려고 했는데 생각처럼 되지 않았다. mouse움직이나 input, change 이벤트가 발생할 때마다 특정 작업을 실행하지 않고 약간의 시간을 가졌다가 작업을 실행하게 할 생각이었다.

🤔 문제점

1. 이벤트핸들러로 함수 넘기기 (함수를 인자로 넘기기)

- 함수를 인자로 넘길 때, `함수()`로 해야하는지 `함수`로 해야하는지 차이를 잘모르겠다.
  `element.addEventListener(type, callback)` vs `element.addEventListener(type, (event) => callback(event, something))`
- 넘기는 함수의 종류(화살표함수, 표현식, 선언문)에 따라 차이가 있는거 같아서 알아보는중

```js
// 1번
$input.addEventListener('input', handleInput);
function handleInput(event) {}
// const handleInput = () => {};

// 2번
$input.addEventListener('input', (event) => handleInput(event, something));
const handleInput = (event, something) => {};
```
