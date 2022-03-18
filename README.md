# fe-shopping

# 1. 검색 카테고리 토글 구현

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
