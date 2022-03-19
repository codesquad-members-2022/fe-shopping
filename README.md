# fe-shopping

## 요구사항

### 검색창

- [ ]  검색창에 focus를 주면 최근 검색어가 노출된다.
    - input을 클릭하면 최근 검색어 목록이 뜨고, 가장 위에 있는 검색어가 파란색으로 표시 / 밑줄 처리된다.
    - 최근 검색어도 방향키 이동이 가능해야 한다.
    - 최근 검색어 기능을 끄면 기능을 끈 동안 검색한 것들은 저장되지 않는다.
        - 최근 검색어 저장 기능이 꺼져 있습니다. 문구 노출
    - 검색어 기능을 다시 켜면 검색어 저장 기능을 끄기 전에 존재했던 목록들을 그대로 불러온다.
    - 최근 검색어가 없을 경우 input을 눌러도 최근 검색어 창이 노출되지 않는다.
- [x]  검색어를 입력하면 최근 검색어 콘텐츠가 사라진다.
- [x]  글자를 입력하기 시작하면 자동완성된 결과가 노출된다.
- [ ]  일치하는 글자는 하이라이트 되어 보여진다.
- [x]  검색창에 내용을 추가, 삭제할 때 모두 일치하는 자동완성 결과가 나와야 한다.
- [x]  500ms 이상 글자를 입력하지 않고 머물러 있을 때만 서버에서 데이터를 가져온다.
- [ ]  키보드 방향키로 이동시 위/아래로 하나씩 이동하며, 자동완성 글자가 선택되어 입력창에 보여진다.
    - 방향키로 이동할 경우 자동완성 목록 중 해당하는 것이 밑줄처리되며 input 값으로 보여진다.
    - 다만 목록에서 다시 input으로 이동할 경우 사용자가 입력하던 값이 그대로 나와야 한다.
- [x]  왼쪽의 ‘전체'를 클릭하면 하단에 카테고리가 애니메이션 효과와 함께 펼쳐진다.
- [ ]  카테고리를 선택하면 그것에 맞는 검색이 진행된다. (실제 동작은 되지 않아도 된다.)

### 메인 배너

- [ ]  6개의 콘텐츠가 자동으로 바뀐다. (2초마다 한번씩)
- [ ]  상품 목록을 마우스로 지나가면 해당 내용으로 보여진다.
- [ ]  마우스가 빠르게 이동할 때는 내용이 변경되지 않는다. (임의 시간 지정)

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
   

### 자동 완성

- 아마존의 데이터를 가져오는 [블로그 글](https://velog.io/@ongsim123/TIL-fetch-API%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%8B%A4%EB%A5%B8-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9D%98-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0) 을 보고 활용해서 데이터를 가져왔다. 
- `input` 이벤트가 발생하면 `setTimeout`을 사용해 500ms 동안 사용자가 추가로 입력하지 않을 경우 fetch 요청을 보내고, 받아온 데이터를 `BottomWindow`에 넘겨주어 렌더링되도록 했다.
- 여러 경우의 수가 있어서 각각의 상황에 어떻게 처리해줘야 할지 구분해서 생각해보고 코드로 구현했다.
  - 현재 입력된 `input` 값이 없고 최근 검색어 목록도 없는 경우 목록 창을 띄우지 않는다.
  - 현재 입력된 `input` 값이 없지만 최근 검색어 목록은 있는 경우 최근 검색어 목록을 띄운다.
  - 그 외의 경우에는 사용자가 입력한 값에 대한 자동 완성 목록을 띄운다.
