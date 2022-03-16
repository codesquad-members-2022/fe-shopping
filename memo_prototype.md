# MDN JavaScript Tutorial > Advanced > [Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)


## Inheritance and the prototype chain
---------------------------------
Java나 C++같이 class기반 언어를 다뤘던 개발자에게 JavaScript는 혼란스러울 수 있다.. When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its **prototype**.

.. an object is reached with **null** as its prototype. By definition, **null** has no prototype, and acts as the final link in this **prototype chain**.


## Using prototypes in JavaScript
---------------------------------
```javascript
function doSomething(){} // 일반 자바스크립트 함수
const doSomethingFromArrowFunction = () => {}; // 화살함수

// doSomething 함수 내에 무엇을 선언했던지 상관없이 doSomething 함수에는 기본적인 프로토타입 프로퍼티(?)(default prototype property)가 들어 있다. 모든 함수에는 default prototype property가 들어있다. 단, 화살함수(arrow function) 제외.
```

위의 함수를 console.log에 찍어보면..

```javascript
console.log(doSomething.prototype);
console.log(doSomethingFromArrowFunction.prototype); // undefined가 뜬다.

// After running doSomething.prototype.. the console should have displayed an object that looks similar to this.

{
  constructor: ƒ doSomething(),
  __proto__: {
    constructor: ƒ Object(),
    hasOwnProperty: ƒ hasOwnProperty(),
    isPrototypeOf: ƒ isPrototypeOf(),
    propertyIsEnumerable: ƒ propertyIsEnumerable(),
    toLocaleString: ƒ toLocaleString(),
    toString: ƒ toString(),
    valueOf: ƒ valueOf()
  }
}
```

## Different ways to create objects and the resulting prototype chain
아래 대부분은 자세히 안읽고 목자만 타이핑해뒀으므로 나중에 다시 흘ㅌ어봐야함.
- Objects created with syntax constructs
- With a constructor
- With Object.create
- delete Operator with Object.create and new operator
- With the class keyword
- Performance
- Summary of methods for extending the prototype chain
4가지 방식과 각각의 장단점이 서술되어 있다. 아래 리스트는 전부 inst object를 만드는 방법이다.

#1 New nitialization

```javascript
function foo() {}
foo.prototype.foo_prop = 'foo val';
function bar() {}
const proto = new foo();
proto.bar_prop = 'bar val';
bar.prototype = proto;
const inst = new bar();
console.log(inst.foo_prop);
console.log(inst.bar_prop);
```

장점
- 어떤 브라우저에서든 쓸 수 있다.(또는 모든 브라우저가 지원한다.)
단점
- 이 방법을 쓰기 위해서는 함수가 먼저 실행되어야 한다. the constructor may store unique information?? 특이한 정보 저장이 음??
- The initialization of the constructor may put unwanted methods onto the object.

Both of those are generally not problems in practice.


#2 Object.create

```javascript
// Technique 1
function foo() {}
foo.prototype.foo_prop = 'foo val';
function bar() {}
const proto = Object.create(foo.prototype);
proto.bar_prop = 'bar val';
bar.prototype = proto;
const inst = new bar();
console.log(inst.foo_prop);
console.log(inst.bar_prop);

// Technique 2
function foo() {}
foo.prototype.foo_prop = "foo val";
function bar() {}
const proto = Object.create(
  foo.prototype,
  { bar_prop: { value: 'bar val' } }
);
bar.prototype = proto;
const inst = new bar();
console.log(inst.foo_prop);
console.log(inst.bar_prop)
```

장점
- 모든 브라우저가 지원함./ The direct setting of __proto_._ in a way that is a single event, which permits the browser to further optimize the object./ Allows the creation of objects without a prototype, using Object.create(null)
단점
- IE8에서 사용불가 / The slow object initialization.. if using the second argument, because each object-descriptor property has its own seperate descriptor object.. 많은 수의 object descriptors in the form of objects, that lag time might become a serious issue. 두번째 인자(argument)를 사용할 경우.. object descriptors의 형태(obejct form) 때문에 처리하는데 시간이 엄청 많이 들 수 있다.


#3 Object.setPrototypeOf 
-------- 일단 여기까지 쳐둠...