# MVC 패턴 구현하기

# 설계 과정

## 1. 역할 정의

### 1-1. mvc 패턴이란?

코드 유지보수를 쉽게 하기 위해 고안된 특정한 방법을 `디자인 패턴`이라고 하는데 그 중 model - view - controller 세 가지로 구성되어 있는 패턴을 MVC패턴이라고 한다.</br>
프로젝트에 따라, 어떻게 정의하는지에 따라 각자의 역할이 달라질 수 있다.

이번 미션에서 전통적인 mvc모델을 똑같이 프론트엔드에 적용시키는것은 효율이 떨어지고 미션의 취지에 부합하지 않다고 생각해서 내 나름대로의 역할을 정의해보았다.

**Model**

- 데이터 갱신 (`추가, 변경, 제거, 획득`) 즉, 상태(state)를 다룬다.

  - 여기서 말하는 `상태`란 *화면의 렌더링에 영향을 주는 변수*이다.
  - 상태의 변화가 있을 때 `controller`와 `View`에 통보해 후속 조치 명령을 받을 수 있게 한다.

</br>

- 서버로부터 받은 데이터를 가공하는 역할을 한다.

  - 데이터를 획득하는 로직(`Ajax, localStorage 등`) 이 포함될 수 있다. - 어떻게 정의하냐에 따라 `controller`에서 만들어서 줄 수도 있음.
    </br>

**View**

`View`에서 하는 일을 최소로 규정했다.

- 화면의 구성(렌더링)을 담당한다.
  - 컨트롤러에서 받은 데이터로 화면 렌더링에 필요한 것`(템플릿)`들을 리턴해준다.
    </br>

**Controller**

- `Controller`는 `Model` 과 `View`간 변경사항을 연결해준다.
  - 여기서 `변경사항`을 정의하는게 좀 까다로운데 우선은 사용자의 요청에 따라(입력, 클릭 등의 이벤트) 기능을 연결시키는 역할 정도로 해석했다.

![default](docs\MVC.png)
