# fe-shopping

## 2주차 - 2

### 저번 PR 리뷰

- MV\* 를 구현하면서, View 에서는 render 만을 위한 로직을 실행해야하는걸까? 에 대한 고민이 있어서 render, mount 를 제외한 모든 로직을 분리할까 고민했었는데, 현재 컴포넌트를 사용하는 방식 자체가 View + a 이어서 View 에서 어떤 로직을 실행하는 것에 대해 너무 순수하게 생각하지 않아도 괜찮겠다는 생각으로 다시 <a href="https://github.com/codesquad-members-2022/fe-shopping/pull/69#discussion_r832888897">highlight</a> 함수를 View 로 옮겼습니다.

- controllers 라고 분리해놓은 곳에는 이벤트 핸들링함수를 위한 로직만 포함하는 것으로 결정했습니다.

- 현재 Store의 State가 많이 복잡해지지는 않았지만, 결국에 복잡해지게 되면 Search 를 위한 Store 만을 사용하고, Search 처럼 다른 UI 들을 많이 포함하고 있는 컴포넌트가 있다면 그 컴포넌트를 위한 Store 를 사용하면 되겠다는 생각을 했습니다.
