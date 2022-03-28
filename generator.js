const msg = {
  "ok" : {
      msg: "hello our members!"
  },
  "fail" : {
      msg: "who are you?"
  }
}


const ourStudents = ['crong', 'honux', 'jk', 'yellow'];
const ourProfessors = ['Torvalds', 'Wozniak', 'Gates', 'Ritchie'];


//Checker 안에는 오류가 좀 있어요
const Checker = class {
  constructor(msg) {
      const msg = msg;
  }
  bindMembers(names) {
      function (ourStudents) {
          return new Promise( () => {
              setTimeout( function _() {
                  const bMember = this.includeMembers(names, ourStudents);
                  if (bMember) {
                      return this.msg["ok"];
                  }
              }, 1000);
          })
      }
  }

  //includeMembers 함수 완성하기. 
  //모든 멤버가 맞는지 체크 (배열의 every 메서드 활용)
  includeMembers(names, ourStudents) {
      
  }
}

//runner 함수 완성하기.
//generator 실행과 함께 next메서드를 활용해야 함
const runner = function (generator, names, ourStudents) {

}




const checker = new Checker(msg);

function* run(source, targets) {
      const rightMsg = msg.ok.msg;
      const checkMember = checker.bindMembers(targets);
      result = yield checkMember(source);
      result.then((result)=>{
          console.log("error없이 프로그래밍이 실행됐습니다 ", result.msg);
      }).catch((e)=>console.log(`이크 에러가 발생했어요. ${e.msg}`));
}


runner(run, ourStudents, ['crong', 'jk']);
runner(run, ourProfessors, ['Bill', 'Ritchie']);