
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

- input 시 자동완성 기능
    - 조원이 알려준 방식을 사용해서 아마존 데이터를 fetch. 별도의 json 을 만들지 않아도 돼서 다행이다.
    - timer 500ms 를 주기 위해, debouncing 을 사용했다.
    ```javascript
    fetchPrefixLists(word) {
            if(this.timer) {
                clearTimeout(this.timer)
            }
            return this.delay(500)
                .then(() => fetch(
                        `https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${word}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`
                    ))
                .then((res) => res.json())
                .then((data) => data.suggestions.map((v) => v.value))
    }
    
    delay(ms) {
            return new Promise((res) => {
                return this.timer = setTimeout(() => res(), ms);
            });
        }
    ```    

- input 시 하위 영역의 동일한 글자에 하이라이트
    - 별다른 방법이 떠오르지 않아 입력값의 길이만큼 검색한 단어를 잘라 해당 부분에 strong tag 를 넣어주었다.
    

     