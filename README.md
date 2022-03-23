# fe-shopping

# [3/23] 검색창 자동완성 구현

- [x] json 데이터 서버에 요청 & 받아오기
- [x] 받아온 데이터 화면에 띄우기
- [x] 검색어와 일치한 글자 하이라이트
  - [ ] 맨 앞부터 일치하지 않는 경우 있으므로 수정해야 함
- [ ] 데이터에 없는 단어 입력 시 에러 발생
  - 예외처리 하기
- [x] input 이벤트에서 획마다 이벤트 발생하는 것 수정
- [ ] 500ms 이전에 데이터에 없는 단어 입력 시 무시(?)하게 수정
- [ ] 키보드 방향키 위/아래 이동 시 하나씩 이동하며 자동완성 글자가 선택되어 입력창에 보여짐

# [3/23] 최근 검색어 구현

- [x] 로컬 스토리지 사용
  - [ ] 전역 변수 안 쓰고 싶다 😩
- [x] 검색창에 focus를 주면 '최근 검색어'가 노출됨, 검색어를 입력하면 콘텐츠가 사라짐
  - [x] innerHTML 말고 `createElement`와 `appendChild` 써보기
- [x] hover 효과
- [ ] 최근 검색어 누르면 검색창에 텍스트 띄우고, 해당 검색어는 목록에서 삭제
- [ ] 전체 삭제
- [ ] 최근 검색어 끄기

# [3/25] MV, 클래스 분리

## keyup에서 keyCode === 13 시 이벤트가 두 번 발생하는 이슈

- 영어를 입력하고 엔터 키를 누르면 문제 발생 x (이벤트가 한 번만 발생)
  <img width="295" alt="스크린샷 2022-03-23 오후 2 21 58" src="https://user-images.githubusercontent.com/68533016/159629435-a9840573-3baa-45a6-b921-e38dbbce8bc1.png">

- 한국어를 입력하고 엔터 키를 누르면 이벤트가 두 번 발생하는 문제 발생
  <img width="361" alt="스크린샷 2022-03-23 오후 2 20 25" src="https://user-images.githubusercontent.com/68533016/159629335-b9b84684-c275-4327-9c3a-419943128d9f.png">

### 해결

- `keyup`을 `keypress`로 변경한다.
- 한글 특성 상 키 입력 순간부터 입력 완료까지 시간이 오래 걸린다 => `isComposing`이라는 이벤트 속성을 확인한다.
  https://kwangsunny.tistory.com/33

# [3/18] 검색 카테고리 토글 구현

![ezgif com-gif-maker (10)](https://user-images.githubusercontent.com/68533016/158928363-763f9626-9eb8-490e-a4b1-45a42f621203.gif)

## 🤯 카테고리를 onClick 된 li의 textContent 변경 시 innerHTML로 하나의 li 가 아닌 모든 li 텍스트로 들어가는 문제

<img width="299" alt="스크린샷 2022-03-18 오전 11 15 02" src="https://user-images.githubusercontent.com/68533016/158926082-7753ffaf-6692-42a5-a43d-03a90fb53195.png">

### 🥳 해결

<img width="456" alt="스크린샷 2022-03-18 오전 11 20 50" src="https://user-images.githubusercontent.com/68533016/158925259-55692808-078d-4295-baa8-2c08117cdc42.png">

클릭된 `target` 이 달랐다!

`2`는 `1`에 포함되기 때문에,

- `1` 범위를 클릭 시
  - `target`은 `<div class="select-category">...</div>`를 포함한 자식 태그까지 포함된다.
  - 따라서 textContent 모든 li 들이 포함된다.
  - <img width="613" alt="스크린샷 2022-03-18 오전 11 25 52" src="https://user-images.githubusercontent.com/68533016/158925736-f9cb6969-917c-486c-8b16-fff6e8dafd24.png">
- `2` 범위 클릭 시
  - `target`은 오직 클릭된 하나의 `<a href="#221934" rel="221934"> 출산/유아동 </a>` 태그이다.
  - 따라서 textContent는 클릭된 하나만이 포함된다. (출산/유아동)
  - <img width="631" alt="스크린샷 2022-03-18 오전 11 26 05" src="https://user-images.githubusercontent.com/68533016/158925920-44739768-0955-4977-a15e-7fddae018093.png">

`1` 범위 선택 시 innerHTML 이 실행되는 것을 막아야 한다.

`Element.closest()` 메소드를 사용해 `1` 클릭 시 `return` 처리한다.

```javascript
// 타겟의 조상에 '.select-category-option' 클래스가 없는 경우 (== 1번 구역 클릭 시 ) innerHTML을 수행하지 않고 리턴 처리
if (!target.closest('.select-category-option')) return;
selectCategoryContent.innerHTML = target.textContent;
```
