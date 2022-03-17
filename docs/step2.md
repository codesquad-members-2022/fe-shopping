
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

#### 구현 과정
- select category click 이벤트 시 하위 영역이 노출되도록 구현하는 중 문제 발생
    - select-btn 에만 click, focusout 이벤트를 걸어, 형제요소인 라벨에 이벤트가 발생해도 버튼에도 동일한 이벤트 발생하는 점을 이용하려고 했다.
    - 라벨 부분 클릭 시 한번 클릭에도 여러번 클릭이 발생한 것처럼 하위 영역이 unhidden 됨.
    - label 문제인 것으로 판단되어 label 제거
    ```html
    // 변경 전
    <div class="header__form__select">
        <label for="select-btn">전체</label>                
        <button type="button" id="select-btn" class="btn-down"></button>   
    </div>
    
    // 변경 후 
    <div class="header__form__select">                  
        <button type="button" id="select-btn" class="btn-down"><span>전체</span></button>   
    </div>
    ```
  
- select btn click 이벤트 시 하위 영역이 transition 되면서 노출
    - max-height 0 과 800px 사이를 class 추가를 통해 구현하려고 했으나 잘 되지 않았다.
    - 찾아보니 display: none; 은 DOM Tree 에서 생략되어 transition 이 적용되지 않는다고 한다.
    - visibility: hidden 과 visible 을 이용하여 구현.
    - transition 시 max-height 가 아닌 all 로 해야 다시 hidden 되는 과정에서도 transition 이 적용된다.
    ```css
    .header__select__list {
      max-height: 0;
      transition: all 1s ease-in-out;
    }
 
    .header__select--slide-down {
      max-height: 800px;
      visibility: visible;
    }
    ```
   