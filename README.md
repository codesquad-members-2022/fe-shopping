# fe-shopping

## 학습목표

- scss variables, nesting, extend등 사용해보기
- prototype을 활용하여 모듈 만들기

## 설계

[html, 검색창 렌더링 설계](https://www.notion.so/9a31569c599b4e64a0af59741b84dce7)

[자동완성 검색창 데이터 관리 설계](https://www.notion.so/65fcffa0b011499eba9874a0a35681c5)

## 요구사항

- [x] header 레이아웃
- [x] header 기본 css
- [ ] caraousel구현
  - [x] 일정한 시간마다 슬라이드 넘김
  - [x] 배너광고 메뉴표 mouseover시 슬라이드 넘김
  - [ ] prototype으로 클래스를 만들어 리팩토링
- [ ] 검색창
  - [ ] 검색창 데이터 처리
  - [ ] 검색창 렌더
    - [x] 검색창 카테고리 선택부분 표시 toggle
    - [x] 검색창의 최근검색창 표시 toggle (전체 삭제, 최근 검색어 끄기 버튼 외에서 발생)
- [ ] 서버api 구현

## 우선순위

- 검색창 렌더 구현
- 검색창 렌더 prototype모듈로 만들기
- 검색창 디바운스
- carousel prototype모듈로 만들기
- carousel 쓰로틀

## 진행상황

수요일

https://user-images.githubusercontent.com/58525009/158527442-cd39030b-6990-43c6-98aa-6ad9e96976fc.mp4

## 고민한점

### sprite img

sprite이미지를 처음에는 sprite이미지 위에 div가림막을 놓아서 div에 맞게 sprite이미지를 움직여서 구현하였습니다. (아래코드)
필요한 아이콘마다 이렇게 동일한 sprite이미지를 놓는것이 맞게 구현하는지 의문점이 들었습니다.

```jsx
  <div class="cart">
    <img
      class="cart__img"
      src="./img/icons.png"
      alt="category icon"
  />
```

```jsx
.cart {
  width: 40px;
  height: 40px;
  overflow: hidden;
}

.cart__img {
  margin-left: -112px;
}
```

J에게 관련하여 질문을해서 background속성을 이용할 수 있음을 알고 적용해보았습니다.

sprite 이미지는 아이콘이 여러개인 경우 여러 이미지를 서버로 부터 받을 수 있는 이점이 있습니다. 서버로부터 한번에 여러 이미지를 받는다고 하여도 서버에서 여러 이미지로 저장하는것보다 하나의 sprite이미지로 저장하는게 서버 공간을 줄일 수 있습니다. 아이콘은 img가 제대로 불러와지지 않아도 글자만으로 파악가능하고 시각 장애인도 이를 글자로 듣는것으로 파악할 수 있기 때문에 따로 alt를 설정하지 않는것도 문제가 없습니다.

### mixin vs extend

연관성이 없는것은 extend를 사용하지 않는 편이 나을것 같아서 mixin으로 수정하였습니다.

## 궁금한점

html구조나 중복된 UI조각은 미리 설계시 파악할 수 있는데 css는 실력이 아직 부족해서인지 설계보다도 직접 구현하면서 고쳐나가고 중복이 발생하였을때 중복을 제거하는식으로 밖에 못하고 있습니다. css를 미리 중복되는것을 생각해두거나 설계해둘 수 있을까요?

> 공통적인 layout은 css클래스를 미리 만들어 둘 수 있지만 color, background color, 고정크기 등은 디자인 가이드가 나온다면 미리 설정할 수 있습니다.
