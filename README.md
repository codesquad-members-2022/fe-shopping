# fe-shopping

## to do

-   [ ] 쿠팡 쇼핑몰 메인페이지 UI

    -   [x] SASS를 사용
    -   [ ] 데이터는 목데이터로 처리

-   [ ] 검색 자동완성 기능

    -   [x] 검색 창이 focus 되면, '최근 검색어'가 노출된다.
    -   [x] 글자를 입력하면 자동 완성된 결과를 검색창 아래 노출한다.
    -   [x] 일치하는 글자는 하이라이트 표시한다.
    -   [x] 글자를 입력할 때와 삭제할 때 모두 동작한다.
    -   [x] 글자를 입력하다가 500ms 이상 글자 입력이 더 들어오지 않을 때만 데이터 요청
    -   [x] 서버에서 데이터를 가져오기
    -   [x] 키보드 방향키로 목록에서 현재 가리키는 아이템 표시하기
    -   [x] 이동할 때마다 입력창에 자동완성 글자가 표시된다.
    -   [x] 목록에 hover 시 밑줄, 파란색으로 표시
    -   [x] 목록 아이템 클릭 시 입력창에 글자 표시
    -   [x] 최근 검색어 목록 전체 삭저 버튼 기능
    -   [x] 최근 검색어 목록 기능 끄기 가능하도록
    -   [x] 최근 검색어 목록 오른쪽 hover 시 삭제 글자 노출
    -   [x] 그리고 삭제 기능 가능하도록
        -   [x] 삭제했을 때 포커싱 중이던 아이템에 따라 화면 변경
            -   [x] 포커싱 중이던 아이템 앞에 있는 아이템을 삭제했을 경우 포커싱 그대로 유지
            -   [x] 포커싱 중이던 아이템 삭제하면 검색창의 글자도 없어지고 모든 포커싱이 사라지고 초기화됨
            -   [x] 포커싱 중이던 아이템 뒤에 있는 아이템을 삭제했을 경우 포커싱 그대로 유지

-   [ ] 검색 카테고리 지정

    -   [x] 전체를 클릭하면 하단에 카테고리가 펼쳐진다.
    -   [x] 카테고리 리스트가 펼쳐진 채로 위에 박스를 누르면 카테고리가 접힌다.
    -   [x] 카테고리 리스트 애니메이션 추가
    -   [ ] 카테고리를 선택하면 카테고리 박스의 텍스트가 바뀐다.
        -   [x] 클릭 이벤트
        -   [x] 키보드 이벤트 (위아래 방향키, 엔터키)
        -   [ ] 키보드로 카테고리 아이템 이동할 때 카테고리 리스트 자동으로 스크롤
    -   [x] 선택된 카테고리에 맞는 검색을 할 수 있다. (실제 동작은 하지 않아도 된다.)

-   [ ] 캐로셀 기능

    -   [ ] 일정 시간 간격으로 콘텐츠가 자동으로 바뀐다.
    -   [ ] 콘텐츠가 바뀌면 오른쪽 박스 부분 하이라이팅도 바뀐다.
    -   [ ] 오른쪽 박스 부분을 마우스로 지나가면 해당 내용으로 콘텐츠와 하이리이팅이 바뀐다.
    -   [ ] 마우스가 빠르게 지나가면 내용이 변경되지 않는다.

## 진행 과정

### css 방법론

아침 스크럼 시간에 css 방법론 얘기가 나온 김에 적용해봤다. 먼저 BEM 방식으로 클래스 이름을 작성해보려고 했다. 마땅한 이름이 생각나지 않아 OOCSS 방법으로 재사용할 수 있는 것들을 우선 만들었다. 한참 OOCSS 방식으로 작성했더니 이젠 OOCSS로 짓기 애매한, 구체적으로 어디의 누구인지 적어주는게 더 좋아보이는 것들이 보였다. 결과적으로 BEM 방식과 OOCSS 방식이 섞인 형태가 되었다. 그룹 리뷰 시간에 이에 대해 말을 했더니 유지보수가 잘 될 수 있도록 읽기 쉽게 작성하는 게 목적이니 섞여도 읽기 좋으면 괜찮지 않을까라는 답을 들었다.

### sass

-   css 파일은 직접 건드리지 않고 sass에서 파일을 분리해 스타일들을 작성하므로 css파일을 하나로 두었다.
-   처음에는 css를 작성하던 것처럼 작성해서 sass 사용의 장점을 느끼지 못했는데, 들여쓰기와 &를 사용해 중복을 줄이고 관련된 부분의 스타일들을 뭉쳐놓으니 읽기 좋았다.
-   컴파일된 css 파일을 보면 `-webkit...`, `-ms...` 같은 부분이 추가되어 있는데, 알아서 속성 적용이 안되는 브라우저를 신경써주니 편리하다.

### 서버에 데이터 요청

query string과 path variable 중 query string을 택했다. 카테고리를 선택해 검색어를 필터링하게 되므로 query string을 선택했다.  
이전에 데이터 구조를 Map으로 작성했는데, JSON으로 바꿔야 해서 객체로 바꿨다.

### 검색창 애니메이션

처음에 카테고리가 클릭되면 `display: block`으로 보여주고 사라질 때는 `display: none`으로 바꿨다. 이 상태에서 애니메이션을 적용하려고 했는데 `transition`이 적용되지 않았다. `transition`은 이전 속성의 값과 바뀌게 될 속성의 값을 비교해서 차이를 부드럽게 연결해주는데 요소를 렌더트리에서 제외시키는 `display: none`의 경우 이전 속성이 없기 때문에 적용이 안된다. 그래서 `visibility` 속성을 이용해 해결했다.  
`visibility` 속성을 사용하면서 걸렸던 부분은 화면에 보이지는 않지만 자리를 차지한다는 점이었다. 여기선 `visibility`속성을 적용하는 요소의 경우 `position: absolute`이기 때문에 다른 요소의 위치에 영향을 미치지 않았다.  
또 신경쓰였던 점은 `visibility: hidden`을 적용한 요소가 보이지는 않더라도 위치하고 있기 때문에 클릭 이벤트가 발생하지 않을까였다. 찾아보니 마우스를 이용한 클릭 이벤트는 불가하다고 나왔고 실제로도 클릭 이벤트가 발생하지 않았다.  
`display`속성으로 애니메이션을 적용할 수도 있다. 자바스크립트에서 `display: none`을 `setTimeout`을 걸어 애니메이션이 동작한 후 적용되도록 하면 애니메이션이 원하는대로 동작하는 것처럼 보인다.

### 카테고리 선택해서 검색하기

여성패션 카테고리 선택시 `ㅌ, 티, 팃, 티셔, 티셫, 티셔츠`에 대해서만 다른 연관 검색어 리스트가 뜨도록 했다. 다른 카테고리의 경우 전체와 동일하게 보여주도록 했다.

### 최근 검색어 목록 항목 삭제 이벤트

최근 검색어 목록을 삭제하면 최근 검색어 목록창은 그대로 보이는 상태로 아이템만 삭제되어야 하는데 목록창도 함께 사라지는 문제가 있었다. 항목 삭제 이벤트를 `listContainer`에 달아줬는데 이벤트 버블링이 발생해 `document.body`의 클릭 이벤트가 발생해서 생긴 문제였다. `listContainer`의 클릭이벤트 핸들러에서 `event.stopPropagation`을 해 버블링을 막아줬고 의도한대로 동작되었다.

(원인 파악 과정) 목록창이 사라지는 건 목록창의 `display`속성이 `none`이 됐기 때문이라고 생각해 `display: none`을 적용하는 메소드 `searchList.hide()`를 호출하는 부분을 살펴봤다. 코드만 봐서는 원인을 찾을 수 없었다. 그래서 `deleteRecentItem`의 코드를 한 줄씩 지워가면서 `renderSearchList`가 있을 때만 목록창이 사라져 문제가 발생하는 부분이 `renderSearchList`라고 생각했다. 그런데 `renderSearchList`에 문제가 있다면 `renderSearchList`를 사용하는 최근검색어끄기/켜기 부분에서도 목록창이 사라져야하는데 제대로 동작해 잘못 파악했음을 알았다. 마지막으로 `deleteRecentItem` 함수 내부에 `debugger`를 걸어 확인했더니 생각치도 못했던 `document.body`의 이벤트 핸들러가 호출되는 것을 알 수 있었다.

(느낀점) 그동안 버블링에 대해서 버블링을 이용하면 리스트 아이템(ex. li)마다 이벤트 리스너를 달지 않고 리스트 컨테이너(ex. ul)에서 한 번에 처리할 수 있다는 식으로만 이해하고 있었다. 이번에 자식 요소에 이벤트 리스너를 달고 부모 요소에도 이벤트 리스너가 있다면 버블링을 고려해야한다는 걸 알았다!

### 문제

-

```
.header
    grid-template-columns: 1fr 9fr;
    span
        font-size: $main-font-size
    li
        font-size: $main-font-size
```

~~`.header`에 `font-size`를 줘서 `span`, `li`에 직접 `font-size`를 안사용하고 싶은데, 상속이 안된다..~~  
최상위 루트 `html`에 font-size를 지정해야하는데 `*`에 font-size를 적용해서 생겼던 문제!

-

```
.today-items
    grid-template-columns: repeat(4, 1fr)
```

위와 같이 작성하면 컴파일된 css 파일에 빨간줄이 뜬다. 그래서 `1fr 1fr 1fr 1fr`로 적었다.

-   연관검색어 목록에서 방향키 이동했을 때 갑자기 다시 처음으로 돌아가는 현상
    -   **(해결)** 방향키를 누르면 목록의 검색어로 입력이 바뀌면서 input 이벤트가 발생해서 생기는 문제  
        (이전) curIdx를 show에서 초기화했더니 input 이벤트가 발생하면서 다시 curIdx가 처음으로 돌아갔음  
        (수정 후) curIdx를 hide에서 초기화함. 이렇게 해도 방향키를 누르면 input 이벤트가 발생하면서 목록을 새로 렌더링하므로 현재 가리키고 있던 아이템을 그대로 가리키도록 curIdx가 -1이 아닐 경우 focusItem()을 하도록 함
