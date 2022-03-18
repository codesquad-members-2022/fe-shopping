
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
    - [ ] banner rendering
- [x] 전체 카테고리 클릭 시 하위 영역 hidden on-off
    - [x] transition 효과
- [x] search 영역 자동완성 기능
    - [x] 동일 문자 highlight
    - [x] 방향키 이동 시 해당 list 선택
    - [ ] 선택된 글자 input 창에 반영
    - [x] mouseover 시 해당 list 선택
- [ ] search 영역 최근검색 기능
- [ ] banner carousel

#### 어려웠던 점
- 구조화가 아직 어려워서 일단 기능 구현 중심으로 진행하였습니다.
- searchController 로 탐색창 내의 이벤트를 모두 구현하고 있는데, 이벤트가 많고 한 영역에 여러 이벤트가 걸리다보니 함수가 많아지고 분리가 어려워지고 있습니다.
- 자동완성과 방향키이동, 마우스오버 등 이벤트들이 서로 영향을 주는 상태가 되어 오류 디버깅이 어려웠습니다.


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
    - 앞의 공백도 글자수로 인식되어 trim 으로 앞 뒤 공백 제거.
    
- input 후 방향키로 하위 list 선택
    - keydown 을 사용하여 이벤트 추가
    - 방향키 이동을 위해 2가지 생성자 추가
        - 동일한 글자를 가진 노드 리스트를 fetch 시마다 배열로 바꾸어 prefixListElements 로 지정
        - 
        ```javascript
        this.prefixListElements = null
        this.prefixListIndex = null
        ```
    
    - ArrowDown 과 ArrowUp 시 index 를 바꿔주면서 prefixListElements[index] 의 class 를 바꿔준다.
    
    - 처음 검색 후 아래 방향키를 누르면 keydown 이벤트가 두번 실행되는 문제가 발생...
        - 정확한 원인은 찾지 못했으나 하위 영역이 fetch 후 렌더링되기 전에 keydown 이 실행되면 prefixLisElements 가 미반영된 상태이므로 이 부분에서 로직이 꼬인 것 같다.
        
    - 해결을 위해 keydown 이벤트는 fetch 로 하위 영역이 rendering 된 이후에만 실행할 수 있도록 prefixListState 를 추가했다.
       ```javascript
        searchKeydownHandler(e) {
                if(!this.prefixListState) return;
                if(e.key === 'ArrowDown') {
                    this.downPrefixList()
                }
                else if(e.key === 'ArrowUp') {
                    this.upPrefixList()
                }
                else {
                    this.prefixListIndex = null
                }
            }
       ```

- input 시 하위 영역 mouseover 
    - mouseover 는 이벤트 버블링이 적용되므로 ul tag 에 이벤트를 걸었다.
    - e.target 이 list tag 일 경우에 실행.
    - keydown 의 index 와 맞춰주기 위해 list 에 data-index 를 추가했다.
    ```javascript
    searchListMouseoverHandler(e) {
            if(e.target.tagName === 'LI') {
                this.prefixListIndex = Number(e.target.dataset.index)
                this.removeKeyOn()
                this.addKeyOn(this.prefixListIndex)
            }
        }
    ```