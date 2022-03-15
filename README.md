# fe-shopping

## 1주차 - 1

### Core Component 생성

### autoComplete 데이터 생성

### Header 만들기

    - 검색창

### 검색창 API 요청

    - input 이벤트가 없다고 판단했을 때 요청보내기
    - 없다고 판단하는 것을 어떻게 해야할지?
        - keyup 이벤트 후 delay(3000) 을 주기
        - 만약 다시 keyup 이벤트가 생기면 delay 초기화하기
            - 어떻게 초기화?
            - setState 함수를 통해서 해당 컴포넌트를 re-rendering

### keyup Event

- keyup 이벤트 시
  - input 에 focus 하기
  - input 에 있는 value 유지하기
- 생긴 문제점
  - setState 를 통해 re-rendering 하면 타자 텀이 길게되면 글자가 끊김
    - ex) ㅇㅏㅇㅣ
- 해결해보려고 시도한것
  - setState 메서드 대신 this.state 에 직접 넣기
  - 현재 value 를 저장한 변수를 사용해서 3초 후 비교하기

```js
SearchInput.prototype.setEvent = function () {
  this.addEvent("keyup", "input", ({ target }) => {
    // this.setState({ inputLoading: true });
    this.state.inputData = target.value;
    const curValue = target.value;
    delay(3000).then(() => {
      if (this.state.inputData === curValue) {
        console.log(this.state.inputData, target.value);
        console.log("hi");
      } else {
        console.log("bye");
      }
    });
  });
};
```

### SearchInput Re-render

- Re-render 를 하면서 input 에 focus 를 다시 주는 과정이있음
- 그 과정에서 data 를 받아오고 다시 focus 를 하게되면 input 이 자연스럽지 못하게 됨
- input 을 별도의 컴포넌트로 분리하는게 좋을듯..
