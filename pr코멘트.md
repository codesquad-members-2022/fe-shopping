# 시도한 부분들

> 관심사를 분리하기

1. 이벤트핸들러 분리하기
2. store 분리하기
3. debounce 구현시도

### 이전 코드의 문제점

1. 각 컴포넌트마다 `상태`, `템플릿`, `이벤트핸들러`를 가지고 있었습니다.

- 한 파일에서 위의 3가지를 모두 관리하다보니 코드가 길어졌습니다.

2. 계층적인 구조에서 상태 관리

- 컴포넌트가 하위 컴포넌트를 포함할 경우, 부모 컴포넌트에서 하위 컴포넌트에서 쓰는 상태를 관리하다보니 부모 컴포넌트에 이벤트 핸들러가 필요 이상으로 복잡해졌습니다.

## 1. 이벤트핸들러 분리하기

- 지난 피드백에서 클래스와 함수 둘다 쓰기보다는 통일해서 사용하면 좋겠다는 피드백을 받았었는데 아래 예시처럼 `메인 메서드안에서 함수로 분리할 수 있는 로직(서브 로직)까지 같은 객체의 메서드에 넣어야 할까?` 라는 의문이 들었습니다.
- `EventHandler클래스`를 만들어 각 컴포넌트마다 eventHandler인스턴스를 만들어서 관리
  위에서 했던 고민(세부 로직 관리)을 해결하기 위해 EventHandler클래스에 `CoreHandler`와 `SubLogic`을 구분해봤습니다.

  ```js
  SearchBox.prototype.setEvent = function () {
    const {
      coreHandler: { handleInputKeyDown },
    } = this.eventHandler;
    this.$input.addEventListener('keydown', handleInputKeyDown.bind(this));
  };

  SearchBox.prototype.eventHander = {
    handleInputKeyDown(event) {
      const activeElement = setActiveElement.call(this);
      switch (key) {
        case 'ArrowDown':
          const newArrowDownTerm = handleArrowDown(activeElement);
          break;
        case 'ArrowUp':
          const newArrowUpTerm = handleArrowUp(activeElement);
          break;
        default:
          break;
      }
    },
  };
  function setActiveElement() {
    // 생략
  }
  function handleArrowDown() {
    // 생략
  }
  function handleArrowUp() {
    // 생략
  }
  ```

`아쉬운점`

- 컴포넌트에서 핸들러를 분리했지만, 부모 컴포넌트(search)에서 자식 컴포넌트(자동완성팝업창, 히스토리팝업창, 검색옵션창)를 관리해서 여전히 이벤트 핸들러가 복잡했습니다.
- call, bind 같은 this를 묶는 로직을 줄이기 위해 클래스의 메서드로 이벤트 핸들러를 넣고 싶었는데 EventHandler라는 클래스를 따로 선언해서 로직을 줄이지 못했습니다.

## 2. store 분리하기

> (여기서)[https://github.com/codesquad-members-2022/fe-shopping/pull/69#pullrequestreview-918243243] 힌트를 얻어, 독립된 컴포넌트별로 여러 개의 store를 만들어 활용해 보려고 합니다.

- 핸들러를 따로 분리하긴 했지만 `여전히 부모 컴포넌트에서 자식의 모든 상태를 관리하기 때문에 핸들러가 복잡`하는 생각이 들어서 store라는 공간을 만들어 state들을 관리하면 좋을 것 같았습니다.
- 컴포넌트가 계층적인 형태일 때, 부모 컴포넌트에서 자식에서 쓰는 상태까지 관리할 필요 없이 store라는 독립된 공간을 만들어 각 컴포넌트별 상태를 관리해보기

![store](https://user-images.githubusercontent.com/71386219/160060277-f922ff85-81a2-47e4-9b37-973475d0647f.jpg)

- store를 어떻게 분리할까 고민하다 `현재 코드에 곧바로 적용하기 어려워` gist에 간단한 로직으로 동작하는 탬플릿을 코드를 만들어보고 있습니다.

> [관심사를 분리해서 템플릿 구조 만들어보기](https://gist.github.com/kimyouknow/dc7cd3e4c20d49e7318f27c81a638b92)

2. debounce

debounce를 구현해보려고 했습니다.

> [효과적인 이벤트 핸들링 - debounce구현시도](https://gist.github.com/kimyouknow/004adaca72af78c883523f335d197efe)
