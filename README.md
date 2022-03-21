# 학습 목표

- [x] ES Modules 이해
- [x] prototype 공부
- [ ] prototype 기반 객체 활용
- [ ] css preprocessor 중 sass 활용 (extension -> webpack)
- [x] 서버 역할 결정 (검색사이트니까 ssr?)
- [ ] 클라이언트 기능(검색창, 카테고리, 캐러샐..)마다 feature브랜치 만들어서 관리

# 목표

> 어떤 문제를 만났는데 어떻게 해결했다. 일단 다쓰고 pr전에 정리해보자

- [ ] 클라이언트에서 탬플릿을 랜더링하고 이벤트를 등록하는 과정 구현해보기
- [ ] 검색창 개발
  - 카테고리부분과 검색창 부분 나누기
  - 검색창 글자 입력할 때마다 일정 딜레이 이후 내가 검색했던 검색어 또는 추천단어 띄우기
  - 검색화면에 따른 결과 보여주기? 는 어려울 듯
- [ ] 카테고리
  - hover 바로바로 뜨는 ui변경 -> click? 혹은 몇초 이상 머물 때
- [ ] 캐러셀
  - 새로 만들고 (재사용가능하게) 이전에 만들었던 캐러셀이랑 비교해보기
  - 스으윽 미끄러지는 애니매이션 추가
- [ ] 서버환경과 배포
  - 배포 방식 차이 복습
  - ssr을 어떻게 함?
- [ ] 웹팩 및 nodejs에서 es6
  - 정말 시간이 남으면 건들여 보기

# 진행순서

1. html 뼈대 만들기 및 레이아웃 scss적용
2. 클라이언트 사이드 작업(es6 module, prototype, scss)
   - 검색창
     <span style="font-size: 22px">`...진행중🏃‍♂️`</span>
   - 카테고리
     - 이벤트 고급 제어
   - 캐러셀 기능 구현
3. 서버에서 홈화면 및 검색어에 따른 화면 렌더링 (innerHTML or pug)
   - mvc패턴?
4. webpack 및 nodejs에 es6 적용

# 고민목록

🤔 어려웠던 부분들

1. [개발자 황준일 - Vanilla Javascript로 웹 컴포넌트 만들기](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Component/): 해당 블로그와 리액트 흐름을 너무 따라하지 않았나 싶다.

어떻게 하면 클라이언트에서 렌더링을 관리하게 할 수 있을까 고민하다 해당 블로그 글을 보게되었다. js컴포넌트 흐름과 상속구조가 이해하기 쉽게 정리되어 있어 참고만 해야겠다는 생각으로 포스트를 읽었다. 코드를 완전히 복사하고 붙혀 넣을 생각 없이 '이런 아이디어도 있구나'하고 참고만 할 생각이었다.

하지만 걱정한 대로 `해당 포스트를 읽은 내용`과 내가 알고 있던 spa흐름(`리액트 라이프 사이클`)이 머리 속에 각인되어 나만의 아이디어를 생각하지 못하게 되었다. 블로그 포스트를 계속 참고하면서 하지 않았지만 코드를 짜고 보니 흐름이 비슷해서 뜨끔했다. 나도 모르게 블로그를 따라하지 않았나 싶다. 좀 더 고민하고 나만의 아이디어를 짜는 시간을 길게 가져야겠다.

2. Html Component구성 (cra, prototype)

탬플릿을 만들고 렌더링해야겠다는 흐름은 이해했지만 부모요소에 자식요소를 어떻게 끼워 넣어야하는지 감이 잡히지 않았다. 부모요소와 자식요소 간의 관계가 중요한 이유는 특정 상태가 변했을 때 특정 상태를 렌더링하는 요소만 리렌더링해야하기 때문이다. 부모요소에 자식1, 자식2가 있고 자식2에서 쓰는 상태가 변했을 때, 자식1까지 다시 렌더링하지 않게 하고 싶었다.

컴포넌트가 작동하기 위해 2단계(템플릿 작성 -> 렌더링)로 생각했다. 이렇게 하다보니 각 단계에서 해야하는 역할이 커졌다. 그래서 다음과 같이 세분화했다.

- `init()`: 부모요소로부터 받은 값을 자신의 상태로 만들기
- `setTemplate() -> render() -> renderChild()`: 자신의 템플릿만들기 -> 가장 큰 변화가 있던 부분,
  - insertAdjacentHTML vs innerHTML: insertAdjacentHTML이 돔을 삽입할 때 성능이 더 좋지만 innerHTML으로 템플릿을 짜는게 가독성이 훨씬 좋아 innerHTML으로 템플릿을 만들었다.
  - 자식요소에서 부모를 인자로 받아 부모에 본인을 삽입했는데, 부모에서 자식을 삽입하는 방법으로 바꿔 구조 파악이 더 쉬워졌다.

### `이전`

```js
export default HtmlElement(htmlTag, $parent){
  this.$element = document.createElement(htmlTag);
}
HtmlElement.prototype.setTemplate = function (){
  $element.classList.add = ".temp"
  $element.id = "#temp"
  $element.innerHtml = ``
}
HtmlElement.prototype.render = function(){
  $parent && $parent.appendchild($element);
}
// 상속예시
//Section.js
Section.prototype.setTemplate = function () {
const logoArea = document.createElement('div');
logoArea.classList.add('logo-area');
logoArea.insertAdjacentHTML('beforeend', imgTemplate);
new SearchBox('div', logoArea);
logoArea.insertAdjacentHTML('beforeend', userInfoTemplate);
this.$element.appendChild(logoArea);
new Navigation('nav', this.$element);
};
```

### `이후`

```js
export default function HtmlElement($element, args) {
  this.$element = $element;
  this.args = args;
  this.state;
  this.init();
  this.render();
  this.setEvent();
}
HtmlElement.prototype.setTemplate = function () {
  return ``;
};
HtmlElement.prototype.renderChild = function () {};
HtmlElement.prototype.render = function () {
  this.$element.innerHTML = this.setTemplate();
  this.renderChild();
};
//Section.js
Section.prototype.setTemplate = function () {
  return `
  <div class="logo-area">
    <div class="search"></div>
  </div>
  <div class="gnb"></div>
`;
};
Section.prototype.renderChild = function () {
  const $gnb = findTargetClassElement(this.$element, 'gnb');
  const $searchBox = findTargetClassElement(this.$element, 'search');
  new SearchBox($searchBox);
  new Navigation($gnb);
};
```

- `setEvent()`: 런데링이후 이벤트 등록.
- `setState()`: 상태가 바뀌면 해당 상태를 쓰는 컴포넌트만 render()호출
