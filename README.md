# fe-shopping

## 요구사항

### 검색창

- [x]  검색창에 focus를 주면 최근 검색어가 노출된다.
    - input을 클릭하면 최근 검색어 목록이 뜨고, 가장 위에 있는 검색어가 파란색으로 표시 / 밑줄 처리된다.
    - 최근 검색어도 방향키 이동이 가능해야 한다.
    - 최근 검색어 기능을 끄면 기능을 끈 동안 검색한 것들은 저장되지 않는다.
        - 최근 검색어 저장 기능이 꺼져 있습니다. 문구 노출
    - 검색어 기능을 다시 켜면 검색어 저장 기능을 끄기 전에 존재했던 목록들을 그대로 불러온다.
    - 최근 검색어가 없을 경우 input을 눌러도 최근 검색어 창이 노출되지 않는다.
- [x]  검색어를 입력하면 최근 검색어 콘텐츠가 사라진다.
- [x]  글자를 입력하기 시작하면 자동완성된 결과가 노출된다.
- [x]  일치하는 글자는 하이라이트 되어 보여진다.
- [x]  검색창에 내용을 추가, 삭제할 때 모두 일치하는 자동완성 결과가 나와야 한다.
- [x]  500ms 이상 글자를 입력하지 않고 머물러 있을 때만 서버에서 데이터를 가져온다.
- [x]  키보드 방향키로 이동시 위/아래로 하나씩 이동하며, 자동완성 글자가 선택되어 입력창에 보여진다.
    - 방향키로 이동할 경우 자동완성 목록 중 해당하는 것이 밑줄처리되며 input 값으로 보여진다.
    - 다만 목록에서 다시 input으로 이동할 경우 사용자가 입력하던 값이 그대로 나와야 한다.
- [x]  왼쪽의 ‘전체'를 클릭하면 하단에 카테고리가 애니메이션 효과와 함께 펼쳐진다.
- [x]  카테고리를 선택하면 그것에 맞는 검색이 진행된다. (실제 동작은 되지 않아도 된다.)

### 메인 배너

- [x]  6개의 콘텐츠가 자동으로 바뀐다. (2초마다 한번씩)
- [x]  상품 목록을 마우스로 지나가면 해당 내용으로 보여진다.
- [x]  마우스가 빠르게 이동할 때는 내용이 변경되지 않는다. (임의 시간 지정)

### 스마트 메뉴 레이어

- [x] 스마트 메뉴 레이어 구현
- [ ] 일정 시간 내 이동 시 메뉴 노출 안됨
- [ ] 방향에 따른 적절한 하위 메뉴 노출

## 구현 내용

### HTML 작성

- 메인 배너까지의 HTML을 작성하고 SCSS를 사용해 스타일링했다.
- SCSS에서 상속은 처음 사용해보았는데, `@extend`를 사용할 경우 컴파일했을 때 연관성이 부여되므로 연관성이 있는 것들에 공통적인 스타일을 부여할 때는 `@extend`를 사용하고 그렇지 않은 경우라면 `mixin`을 사용하는 것이 좋다고 해서 용도에 맞게 사용하려고 노력했다.
- Image Sprite를 사용해 구현된 부분이 있어서 관련 내용을 찾아보고 따라서 적용해보았다.
   

### Core Component

- 모든 컴포넌트의 틀이 되는 `Component`를 프로토타입을 사용해서 구현하고, 모든 컴포넌트에서 이를 상속받아 사용하도록 했다. 컴포넌트 구조는 [블로그 글](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/#_5-%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3-%E1%84%87%E1%85%AE%E1%86%AB%E1%84%92%E1%85%A1%E1%86%AF) 을 참고했다.
   

### 검색창 컴포넌트

- 지난번에는 굳이 필요하지 않은 부분까지 컴포넌트로 구현하고, 또 너무 세세하게 나눴어서 이번에는 필요한 부분만 컴포넌트로 구현해봐야겠다고 생각했다. 검색창 부분을 컴포넌트 구조로 변환해서 사용했고 총 3가지 컴포넌트로 구성되어 있다.


- `SearchForm`
  - 카테고리를 선택하는 `SelectBox`, 검색어를 입력받는 `InputBox`를 포함하는 폼을 렌더링한다.
  - 두 컴포넌트는 모두 클릭 또는 `focus`되었을 때 하단에 창을 띄우는데, 이 로직이 유사해서 부모 컴포넌트인 `SearchForm`에서 해당 부분을 정의한 후 하위 컴포넌트에서 `props`로 받아서 쓰도록 했다.
  - 폼이 제출되었을 때 `input`의 값을 로컬 스토리지에 저장한다.
   

- `SelectBox`
  - 클릭했을 때 전체 카테고리 목록을 띄운다.
  - 다시 한번 클릭하거나 포커스에서 벗어나면 목록 창이 없어진다.
  - 목록 창이 나타날 때와 사라질 때 애니메이션 효과가 적용된다.
   

- `InputBox`
  - 입력창을 클릭했을 때 최근 검색어가 있다면 최근 검색어 창을 띄우고, 없다면 띄우지 않는다.
  - 포커스에서 벗어나면 창이 없어진다.
  - 포커스 이벤트를 등록할 때 input이 아니라 상위 요소인 폼에 등록했는데 이벤트가 발생하지 않았다. 찾아보니 `focus`와 `blur`는 이벤트 버블링이 발생하지 않아서 자기 자신의 이벤트만 작동시키기 때문에 `focusin` 또는 `focusout`을 사용하거나 `useCapture` 옵션을 사용해서 해결하면 된다고 해서 `useCapture` 옵션을 넣어주는 것으로 해결할 수 있었다.
  - `input` 이벤트가 발생하면 입력된 값에 따라 자동완성 목록을 불러와 `BottomWindow` 컴포넌트를 리렌더링한다.
   

### BottomWindow 컴포넌트

- 카테고리를 클릭했을 때나 입력창을 클릭했을 때 등의 경우에 하단에 나오는 창을 컴포넌트로 만들고, 동일한 방식으로 작동하는 것들에서 계속해서 재사용할 수 있도록 작성했다.
- 전체 카테고리를 눌렀을 때 나오는 창도 이 컴포넌트를 사용해서 구현해볼 계획이다.
- => 여러 UI를 하나의 컴포넌트만 사용하려니 너무 복잡해지는 것 같아서 카테고리 리스트를 보여주는 `CategoryList`와 자동완성 & 최근 검색어 목록을 보여주는 `KeywordList`로 분리하였다.
   

### Store (최근 검색어)

- `SearchForm`에서 `input` 값을 로컬 스토리지에 저장했을 때 최근 검색어 목록이 업데이트되었다는 것을 `BottomWindow` 컴포넌트에 알려주어서 다시 렌더링되도록 하고 싶었다.
- `props`로 전달하면 불필요한 렌더링이 발생할 것 같아 상태값을 저장하고 상태가 변경되었을 때 `subscribe`한 컴포넌트에게 알려주는 스토어를 구현해보려고 했다.   
   

```javascript
class Store {

  constructor() {
    this.state = {};
    this.subscribers = {};
  }

  subscribe(state, subscriber) {
    if (!this.subscribers[state]) {
      this.subscribers[state] = [];
      this.observe(state);
    }
    this.subscribers = {
      ...this.subscribers,
      [state]: [...this.subscribers[state], subscriber],
    };
  }

  unsubscribe(state) {
    this.subscribers[state].pop();
  }

  observe(state) {
    let _value = this.state[state];
    Object.defineProperty(this.state, state, {
      get() {
        return _value;
      },
      set: function(value) {
        _value = value;
        this.subscribers[state].forEach(subscriber => {
          subscriber.setState({ [state]: this.state[state] })
        })
      }.bind(this)
    });
  }
}
```

- `subscribe` : 상태와 인스턴스를 인자로 받아 해당 상태에 `subscriber`를 추가한다.
- `unsubscribe` : `subscriber`를 제거한다.
- `observe` : `this.state`에서 새로 상태를 등록해서 관리하고 싶을 때 실행한다. `this.state[state]` 값을 사용하려고 한다면 해당 상태값을 반환하고, 상태값이 변경된다면 상태를 `subscribe`한 인스턴스들의 `setState`를 호출하여 리렌더링되도록 한다.
- `getState`, `setState`, `clearState` : 상속받는 클래스에서 직접 state에 접근하는 게 아니라 Store 클래스의 메소드를 사용해서 상태값을 사용하도록 변경했다.
   
```javascript
class SearchHistoryStore extends Store {

  addHistory(key, value) {
    const values = JSON.parse(localStorage.getItem(key));

    if (values) {
      values.length === MAX_RECENT_SEARCH_SIZE && values.pop();
      localStorage.setItem(key, JSON.stringify([value, ...values]));
      this.state[key] = [value, ...values];
    }

    else {
      localStorage.setItem(key, JSON.stringify([value]));
      this.state[key] = [value];
    }
  }

  getHistory(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  clearHistory(key) {
    localStorage.removeItem(key);
    this.state[key] = [];
  }
}
```
   
- `SearchHistoryStore`는 `Store`를 상속받아서 최근 검색어 목록을 관리한다.
- `addHistory`, `clearHistory` 메소드에서 상태값을 변경하면 `observe`에서 지정해주었던 `set` 부분이 실행된다.
- `SearchHistoryStore`를 사용해 최근 검색어를 저장하는 기능을 구현했다.
- 전체 삭제 버튼을 누르면 저장된 최근 검색어 목록을 모두 삭제한다. 여기서 삭제 버튼을 누르면 `blur` 이벤트가 먼저 발생하는 바람에 삭제가 실행되지 못했었는데, `event` 속성 중 `relatedTarget`에서 버튼과 검색어 링크 등을 인식할 수 있는 것 같아서 이 속성값이 있다면 뒷부분이 실행되지 않고 종료되도록 처리했다.   
  => 이 부분을 `BottomWindow`에서 `mousedown` 이벤트 리스너를 등록해 `preventDefault()`를 해줌으로써 해결했다.
- 중복된 키워드가 검색되었을 때 기존 목록에서 삭제하고 맨 앞에 다시 추가해주었다.
   

### 자동 완성

- 아마존의 데이터를 가져오는 [블로그 글](https://velog.io/@ongsim123/TIL-fetch-API%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%8B%A4%EB%A5%B8-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9D%98-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0) 을 보고 활용해서 데이터를 가져왔다. 
- `input` 이벤트가 발생하면 `setTimeout`을 사용해 500ms 동안 사용자가 추가로 입력하지 않을 경우 fetch 요청을 보내고, 받아온 데이터를 `BottomWindow`에 넘겨주어 렌더링되도록 했다.
- 여러 경우의 수가 있어서 각각의 상황에 어떻게 처리해줘야 할지 구분해서 생각해보고 코드로 구현했다.
  - 현재 입력된 `input` 값이 없고 최근 검색어 목록도 없는 경우 목록 창을 띄우지 않는다.
  - 현재 입력된 `input` 값이 없지만 최근 검색어 목록은 있는 경우 최근 검색어 목록을 띄운다.
  - 그 외의 경우에는 사용자가 입력한 값에 대한 자동 완성 목록을 띄운다.

### 방향키 사용해서 리스트 아이템 focus 변경

- `InputBox`에서 `keydown` 이벤트를 사용해서 방향키로 목록을 왔다갔다 할 수 있고, 해당 요소의 값이 input에서 보여지도록 구현했다.
- 다만 이렇게 하니 자동완성 목록에서 방향키로 이동할 때 두 가지 문제가 발생했다.
  1. 한글 입력 후 방향키로 이동 시 첫번째 아이템을 거쳐 두번째 아이템으로 이동한다.
  2. `input.value`의 값을 저장하도록 했을 때, '애플'을 입력하고 자동완성 목록 중 '애플워치'로 이동했을 때 마지막 입력 중이던 글자인 '플'이 중복되어서 '애플워치플'로 저장되는 현상이 발생했다.
- 이를 해결하기 위해 이벤트 객체를 살펴보다가 한글을 입력했을 때와 영어를 입력했을 때 `event` 객체에 있는 `inputType` 속성값이 다르다는 것을 발견했다.
  - 한글 : `insertCompositionText`
  - 영어 : `insertText`
- 그래서 `Composition` 이라는 키워드로 검색해본 결과 원인을 어느 정도 파악할 수 있었다. 한글은 하나를 입력한다고 글자가 완성되는 것이 아니라 여러 개가 모여서 글자를 구성하기 때문에 IME(입력기)에서는 한글 입력 시 글자가 완성될 때까지 조합을 하는 컴포징이라는 단계를 거치게 된다. `keydown` 이벤트가 두 번 발생하는 이유에 대해서는 정확히 파악하지는 못했지만 첫번째 `keydown`에서는 컴포징 중인지를 나타내는 속성인 `isComposing`이 `true`, 두번째에서는 `false`인 것으로 보아 컴포지션을 하는 과정에서 어떠한 이유로 이벤트가 두 번 발생되는 것일 수 있겠다는 추측을 할 수 있었다.
![이벤트 발생 흐름](https://user-images.githubusercontent.com/62706988/159640913-f17121ed-2c9d-47de-b834-80f8e8ad20ec.gif)
- 이벤트가 발생할 때마다 로그로 찍어봤더니 방향키로 이동했을 때 `keydown`, `keyup` 이벤트가 각각 2번씩 발생하고, 예상하지 못했던 `input` 이벤트도 중복으로 한번 더 발생한다는 것을 확인할 수 있었다.
- 이런 현상을 고치기 위해서 `keydown` 이벤트에서는 `isComposing` 속성값이 `true`일 때 리턴시켜주고, `input` 이벤트에서는 `value`의 값이 중복으로 들어오는지 여부를 체크해서 리턴시켜줌으로써 해결하였다. (gif에서는 `value` 값이 다르게 들어오는데, `isComposing` 처리를 해줄 경우 이전 `input` 이벤트의 `value`값과 동일한 값이 들어온다.)
   

### fetch 요청 취소하기

- `input` 이벤트가 발생하고 일정 시간 동안 입력이 없을 경우 자동완성 목록을 받아오는 요청을 보내게 되는데, 그 사이에 `submit`이 될 경우 뒤늦게 목록을 받아와 보여주는 오류가 발생했다.
- `submit`이 되었다면 그 요청은 더 이상 필요없는 요청이 되므로, 포키가 알려주신 `abortController`를 사용해 요청을 취소할 수 있도록 했다.
- `abortController`는 매 요청마다 새로 생성되어 `signal`을 요청에 담아서 보내게 되고, `submit` 이벤트가 발생하면 `abortController.abort()`를 사용해서 요청을 취소한다. 취소되었을 경우 자동완성 목록이 아닌 빈 값을 반환하도록 하여 자동완성 목록이 있을 때만 `bottomWindow`를 다시 렌더링해주도록 처리했다.

### 최근 검색어 저장 기능 끄기/켜기

- 일단 `SearchHistoryStore`에 상태값을 추가해서 해당 값에 따라 최근 검색어 목록을 보여줄지 여부와 검색어 목록 삭제 기능을 막는 처리를 해주도록 했다.
- `bottomWindow`를 생성하고 지우는 과정을 반복하다보니 부모 요소에 이벤트가 여러 번 등록되어 제대로 잘 작동하지 않는 경우가 생겼다. 일단 부모 요소까지 생성하고 지우기를 반복하도록 하여 오류를 줄였지만, 컴포넌트가 없어질 때 등록한 이벤트 리스너도 함께 삭제할 수 있으면 좋을 것 같은데 잘 되지 않아서 좀 더 방법을 찾아봐야 할 것 같다.
- => fetch 요청을 취소하는 것과 마찬가지로 abortController의 signal을 이벤트 리스너에 넘겨주고 `abort()`를 호출하여 취소할 수 있도록 했다.

### 스마트 메뉴 레이어

- 마우스를 옮길 때마다 해당하는 카테고리를 띄우는 스마트 메뉴 레이어를 구현했다.
- 처음 카테고리 버튼에 마우스를 올려 목록을 띄울 때는 `mouseenter` 이벤트와 `mouseleave` 이벤트를 사용했고, 하위 목록을 띄울 떄는 `mouseover` 이벤트를 사용했다.
- 하위 목록을 띄울 때 사용하는 메소드를 재사용할 수 있도록 수정하고, 어떤 식으로 메소드를 건네줄지 고민하다가 리액트의 고차 컴포넌트라는 개념에 대해 찾아보게 되었다.
- 고차 컴포넌트는 컴포넌트를 받아서 새 컴포넌트를 반환하는 함수를 의미한다. 이전에는 믹스인이라는 개념을 사용해서 공통 로직을 사용할 수 있도록 했는데, 요즘은 잘 쓰이지 않고 고차 컴포넌트를 사용한다고 한다.
- 이 개념을 적용해서 비슷하게 구현해보고 싶었는데, [리액트 문서](https://ko.reactjs.org/docs/higher-order-components.html) 에서 프로토타입을 수정하지 말고 조합해서 사용하라는 말이 있었다. 그래서 새로운 클래스에 공통 메소드를 추가하고, 매개변수로 받은 컴포넌트를 렌더하도록 하고 싶었는데 생각처럼 잘 안됐다.
- 그래서 일단은 클래스의 인스턴스를 받아서 메소드를 추가한 후 반환하는 식으로 함수를 만들었는데, 이게 고차 컴포넌트와 유사하다고 할 수 있는지 잘 모르겠다. 공통으로 쓰이는 메소드를 어떤 식으로 넘겨주는 게 좋을지 좀 더 고민이 필요할 것 같다.
- 마우스 방향이 대각선으로 움직일 때 마우스가 일정 범위 내에 있으면 다른 카테고리로 변경되지 않도록 하는 것은 구현하지 못했다. 

### MVVM 패턴

- 메인 배너를 구현할 때 기존의 방식이 아닌 MVVM 패턴을 적용해보고 싶어서 공부해보았다.

![MVVM](https://miro.medium.com/max/1400/1*fQ0LXptWrJIbGS9LZE8p6g.png)

- View가 View Model을 소유하고, View Model이 Model을 소유하는 방식이다.

#### Model

- 데이터와 관련된 코드
- 데이터를 담아두기 위한 구조체는 물론 네트워크 로직, JSON 파싱 코드 등도 포함
- View, View Model을 신경쓰지 않아도 된다. (데이터를 어떻게 가지고 있을지만 생각하고 비즈니스 로직이나 뷰에서 어떻게 보여줄지 등은 생각하지 않아도 된다.)

#### View

- 앱의 UI에 대한 코드
- View Model로부터 데이터를 가져와 어떻게 배치할지, 특정 상황에 따라 View Model의 어떤 메소드를 이용할지에 대해서도 가지고 있다.
- Model을 직접 소유하지 않고 View Model로부터 받아와서 View에 정보를 넣어주는 방식이 일반적이다.

#### View Model

- View로부터 전달받는 요청을 해결할 비즈니스 로직을 담고 있다.
- View와 Model의 사이에서 View의 요청에 따라 로직을 실행하고, Model의 변화가 생기면 뷰에게 notification을 보내준다.
- View에 의해 Observed 되고 있다.

### 메인 배너

![설계](https://user-images.githubusercontent.com/62706988/161210248-d25c88fb-5b3f-4477-97f1-559b70de036b.jpeg)

- 위에서 정리한 내용을 바탕으로 메인 배너를 MVVM 패턴으로 구현해보았다.
- 구현하면서 고민했던 부분은 Model이 변경되었을 때 View Model에게 알리고 View Model은 그에 따라 View를 렌더링시켜줘야 하는데, MVVM 패턴은 Model이 View Model을 모르고, View Model도 View를 참조하면 안되는 구조였기 때문에 이를 어떤 식으로 구현해야 할지 고민이 필요했던 것 같다.
- Model이 View Model을, View Model이 View를 직접 참조하게 하지 않고 각각 `subscribe` 메소드를 두어 콜백을 넘겨주도록 했다. 그 콜백은 `listenrs`에 저장되고, Model이 변경되면 `notify` 메소드를 통해 받아뒀던 View Model의 `nofity` 메소드를 실행하며 또 이 메소드가 View의 `render` 함수를 실행하도록 구현했다.
- `throttle`을 사용해서 배너 카테고리에서 마우스가 빠르게 움직일 때 내용이 휙휙 바뀌지 않도록 했다.
- `myInterval`을 사용해 2초에 한번씩 메인 배너를 교체해주도록 했다.
