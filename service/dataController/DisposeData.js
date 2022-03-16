const searchingData = require("../../data/searchData.json");

// 단어를 통해서 데이터와 비교
function findMatchData(keyWord) {
  const firstWordArray = getFirstWordArr(keyWord);
  const filterdData = filteringData(firstWordArray);
  return checkMatchWord(keyWord.trim(), filterdData);
}

function getFirstWordArr(keyWord) {
  const trimed = keyWord.trim().split(" ");
  return trimed.map((word) => getFirstWord(word));
}

function getFirstWord(keyWord) {
  return keyWord.split("")[0];
}

// 첫번째 글자로 데이터보관중 -> 글자로 데이터 확인후 리턴
function getDataByFirstWord(firstWord) {
  return searchingData[firstWord];
}

// 입력에 띄어쓰기가 있을경우를 위해
function filteringData(firstWordArray) {
  return firstWordArray.reduce((filterd, firstWord) => {
    if (searchingData.hasOwnProperty(firstWord)) {
      filterd.push(getDataByFirstWord(firstWord));
    }
    return filterd.flat();
  }, []);
}

//검색어와 데이터가 동일한지 비교후 일치하는 단어들만 리턴
function checkMatchWord(keyWord, data) {
  const splitSpace = data.map((el) => el.split(" "));
  return splitSpace.reduce((matchedData, splitedData) => {
    if (splitedData.includes(keyWord)) {
      matchedData.push(splitedData.join(" "));
    }
    return matchedData;
  }, []);
}

module.exports = { findMatchData };
