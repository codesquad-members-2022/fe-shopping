
### 쿠팡 클론

#### 주요 기능
- 쿠팡 쇼핑몰 메인페이지 UI

- 검색 자동완성 기능

- 캐로셀 기능

#### 1. 설계

1. 기능별로 모듈 구분하기
    - TemplateCreator : HTML 템플릿 생성하여 반환하는 함수들 모음.
        - class 로는 뭘 쓸까?
        - templateMaker..?
    - Viewer : template 을 조합하여 render 단위 함수로 만듦.
        - templateCreator 받음.
        - 템플릿을 조합하는 class ? 
    - Controller : 이벤트 추가, 조작 시 Model 에 데이터 요청, Viewer 에 넘겨주기.
        - 이벤트 추가
            - 전체 탭에 마우스오버 시 애니메이션, 아래 영역 표시
            - 검색에 글자 입력 시 아래 영역에 자동완성 목록 표시, 입력 시마다 반영
    - Model : controller 요청 시 서버에 데이터를 요청하고 받는다. 받은 데이터를 viewer || controller 에 넘긴다.
    
2. 무엇을 class 로 구현할까?
