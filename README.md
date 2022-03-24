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
