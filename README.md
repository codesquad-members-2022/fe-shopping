# fe-shopping

## 1주차 - 3

task list

- [x] +) 최근 검색어는 localStorage 에 저장해서 저장하고, 불러오기
- [x] +) 키보드 위/아래 이동시 이동 -> Suggestion 과 Recent 가 동일한 Index 로
- [x] 전체 를 클릭하면 하단에 카테고리 펼치기 - Visibility + delay 로직에서 overflow hidden 을 주어서 height 만을 이용해 transition 사용하는 것으로 변경..
- [x] Store 분리

## ✅ PR 리뷰에서 개선한 점

### Store(Model) 를 분리해서 처리

- 기존의 각각의 컴포넌트들이 갖는 state 를 store 가 모두 갖도록 분리했습니다.
- store 를 분리하고서 어떻게 store 가 notify 해야할 지 고민을 많이해보았는데 떠오르는 방법은 모두 실패해서 작성된 옵저버패턴을 참고해서 코드를 작성했습니다. (core/observer)

### Store 를 쓰면서 느낀 단점?

- store + observer 패턴 을 쓰면서 아쉬웠던 점은 `store 가 모든 state 를 갖게되어서 어느 Component 에서 쓰이는지 확인하기 어렵다` 는 것이었습니다.

- 만약 store의 state 가 너무 커진다면 어떤 Component 에서 쓰는지 구분하기 어렵지 않을까? 란 생각을 했습니다.
  - 그래서 state 안에 어느 Component 에서 쓰이는지 작성하는 식으로 하고 flat 시켜서 넣으면 되지않을까? 싶었는데 하나의 State 를 두 개의 Component 에서 쓰는 경우도 있을 것 같아 중복으로 보여져서 꺼려지게 되었습니다. Component 별 state 를 어떻게 명시적으로 보여줄 지를 좀 더 고민해봐야겠다는 생각을 했습니다.

```js
const initState = {
  categoryTitle: "전체",
  categoryDatas: [],
  searchWord: "",
  searchRecentDisplay: "none",
  searchSuggestionDisplay: "none",
  suggestionDatas: [],
  recentDatas: JSON.parse(localStorage.getItem("recent")) || [],
  selectedInputIdx: 0,
};

// 생각해본 방법..
const initState = {
  categoryState: {
    categoryTitle: "전체",
    categoryDatas: [],
  },
  searchState: {
    searchWord: "",
    searchRecentDisplay: "none",
    searchSuggestionDisplay: "none",
  },
  searchSuggestionState: {
    suggestionDatas: [],
    selectedInputIdx: 0,
  },
  searchRecentState: {
    recentDatas: JSON.parse(localStorage.getItem("recent")) || [],
    selectedInputIdx: 0, // 중복으로 쓰여짐, 의미없는 값이 되는데..?
  },
};
```

### Store 를 쓰면서 느낀 장점

- `Component` 에서 분리된 `Store` 에서 `state` 를 가져오는 방식으로 하니 `$props` 를 통해서 전달하던 복잡한 로직에서 벗어날 수 있었고, `View` 간에 결합성이 떨어져 각각의 `Component` 를 작업하는 데 생기는 부수효과가 적어져서 유지보수가 용이해졌다는 생각이 들었습니다.

- 또한 하나의 state 에서 property 를 관리하다보니 뜻하지않게 변수명이 구체적이게 되어서 가독성이 더 좋아졌다는 느낌을 받았습니다.

- 단점대비 장점이 훨씬 많은 느낌을 받아서, Store 를 쓰지않을 이유가 없다는 생각이 들었습니다.
