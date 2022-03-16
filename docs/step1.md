
### 쿠팡 클론

#### 주요 기능
- 쿠팡 쇼핑몰 메인페이지 UI

- 검색 자동완성 기능

- 캐로셀 기능

#### 현재까지 구현 사항

![image](https://user-images.githubusercontent.com/90082464/158507573-27cad74c-1d76-426a-a322-c198b77bb80c.png)


#### 구현 checklist
- [ ] HTML 만들기
    - [x] top-bar
    - [x] header
        - [x] category-btn
        - [x] section__inner : 로고, form(select, search), icon-menu
        - [x] section__nav-bar 
    - [ ] banner
- [x] Sass 사용하기
    - [x] style.scss 생성
        - 파트별 _part.scss 로부터 import 받기.
    - [x] @mixin 사용해보기
- [ ] js 동적 생성
    - [x] header rendering
- [x] 전체 카테고리 클릭 시 하위 영역 hidden on-off
       

#### 궁금한 점
- 쿠팡은 element 위치를 float, absolute 를 통해 잡던데, 이 방식이 일반적인지 궁금합니다.
- image tag 대신 background-img 를 사용해서 대부분의 그림을 넣었는데 실제로 사용하는 방식인지 궁금합니다.

#### 구현과정

1. HTML, CSS 만들기
    - 공부한다는 마음으로 쿠팡 홈페이지의 엘리먼트 구조, css 를 보고 따라해보았다.
        - 구조가 생각보다 복잡하고, 엘리먼트 위치를 잡을 때 float 과 absolute 를 많이 사용했는데, 평소에 잘 쓰지 않던 방식이어서 이해하는데 오래걸렸다.
        - 그룹 리뷰 때 조원들이 쿠팡 구조 별로인 것 같다고...하여 바꾸려고 하였으나 이미 늦어서 header 까지는 그대로 하기로 했다.
        - 쿠팡을 따라해서도 있지만 여전히 css 는 어렵다. 어떤 스타일을 써서 어떻게 배치하는게 좋은지, 감이 바로 오지 않는다.
    - Sass
        - 최신이라고 하는 dart sass 설치
        - scss 가 css 와 비슷한 문법이라 scss 사용
        - style.scss 만 css 로 만들고, 나머지는 _part.scss 로 만들어 import 만 하는 구조 만들어보기
        - 변수 map 사용 : 더 체계화해서 사용한다면 좋을 것 
            ```scss
            $header-width: (base: 1020px, search-form: 518px);
            $header-height: (top-bar: 32px, header: 115px, search-form: 37px);
            ```
        - @mixin 사용 : 매개변수 받기
            ```scss
            @mixin bg-img-no-repeat($url) {
              background: {
                image: url($url);
                repeat: no-repeat;
              };
            }
            ```

2. render 
    - header template 를 사용하여 body 에 header 붙이기.
    - template 은 innerHTML 로 넣어야하다보니 render 시 template 을 넣을 element 가 필요한 상황이 발생..
    - template 구성 시 고려해야겠다.
    

#### 1. 설계

- 카카오 페이지 때 내가 사용한 방식 : 한 컴포넌트 js 파일마다 엘리먼트 생성, render, 이벤트 추가를 하였다. 
    - 컴포넌트를 잘못하여 크게 나눌 경우에 함수가 너무 많아지거나, 지저분해지는 경향이 있다.
    - 컴포넌트의 위치를 배치할 때 각 컴포넌트의 render 함수들을 다 불러와야 한다.
    - 이벤트를 추가할 때 다른 컴포넌트의 함수를 가져와서 사용해야 하는 경우 많았다. 
    
- 렌더 / 이벤트컨트롤러 / 템플릿생성 등 각각을 별도 모듈로 구성한다면?

1. 기능별로 모듈 구분하기
    - TemplateCreator : HTML 템플릿 생성하여 반환하는 함수들 모음.
    - Viewer : template 을 조합하여 render 단위 함수로 만듦.
        - templateCreator 받음.
    - Controller : 이벤트 추가, 조작 시 Model 에 데이터 요청, Viewer 에 넘겨주기.
        - 이벤트 추가
            - 전체 탭에 마우스오버 시 애니메이션, 아래 영역 표시
            - 검색에 글자 입력 시 아래 영역에 자동완성 목록 표시, 입력 시마다 반영
    - Model : controller 요청 시 서버에 데이터를 요청하고 받는다. 받은 데이터를 viewer || controller 에 넘긴다.
    
2. 무엇을 class 로 구현할까?
    - 아직은 잘 모르겠으니 일단 모듈을 나눠가며 구현해보기.
    
