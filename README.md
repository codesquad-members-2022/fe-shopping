# 학습 목표

- [x] ES Modules 이해
- [x] prototype 공부
- [ ] prototype 기반 객체 활용
- [ ] css preprocessor 중 sass 활용 (extension -> webpack)
- [x] 서버 역할 결정 (검색사이트니까 ssr?)
- [ ] 클라이언트 기능(검색창, 카테고리, 캐러샐..)마다 feature브랜치 만들어서 관리

# 구현 목표

> 어떤 문제를 만났는데 어떻게 해결했다. 일단 다쓰고 pr전에 정리해보자

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
   - 카테고리
     <span style="font-size: 22px">`...🏃‍♂️`</span>
   - 검색창
   - 캐러셀 기능 구현
3. 서버에서 홈화면 및 검색어에 따른 화면 렌더링 (innerHTML or pug)
4. webpack 및 nodejs에 es6 적용

# 고민목록

1. SSR?

검색 사이트는 SSR 방식을 많이 쓴다길래 이번 기회에 SSR에 대해서 공부해보았다.

react를 사용하면서 CRA와 api서버로 분리된 구조만 생각했었다. SSR라 하면 api서버에서 템플릿 렌더링도 진행하는 줄 알았다. 그래서 프론트에서 역할이 줄어든다고 생각했는데 왜 프론트에서 힐 일이 많아진다고 하지?라는 의문을 갖고 있었다. 이번에 naver.d2의 [어서 와, SSR은 처음이지? - 도입 편](https://d2.naver.com/helloworld/7804182)를 읽고 어느 정도 궁금증이 해소되었다.

이전까지 프론트도 하나의 서버라는 것을 잊고 있어서 헷갈렸던 것 같다. 프론트를 백에 종속적인 관계로 배포하는 것이 아니라 독립적으로 배포하는 경우를 생각해보자. react를 사용하는 경우 CRA를 한다고 서버가 없는 것이 절대 아니다. 빌드된 파일을 heroku든, s3든 서버에 올려야 접근가능하고, 다만 해당 서버는 정적 파일만 전달할 뿐이다. SSR은 얼핏보면 프론트를 백에 종속적인 관계로 배포하는 것으로 보인다. 하지만 api서버는 따로 있고, 프론트 탬플릿을 렌더링하는 서버(nodejs)는 정적파일을 올리는 서버에 함께 올린다.

2. 이미지 서버 vs 이미지 저장

지금은 이미지가 몇 개 없고 작아서 상관없지만 쿠팡처럼 이미지가 많거나 이미지가 적어도 크기가 큰 이미지를 다운받아야하는경우 이미지를 직접 db에 저장해서 쓰기보다 이미지서버를 활용하는게 좋다고 함.

> CDN에서 불러오는게 가장 효율이 좋다. 사용자와 가까운 데이터센터에 캐싱을 해주기 때문에 글로벌 서비스는 특히 더 좋다. 이미지를 직접 서버로 관리하시면 부하 문제도 고민을 해야하는데 S3를 사용하면 이런 고민이 없어짐. 직접 서버에서 관리한다하면 이미지 업로드/전처리 과정은 서버에 엄청난 부하를 줄 수 있음. Client에서 Server를 거치지 않고 Client에서 즉시 S3로 전송

❓ 쿠팡에서 사용한 이미지 서버 url을 복사해서 쓸려니까 403 (다른 도메인에서 호출)에러가 발생. 어쩔 수 없이 일단 images폴더를 이미지를 직접 저장 -> 이후 다시 이미지 서버 url 쓰니까 에러가 안남

- 생각해보면 이미지 서버도 어쨌든 하나의 서버인데 아무나 접근가능하게 하면 손해아닌가? cors걸어둬야 하는거 아닌가 싶다.

❓ size: memory cache vs byte

쿠팡 네트워크를 보면 memeory cache인데 내가 직접 이미지를 올리면 바이트. 이미지 서버로 올리면 cache가 memory cache던데,, 뭐지

- 직접 이미지 업로드
  <img width="722" alt="스크린샷 2022-03-14 오후 11 09 20" src="https://user-images.githubusercontent.com/71386219/158190905-43e7c480-c293-4a66-99e0-8ef97f4141f7.png">

- 쿠팡 이미지 서버 url
  <img width="727" alt="스크린샷 2022-03-14 오후 11 25 59" src="https://user-images.githubusercontent.com/71386219/158192650-8df90e04-a945-4951-90a6-2ea32eb7a25c.png">

3. 렌더링과 이벤트 등록 타이밍 -> innerHTML 이벤트 등록문제였음

렌더링은 되는데 이벤트가 등록이 안 돼서 돔에 렌더링 되기 전에 이벤트를 등록해서 안되는 건가 싶었음. 그래서 아래와 같이 `setEvent()`를 render 이후에 실행시키는 로직으로 바꿨는데도 에러가 해결이 안 됨.

```js
// Category.js
function Category(htmlTag, $parent) {
  HtmlElement.call(this, htmlTag, $parent);
  this.setTemplate();
  this.render();
}
// HtmlElement.js
function HtmlElement(htmlTag, $parent) {
  this.$parent = $parent;
  this.$element = document.createElement(htmlTag);
}

HtmlElement.prototype.setTemplate = function () {
  this.$element.innerHTML = ``;
};
HtmlElement.prototype.render = function () {
  this.$parent.innerHTML = this.$element.innerHTML;
  // this.$parent.appendChild(this.$element);
  this.setEvent();
};

HtmlElement.prototype.setEvent = function () {};

export default HtmlElement;
```

디버깅을 하다가 원인을 찾았는데, 렌더링과 이벤트 등록이 아니라 innerHTML에 이벤트 등록을 하고 있어서 에러가 발생한 것이었음. 아래 예시를 보면 2번처럼 하면 안 됨. 1번처럼해야함. 2번처럼하면 렌더링은 되는데 이벤트가 등록하지 않음.

이유는?

```js
const $root = findTargetIdElement(document, 'root');
const main = document.createElement('main');
main.innerHTML = `<div><div id="temp" style="width: 200px; height: 200px; background-color: tomato"></div></div>`;
// 1번
// $root.appendChild(main);
// 2번
$root.innerHTML = main.innerHTML;
main.addEventListener('click', hello);
```
