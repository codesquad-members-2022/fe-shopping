# 쇼핑몰 - 모듈과 객체지향프로그래밍

## 구현 결과

- [x] 검색창에 foucs를 주면, ‘최근검색어’ 가 노출된다.
- [x] 검색어를 입력하면 콘텐츠가 사라진다.
- [x] 전체를 클릭하면 하단에 카테고리가 애니메이션으로 휘리릭~ 펼쳐진다.
- [x] 전체 삭제 클릭 시, 기록이 삭제되고 내역 창이 닫긴다.
- [ ] 최근검색어끄기 클릭 시, 내역 창이 닫긴다.

- [x] ES Modules 이해한다.
- [x] ES Classes 를 활용해서 모듈을 만든다.
- [ ] prototype 를 활용해서 모듈을 만든다.
- [ ] 서버와 데이터 통신을 할 수 있다.
- [x] CSS Preprocessor 를 활용한다.

# 수정할 부분

- 처음 검색 버튼 클릭 시, null 기록에서 삭제
- 검색 자동완성

## 구현 설명

```
├── 📁static
│   ├── 📁resources
│   │   ├── 📁scss
│   │   │   ├── 📁components
│   │   │   │   └── 📁header
│   │   │   ├── 📁utils
│   │   │   │   │── common.scss
│   │   │   │   │── function.scss
│   │   │   │   │── reset.scss
│   │   │   │   └── varable.scss
│   │   │   └── style.scss
│   │   └── 📁css
│   ├── 📁src
│   │   ├── 📁data
│   │   ├── 📁views
│   │   │   ├── 📁components
│   │   │   │   ├── 📁header
│   │   │   │   │    └─ 📁search
│   │   │   │   │       ├── RecentSearchKeywords.js
│   │   │   │   │       ├── SearchBar.js
│   │   │   │   │       ├── SearchCategories.js
│   │   │   │   │       └── SearchCategoriesButton.js
│   │   │   │   └── header.js
│   │   │   └── render.js
│   │   └── main.js
│   └── index.html
└── server.js
```

- 큰 컴포넌트 (header) 안에 작은 컴포넌트들이 있고, 큰 컴포넌트에서 작은 컴포넌트들의 메서드나 DOM 요소를 주고 받게 해봤습니다.
- 그리고 큰 컴포넌트들을 render.js에서 조합하는 식으로 설계했습니다.

- scss 에 util 폴더는 모든 scss에서 사용되는 부분만 넣어두었습니다.
- header에서 사용되는 변수와 extend 등은 header.scss 로 넣어두었습니다.
