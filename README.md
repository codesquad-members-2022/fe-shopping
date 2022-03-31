# fe-shopping

- [x] 검색창 관련 모듈 개발
- [x] 프로토타입 / 클래스 혼용
- [X] SCSS 및 마크업
- [X] 자동 캐러셀 이벤트
- [X] 카테고리 드롭다운 애니메이션
- [X] 검색창 방향키 탐색기능

[배포 링크](https://devinu33.github.io/fe-shopping/)

상태관리를 통한 이벤트 구현에 주력했습니다. 중간에 한가지 겪었던 일이 있었는데, 검색창에서 방향키 탐색 이벤트를 설정할 때, 기존의 input 발생 시 자동완성 되는 이벤트가 일어나지 않도록 구현해야 하는 부분이
있었습니다. 방향키로 탐색할 때는 해당 방향키 칸에 있는 검색어로 input 칸의 값이 바뀌지만 바뀐 값으로는 자동완성이 일어나지 말아야 하는 것이었습니다. 이를 위해서는 방향키 이벤트가 발생할 때마다 input
값에 따라 자동완성이 렌더링 되어야 하는 부분을 막아줘야했습니다.

저는 proxy로 observer 기능을 하는 상태를 전역으로 만들었기 때문에, 이 부분을 구현하기 위해서는 부모에서 방향키 이벤트가 일어날 때 아래의 popup창에 해당하는 자식 뷰 컴포넌트가 참조하고 있는 '
currentInput' 속성을 참조하지 않도록 해제해줘야할 필요가 있었습니다. 이를 위해서 subscribe과 unsubscribe로 옵저빙(렌더링)을 막거나 다시 재개할 수 있는 메서드를 구현했습니다. 이 부분은
저도 잘 생각치 못했던 부분이었는데 다른 분의 PR에서 아이디어를 얻을 수 있었습니다.

전역상태를 만들었기 때문에, 서로 다른 컴포넌트 간의 소통을 할 필요가 없지만, 위의 경우에서는 부모에서 방향키 이벤트를 시작했다고 자식컴포넌트에게 알려주는 무언가가 필요했는데 이를 컴포넌트 간에 전달하는 방식으로
해결할 수도 있었지만 전역 상태를 사용한 김에 그냥 전역에 방향키 이벤트 시작을 나타내는 상태를 하나 더 추가해서 해당 값에 따라 구독과 구독해제가 일어나게 만들었습니다.   
이벤트 동작의 완성도가 조금 떨어지는 점을 보완하겠습니다.

render function을 포인터로 구현하여 매번 렌더링이 일어날 때마다 모든 자식 컴포넌트도 새로 생성하여 상태를 다시 initState로 초기화하는 것을 막을 수 있었습니다. 
