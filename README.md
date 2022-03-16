# fe-shopping

## 구현한 것

-[x] component를 상속해 반복되는 로직 만들어보기.

-[x] 카테고리 mouse 이벤트 만들기

-[x] 가능한 작은 기능으로 module 분리하기

## 구현할 것

-[ ] Express로 현재 js파일로 가져오는 data 서버에서 받아와 렌더링하기.

-[ ] 검색창 기능

-[ ] ES class를 이용해 instance를 2개 이상 만들어내는 class 만들기

## 학습일지

## SCSS

### Partial
---
확장 기능등을 이용해 scss파일을 자동 컴파일 하고 있을 경우, 파일의 이름을 **underscore(_)**로 시작하면 css파일로 따로 컴파일 하지 않는다!  

**import**만 되는 파일의 경우 따로 컴파일할 필요가 없으니 이 기능을 하용하면 된다.


### 주요 기능
---
1. 상속(extend)

특정 선택자를 상속하고 싶을 때, `@extend` 지시자를 통해 할 수 있다.

SCSS


```scss
.header{
    padding:20px;
    border:1px solid #333;
}

.main {
    @extend .header;
    background-color:#eee;
}
```

CSS로 컴파일한 결과
```css

.box, .news-box { padding: 20px; border: 1px solid #333; }
.news-box { background-color: #eee; }
```
---
2. placeholder selectors

변수에 값을 할당하듯 사용할 수 있다. 아래 예시처럼 `%box`에 스타일을 주고 `@extend`를 통해 상속할 수 있다.  
단독으로 쓰인 %box는 css로 컴파일 되지 않는다!  

SCSS
```scss
%box{
	padding:20px;
	border:1px solid #333;
}
 
.news-box{
	@extend %box;
	background-color:#eee;
}
 
.list-box{
	@extend %box;
	background-color:#000;	
}
```
CSS로 컴파일 한 결과
```css
.news-box, .list-box { padding: 20px; border: 1px solid #333; }
.news-box { background-color: #eee; }
.list-box { background-color: #000; }
```

3. 믹스인(mixin)

인자를 받는 함수처럼 사용할 수 있다.  

선언
```scss
@mixin mixinName($margin, $color) { // $color:blue; 처럼 작성시 default값을 줄 수 있다.
    margin: $margin; // p {margin:$margin} 처럼 작성할 수도 있다.
    color: $color;
}
```
호출
```scss
p {
    @include mixin-name(20px 0, blue) // 작성한 내용이 그대로 출력된다!
}
```
---
### 작성 컨벤션

[참조 사이트](https://webclub.tistory.com/518) : https://webclub.tistory.com/518

보기 좋은 코드를 작성하기 위해 찾아보았다.  
들여쓰기 규칙이나 최대 중첩 횟수, extend/include의 위치 등 여러가지를 알 수 있었다.  
적극적으로 참조해서 코드를 작성해보자.

