# fe-shopping

## 2주차 - 2

### 저번 PR 리뷰

- MV\* 를 구현하면서, View 에서는 render 만을 위한 로직을 실행해야하는걸까? 에 대한 고민이 있어서 render, mount 를 제외한 모든 로직을 분리할까 고민했었는데, 현재 컴포넌트를 사용하는 방식 자체가 View + a 이어서 View 에서 어떤 로직을 실행하는 것에 대해 너무 순수하게 생각하지 않아도 괜찮겠다는 생각으로 다시 <a href="https://github.com/codesquad-members-2022/fe-shopping/pull/69#discussion_r832888897">highlight</a> 함수를 View 로 옮겼습니다.

- controllers 라고 분리해놓은 곳에는 이벤트 핸들링함수를 위한 로직만 포함하는 것으로 결정했습니다.

- 현재 Store의 State가 많이 복잡해지지는 않았지만, 결국에 복잡해지게 되면 Search 를 위한 Store 만을 사용하고, Search 처럼 다른 UI 들을 많이 포함하고 있는 컴포넌트가 있다면 그 컴포넌트를 위한 Store 를 사용하면 되겠다는 생각을 했습니다.

### debounce 구현의 필요성?

- keyup 이벤트에서 target.value 를 특정 ms(500)을 기준으로 500ms 이전 target.value 와 이후 target.value 를 비교해서 같으면 입력이 끝났다고 판단하는 로직을 사용했었다.

- keyup 이벤트 뿐아니라 스마트레이어(메가드롭다운)를 구현할 때에도 비슷한 debounce 로직이 필요하다고 생각이 들었고, 공통적으로 사용되는 로직을 분리해서 debounce 함수를 구현할 수 있겠다는 생각을 했다.

```js
const searchWord = target.value;
delay(500).then(async () => {
  const isFinishInput = target.value === searchWord;
  if (isFinishInput) {
    const requestOptions = {
      query: {
        keyword: searchWord,
      },
    };
    const { results: suggestionDatas } = await request(
      "search/autoComplete",
      requestOptions
    );
    if (suggestionDatas?.length) {
      store.setState({
        suggestionDatas,
        searchWord,
        searchSuggestionDisplay: "flex",
      });
    } else {
      store.setState({
        searchSuggestionDisplay: "none",
      });
    }
  }
});
```

- 필요한것

  - 기준이 될 baseTarget: 위에선 target.value, 500ms 전 후로 입력이 끝났는지 판단하는 baseTarget
  - 얼마나 debouncing 할건지? msTimer
  - baseTarget 이 ms 이전 이후 같다면 실행할 callback 함수

- 이런 형태가 되지 않을까

```js
debounce({
  baseTarget: target,
  msTime: 500,
  callback: fnFetchSuggestionData,
});
```

```js
const debounce = ({ baseTarget, msTime, callback }) => {
  const baseValue = baseTarget.value;
  delay(msTime).then(() => {
    if (baseValue === baseTarget.value) {
      callback();
    }
  });
};

const fetchSuggestionData = async (searchWord) => {
  const requestOptions = {
    query: {
      keyword: searchWord,
    },
  };
  const { results: suggestionDatas } = await request(
    "search/autoComplete",
    requestOptions
  );
  if (suggestionDatas?.length) {
    store.setState({
      suggestionDatas,
      searchWord,
      searchSuggestionDisplay: "flex",
    });
  } else {
    store.setState({
      searchSuggestionDisplay: "none",
    });
  }
};

debounce({
  baseTarget: target,
  msTime: 500,
  callback: fetchSuggestionData.bind(undefined, target.value),
});
```

### debounce 2차 수정

- target.value 는 input 에서만 유효한 비교값이 되었다.
- target 어떤 property 로 비교값을 설정할 것인지도 넘겨준 것이 좀 더 범용적이게 될 것이라고 생각이 들었다.

```js
const debounce = ({ baseTarget, msTime, callback }) => {
  const baseValue = baseTarget.value;
  delay(msTime).then(() => {
    if (baseValue === baseTarget.value) {
      callback();
    }
  });
};
```

### debounce 3차 수정

- input 을 사용한 value 추적은 event의 target 이 input 으로 한정되어 있어서 전/후 비교가 수월했었는데, 마우스 이벤트의 이벤트를 동일한 방법으로 추적하는 것은 다르다는 것을 느꼈다.

  - input 의 target.value 는 하나의 target 으로 추적할 수 있지만 마우스의 이벤트는 왼쪽에서 오른쪽으로 이동한다고 해서 동일한 target.value 와 같은 값(ex. clientX) 를 찾을 수 없었다.

- 그렇다면 `기준이 되는 value 를 통해서 추적하는 방식`을 버리고, `특정 시간 내에 동일한 event 가 발생했는지`를 파악해보는 방식으로 변경해야 겠다는 생각이 들었다.

- 어떤 이벤트를 발생하고 -> 이후 지정시간내에 동일한 이벤트를 발생했다는 것을 이전 이벤트가 어떻게 감지할 것인가?
  - 감지를 해야 취소를 할텐데

```js
const debounce = ({ msTime, callback }) => {
  const events = {};
  return function (event) {
    events[event.type] = {};
    events[event.type].event = event;
    delay(msTime).then(() => {
      if (events[event.type].event === event) {
        callback(event);
      }
    });
  };
};
```

- `events` 변수를 선언해서 클로져로 사용하도록 설정

- 문제점: 마우스 이벤트는 각기 다른 이벤트로 파악을 하기때문에 마지막 이벤트가 실행되는데 이번엔 키보드 keyup 이벤트가 처음 입력된 `keyup 이벤트 === 마지막 입력된 keyup 이벤트` 가 되어버려서 keyup 이벤트 만큼 이벤트를 모두 실행하는 반대현상이 발생..

<img width="501" alt="스크린샷 2022-03-25 오전 1 02 19" src="https://user-images.githubusercontent.com/58503584/159959075-3a5000a1-c985-4a2b-b1db-00a22e77da25.png">

- `마지막 이벤트 이다` 라고 판단하는 로직을 어떻게 짜야할까?

### debounce 4차 수정

1. event 기억하는 방법 변경

- event 객체를 그대로 저장하는 방식은 메모리적 효율이 많이 떨어짐
- events 의 깊이를 깊게 저장할 필요가 없다고 생각함
- events 의 key 를 type 으로, value 를 event 를 동작한 시간으로 하여 delay 이전 저장된 마지막 이벤트의 시간과 delay 이후 시간을 비교하는 식으로 `마지막 이벤트가 실행된 시점` 을 파악하도록 하였다.

2. `keyup 이벤트 === 마지막 입력된 keyup 이벤트` ? ❌

<img width="608" alt="스크린샷 2022-03-25 오전 11 03 16" src="https://user-images.githubusercontent.com/58503584/160040099-270c8e1c-5005-4b19-8bd5-960d65aa0f97.png">

- 결론부터 말하면 완전히 잘못 테스트 하고 있었음
- keyup 이벤트를 테스트 하고있었는데, Network 탭을 통해 확인해보니 request 를 keyup 이벤트 만큼 보내는걸 확인 -> debounce 가 안되고 있다.
- mouse 이벤트는 클로져를 제대로 활용하고 있었는데, keyboard 이벤트에서는 keyup 안에서 분개해서 처리를 하려고 하다보니 클로져가 제대로 활용되고 있지 않아서 `마지막 이벤트인지 확인` 하는 로직이 제대로 동작하고 있지 않았다.

```js
this.addEvent({
  eventType: "mouseover",
  selector: ".category__main li",
  callback: debounce({
    msTime: 1000,
    callback: ({ target }) => {
      console.log(target);
    },
  }),
});
```

```js
// Search/SearchUI/SearchInput.js
this.addEvent({
  eventType: "keyup",
  selector: "input[type='text']",
  callback: handleKeyupWithFocus,
});
// Search/controllers/searchInput.js
const handleKeyupWithFocus = (event) => {
  ...
  return debounce({
    msTime: 500,
    callback: handleKeyUpOthers,
  }).call(undefined, event);
};
```

- 동일한 환경으로 테스트를 해야한다고 뼈저리게 느낌.
- 결국 event 객체 자체를 저장하는 방식으로하면 잘 동작할 것으로 예상되긴 하는데, 이벤트 객체 자체를 저장하는 방식은 메모리적효율이 좋지 않을 것이라고 생각되어 지금의 로직을 유지하기로 했다.
- debounce 의 callback 에서 쓰여지는 함수는 event 객체 내부에서 어떤 값을 사용할 지 알 수 없으므로 범용성을 위해서 event 를 그대로 넘겨주도록 결정했다.

- 위 잘못된 방식을 고치기 위해서 다시 `keyup` 과 `keydown` 이벤트를 분리하였다.
  - 디바운싱이 필요없는 `ArrowDown`, `ArrowUp`, `Enter` 이벤트 들을 위해서 분리했는데, 하나의 이벤트 내부에서 처리할 수 있는 로직을 짤 수있을 것 같은데, 당장 떠오르는 아이디어가 없어서 천천히 고민해보려고 함.
