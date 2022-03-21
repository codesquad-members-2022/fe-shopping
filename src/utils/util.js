function handlelocalStorage() {
  return {
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
      return JSON.parse(localStorage.getItem(key));
    },
    reset() {
      localStorage.clear();
    },
  };
}

export const myLocalStorage = handlelocalStorage();

async function fetchData(url) {
  try {
    const data = await fetch(url);
    return data.json();
  } catch (err) {
    console.log(err);
  }
}

function MockData() {
  this.termDB = [];
  this.init();
}

MockData.prototype.init = async function () {
  const { result } = await fetchData('/mock/search.json');
  this.termDB = result;
};

MockData.prototype.requestTerms = function (text) {
  return this.termDB.map(({ keyword }) => keyword);
};

export const requestAutoCompleteTerms = new MockData();
