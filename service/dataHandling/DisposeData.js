const searchingData = require("../..//data/searchData.json");

// 단어를 통해서 데이터와 비교
function checkKeyWord(keyWord) {
  const trimedKeyWord = keyWord.trim();
  const checkSpace = trimedKeyWord.split(" ");
  const firstWordarray = checkSpace.map((word) => getFirstWord(word));
  const filterdData = filteringData(firstWordarray);
  return checkMatchWord(trimedKeyWord, filterdData);
}

// 첫번째 글자로 데이터보관중 -> 글자로 데이터 확인후 리턴
function getDataByFirstWord(firstWord) {
  return searchingData[firstWord];
}

// 단어의 첫글자 리턴
function getFirstWord(keyWord) {
  return keyWord.split("")[0];
}

// 입력에 띄어쓰기가 있을경우를 위해
function filteringData(firstWordarray) {
  return firstWordarray.reduce((filterd, firstWord) => {
    if (searchingData.hasOwnProperty(firstWord)) {
      filterd.push(getDataByFirstWord(firstWord));
    }
    return filterd.flat();
  }, []);
}

//검색어와 데이터가 동일한지 비교후 일치하는 단어들만 리턴
function checkMatchWord(keyWord, data) {
  const splitSpace = data.map((el) => el.split(" "));
  return splitSpace.reduce((check, splitedData) => {
    if (splitedData.includes(keyWord)) {
      check.push(splitedData.join(" "));
    }
    return check;
  }, []);
}

console.log(checkKeyWord(" 아식스"));

// module.exports = { data };
