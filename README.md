# fe-shopping

### 쿠팡 클론

#### 구현 checklist
- [ ] HTML 만들기
    - [x] top-bar
    - [x] header
    - [x] banner
    - [ ] 스마트 카테고리 하위 메뉴
- [x] Sass 사용하기
- [ ] js 동적 생성
    - [x] header rendering
    - [x] banner rendering
    - [ ] 스마트 카테고리 하위 메뉴
- [x] select 영역 클릭 시 하위 영역 hidden on-off
    - [x] transition 효과
- [x] search 영역 자동완성 기능
    - [x] 동일 문자 highlight
    - [x] 방향키 이동 시 해당 list 선택
    - [x] 선택된 글자 input 창에 반영
    - [x] mouseover 시 해당 list 선택
- [x] search 영역 최근검색 기능
    - [x] 검색어창 끄기켜기, 삭제, 전체삭제 
- [x] banner carousel
    - [x] mouseover debouncing
    - [x] 자동화면전환
- [ ] 스마트 카테고리 기능...
- [ ] M-V 구조..

#### 데모
https://bangdler.github.io/fe-shopping/

#### M-V 적용해보기 고민 중...
- 지금까지 구현하면서 의도한 구조?
    - 처음 설계 할 때 render, 이벤트 controller, model 을 각각 모듈로 나누고자 했다.
    - 하다보니 각 컴포넌트 (헤더, 배너) 별로 나누어야 파일이 커지지 않을 거라 생각했고, 헤더의 render, controller 를 구성했다.
    - model 은 담당 기능이 명확히 떠오르지 않아 제외하였다.
    - history list 관련 기능만 local storage 관련 class 를 controller 에서 관리한다.

- 수업을 듣고 난 후 내가 구현한 파일 구조를 다시 보게 됐다.
    - render 는 큰 요소(헤더, 배너)마다 모듈이 분리되어 있으나, 재사용은 힘들어 보인다.
    - controller 는 각 render 모듈에 따라 구성했는데, 수업 후에 보니 나는 controller가 모델의 기능도 가지고 있는 것 같다.
    - 각 render 가 controller 와 1대1 매칭이 되어 마치 MVP 같은.. V - (MP) 인데 재사용이 불가능한 구조? 

- model 이 중요한 것 같은데... 정확히 model 이 무엇인지 모르겠다.
    - 내 controller 생성자에 추가한 property state 는 이벤트가 겹치지 않게 하기 위해 만든 것들인데, 이런 걸 의미하는 건 아닌 것 같다.
        - 자동완성 완료 상태를 보는 prefixListState, keydown 발생 여부를 보는 keydownState, 최근검색어 온오프 상태를 보는 historyListState.
    - Search Controller 모듈에서 변화하는 data 라면 입력창의 값, 최근 검색어 list, prefixList 
    - 이 부분만 분리한다...?

#### 기능 구현과정

- 방향키 이동 시 선택된 text 로 Input 변경
    - 별 생각없이 innerText 를 사용했는데, 내부 text 를 덮어쓰는 경우 textContent 와 차이는 없어보인다.
    ```javascript
    changeInputValue(e, index) {
            const targetElement = this.prefixListElements[index]
            e.target.value = targetElement.innerText
        }
    ```

- history list 관리를 위한 local storage 구현
    - local storage 사용을 위한 storeManager 구현 (prototype 사용)
    - 예전 TodoList 때 써보고 안써서 잘 기억이 안나서 다시 찾아보면서 구현했다.
    - 중복값이 없어야 하므로 Set 으로 구현
    ```javascript
    export function StorageManager(key) {
        this.storageSet = new Set()
        this.key = key
    }
    ```    
    
    - local storage 는 데이터를 문자열로 저장하기 때문에 JSON.strigify 와 JSON.parse 를 사용해 값을 저장, 불러오기 해야함.
    - Set 은 JSON.stringify 를 사용해 문자열로 변환이 안되어 스프레드 연산을 통해 배열로 바꾸어야 했다.
    ```javascript
    getStorage: function() {
        const historyStorage = localStorage.getItem(this.key)
        this.storageSet = historyStorage === null ? new Set() : new Set(JSON.parse(historyStorage))
        return this.storageSet
    }
    
    setStorage: function() {
        localStorage.setItem(this.key, JSON.stringify([...this.storageSet]));
    }
    ```

- history list 이벤트
    - searchForm 태그에 `submit` 발생 시(엔터나 버튼 클릭) 화면 이동을 못하므로 초기 상태로 만들어준다.
    - 돋보기 버튼 클릭 시 submit 이벤트 => button type 은 default 가 submit 이었다.
    
    - 입력된 값은 local storage 에 추가한다.
    - 입력란을 클릭하거나 입력값이 없을 때 history list 를 보여준다.
    - local storage 의 데이터로 history list 를 보여준다. 
    - click, input 이벤트 발생 시를 각각 고려하다보니 헷갈리는 부분이 많았다.
    
    - 최근검색어 켜기 끄기 활용을 위해 history state 추가
    ```javascript
    toggleHistoryList(e) {
            if(e.target.className !== 'history-switch') return
            const $historySwitch = document.querySelector('.history-switch')
    
            if(this.historyState) {
                this.historyState = false
                $historySwitch.innerText = '최근검색어켜기'
                this.offHistoryList()
            }
            else {
                this.historyState = true
                $historySwitch.innerText = '최근검색어끄기'
                this.onHistoryList()
            }
    ```
    
- history 영역 활성화 시 삭제, 전체삭제, 검색어 끄기 버튼에 focusout 발생하지 않도록 로직 수정
    - 초기 related.target !== null 인 경우 focusout 미발생으로 구현했음.
    - select 창을 눌러도 focusout 이 안되어 특정 class 에만 발생하지 않도록 반영
    ```javascript
    searchFocusoutHandler(e) {
        const focusBtnClass = ['history-delete', 'history-switch', 'history-deleteAll']
        if(e.relatedTarget !== null && focusBtnClass.includes(e.relatedTarget.className)) return
    //...}
    ```
  
  => 문제 : 이 방식으로 하면 삭제 버튼으로 요소 삭제를 할 경우 active 요소가 사라진다. 그 이후에 focusout 이벤트가 발생하지 않는다.
  - 일차원적으로 억지로 삭제 후 입력란에 focus 를 줌.
    ```javascript
    deleteHistoryList(e) {
            if(e.target.className !== 'history-delete') return
            const historyElem = e.target.closest('li')
            const historyWord = historyElem.firstElementChild.innerText
            this.historyManager.deleteItem(historyWord)
            this.onHistoryList()
            // 삭제 버튼 클릭 시 포커스 대상이 사라져서 그런가? 어딜 눌러도 안포커스아웃이 되는 현상이 발생하여 억지로 포커스를 인풋에 줌.
            document.querySelector('.search-input').focus()
        }
    ```
    
  - 해결: history 영역에 마우스다운 이벤트를 걸고, preventDefault 를 줘서 이벤트 전파를 막는다.
    - click 에 preventDefault 걸면 focusout 이벤트가 발생한다. mousedown 발생한 순간 이미 focusout 발생한 듯.
  ```javascript
  historyListMousedownHandler(e) {
          e.preventDefault()
      }
  ```
    
- banner 화면 자동 전환
    - small image container 내의 list elements 를 property 로 두고 index 를 이용해 big image 도 바뀌도록 구현
    - big image 는 모두 hidden 상태에서 index 에 해당하는 tag 만 hidden 삭제하여 화면 노출
    ```javascript
    autoChangeBanner() {
            this.bannerIndex += 1
            if(this.bannerIndex === this.bannerMaxIndex) this.bannerIndex = 0
    
            const targetElement = this.smallImgElements[this.bannerIndex]
            this.toggleSmallImgBlueBorder(targetElement)
            this.toggleBigImg(this.bannerIndex)
        }
    ```
 
- debounce 사용 시 전역 this.timer 를 사용하지 않고 구현을 할 수 있을까?...
    - clearTimeout 을 여러 이벤트(mouseleave, mouseover) 에서 사용해야하므로 전역으로 구현했다.  
    - 이런식으로 해보고 싶었지만 timer 가 원시값으로 전달되어 포기.
    ```javascript
    searchPrefixList(word) {
            this.debounce(this.timer, this.prefixListDelayTime)
                .then(() => this.fetchPrefixList(word))
                .then((prefixList) => this.openPrefixList(prefixList, word))
        }
  
    debounce(timer, delayTime) {
            if(timer) {
                clearTimeout(timer)
            }
            return this.delay(timer, delayTime)
        }
    
    delay(timer, ms) {
        return new Promise((res) => {
            return timer = setTimeout(() => res(), ms);
        });
    }
    ```

