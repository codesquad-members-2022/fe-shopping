# 관심사 분리하기

> view, store, eventHandler, view와 store를 독립적으로 연결하는 interface

## 1. store와 HtmlElement(view)분리

- 컴포넌트마다 store를 둬서 관리하기, `store와 view는 서로를 모르게 만들기`
- view에서는 store의 state에 직접 접근할 수 없게 하기 (private으로 관리하기)

  > View에서 `this.store.state`로 접근 못하게 만들기

  ```js
  export default function Store(props) {
    let state = props;
    this.getState = function (keys) {
      if (!keys) return state;
      // 생략
    };

    this.setState = function (newState) {
      state = { ...state, ...newState };
    };
  }
  ```

- `getState()`: store의 전체 state나 요청받은 state만 전달
- `setState()`: 상태가 바뀌면 state를 변경하고 연결되어 있는 $element.render()실행
- `connectInterface.js`
  - connectStore(): store와 element를 연결
  - reRenderHtmlElement(): store.newState가 일어나면 변경된 state를 가지고 있는 htmlElement를 리렌더링

## 2. ConnectInterface 클래스 만들기

1번에서처럼 store와 view를 분리했어도 아래와 같이 별도의 객체가 아닌 view에서 store를 연결하니까 독립적이지 못하다고 생각했습니다.

```js
// 수정전
// utils.js
function connectStore({ element, store }) {
  element.store = store;
  store.targeComponent = { ...store.targeComponent, element };
}

//Main
export default function Main({ $element, isDirect }) {
  HtmlElement.call(this, { $element, isDirect });
}
Main.prototype.initStore = function () {
  connectStore({ element: this, store: mainStore });
};
```

### 별도의 인터페이스(연결)객체를 만들어서 사용

- store와 view는 서로를 모르게 하기 위해 connectInterface 객체를 만들어서 `view와 store가 서로 직접 접근할 수 없게 만들었습니다.`

```js
// 수정후
export function ConnectInterface({ elements, store }) {
  this.elements = { ...elements };
  this.store = store;
}
ConnectInterface.prototype.init = function () {
  this.store && this.connectStore();
  Object.values(this.elements).map((element) => element.init());
};

ConnectInterface.prototype.connectStore = function () {};

ConnectInterface.prototype.getStatefromStore = function () {};

ConnectInterface.prototype.setStateToStore = function () {};

ConnectInterface.prototype.reRenderHtmlElement = function () {};
```

# 앞으로 계획

- 현재 클라이언트에서 사용하는 데이터만 관리할 수 있게 만들어져 있는데, 서버에서 데이터를 가져오는 로직을 추가할 계획입니다.
- 각각의 컴포넌트별로 store가 구성되어 있는데, 전역적으로 쓰는 데이터를 위한 store를 추가해볼 계획입니다.
- 검색창 세부적인 버그 수정
- 스마트레이어 시도
