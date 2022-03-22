
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

#### 데모
https://bangdler.github.io/fe-shopping/


#### 구현과정

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
    - 입력란을 클릭하거나 입력란 입력값이 0 일 때 history list 를 보여준다.
    - 입력란에 아무것도 없을 경우 local storage 의 데이터로 history list 를 보여준다. 
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
 
- debounce 사용 시 전역 this.timer 를 사용하지 않고 구현을 할 수 있을까?
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