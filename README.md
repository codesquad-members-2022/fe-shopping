# 쿠팡 메인페이지 클론

> Goal
>
> - 기능을 구현하기 전 HTML 마크업 최대한 Fix하고 기능 개발
> - 클라이언트에서 JSON 데이터를 받아서 뿌려주고 기능을 구현할때 어떤 데이터가 들어있으면 좋을지 고민하고 데이터 만들어보기
> - CSS는 전처리기인 SASS를 학습해서 적용하기
> - ES Class 문법을 활용하여 개발
> - prototype 를 활용해서 모듈 만들기 (어떤 기능에 prototype을 사용하면 좋을련지 고민)
> - 모든 데이터는 서버(Express)에서 JSON 데이터를 받아서 처리하기
> - 기능은 검색기능과 캐러셀 기능에 집중하여 개발 진행 (해당 기능을 완성하면 스크롤 관련 기능 도전)

---

### TO DO LIST

- [x] ESLint & Prettier & SASS 셋팅

- [x] 데이터 JSON 형태로 정리

> 쿠팡 실제 메인페이지에서 검색어 입력시 fetch 응답으로 받는 데이터를 더미데이터로 사용함
> 가짜 데이터를 넣는다고 가정해도, 관련키워드 마다 json파일을 분리할까? 하나의 json 파일에서 관리할까 고민함 => 지금은 실제 DB를 사용하는게 아니기 때문에 하나의 json 파일에서 모든 키워드를 넣어놓고 받도록 하자

- [x] HTML 마크업 작업

  - Header, Footer 영역만 정적 HTML로 뿌려주고 Header 영역아래 캐러셀, Section 영역은 동적으로 뿌려주기

- [x] 컴포넌트 재사용 될 것 같은 부분 정리하기

- [ ] 위에서 정리한 컴포넌트 Class 분리 작업

- [ ] Header 영역 검색창 기능 구현

  - [ ] 검색창에 focus를 주면 '최근 검색어'가 노출되도록 구현
  - [ ] 검색어를 입력시 최근검색어 콘텐츠가 사라지고 자동완성된 결과 노출
  - [ ] 검색어 입력시 일치하는 글자는 하이라이트 되어 표시되며 추가, 삭제 모두 일치하는 자동완셩 결과가 나와야함
  - [ ] 500ms 이상 글자를 입력하지 않고 머물러 있을때만 서버에서 데이터를 가져온다
  - [ ] 키보드 방향키 위/아래로 이동시에 하나씩 이동하며 자동완성 글자가 선택되어 입력창에 보여진다.
  - [ ] 전체를 클릭하면 하단에 카테고리가 애니메이션 동작
  - [ ] 카테고리 선택 후 검색 시 해당 카테고리와 관련된 데이터만 보여지도록 구현

- [ ] Header 카테고리 햄버거메뉴 기능 구현

  - [ ] 헤더 왼쪽 상단 메뉴 오버시 카테고리 메뉴가 나오도록 구현
  - [ ] 카테고리 메뉴에서도 마우스 오버시 그에 맞는 콘텐츠가 오른쪽에 펼쳐지도록 구현

- [ ] Carousel 영역 기능 구현

  - [ ] 6개의 콘텐츠가 자동으로 바뀌도록 구현
  - [ ] 캐러샐 내 Nav영역을 마우스 오버시 해당 내용으로 캐러샐 영역과 Nav border 영역이 바뀌도록 구현

🌈 위 기능들을 모두 완료시 아래 내용 구현

- [ ] 메인페이지 내 스크롤 80% 내렸을시 기능 구현
  - [ ] 서버에서 데이터를 받기 전까지는 해당 영역 로딩창으로 화면 표시
  - [ ] 이 영역은 또 HTML 마크업을 해야하므로 보류
