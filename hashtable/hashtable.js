import fs from 'node:fs';
import path from 'node:path';
import {dirname} from 'node:path';
import {readFileSync} from 'fs';
import {fileURLToPath} from 'node:url';
import { Hash } from 'node:crypto';

const dirName = dirname(fileURLToPath(import.meta.url));

console.log(dirName); // 파일 위치 잠깐 확인.

const dirPath = path.join(dirName, '/', 'mini.json');
let dic = JSON.parse(fs.readFileSync(dirPath)); // 사전 json 파일.

// console.log(dic); // json파일 제대로 나오는지 확인.


// ---------- Dictionary data를 만들 prototype class -------------

function Dict(){
    this.list = [];
}
    
Dict.prototype.generateDic = function(key, arrayLen){
    let total = 0;
    for (let wordChar of key) {
        let wordValue = wordChar.charCodeAt(0) - 96;
        total = (total + wordValue) + arrayLen;
    }
    return total;
}

Dict.prototype.generateOrder = function(obj) {
    const wordKeyList = Object.keys(obj); // 사전에 수록된 단어(Object의 key 목록)만 나온다.
    const wordValueList = Object.values(obj);

    for (let i = 0; i < wordKeyList.length; i++) {
        const char = wordKeyList[i][0];
        const charCode = char.charCodeAt(0);
        const eachWord = {
            "code":`"${charCode}"`,
            "word":`"${wordKeyList[i]}"`,
            "description":`"${wordValueList[i]}"`
        }
        this.list.push(eachWord);

    }


}

let hashTest = new Hash();
hashTest.prototype.generateOrder(dic);
console.log(hashTest.list);


// ----------- 데이터 json파일로 변환하는 함수 ----------


function writeData(data) {
    fs.writeFile('mini1.json', JSON.stringify(data), function(err) {
            if (err) throw err;
            console.log('complete');
        }
    );
}

// let sampleChar = 'complete';
// console.log(sampleChar[4].charCodeAt(0));
// console.log(sampleChar[4]);

export {dic};
