function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms * 1000));
}

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

export async function fetchData(url) {
  try {
    const data = await fetch(url);
    return data.json();
  } catch (err) {
    console.log(err);
  }
}

function MockSearchData() {
  this.termDB = [];
  this.init();
}

MockSearchData.prototype.init = async function () {
  const { result } = await fetchData('/mock/search.json');
  this.termDB = result;
};

MockSearchData.prototype.requestTerms = async function (text) {
  await delay(0.5);
  return this.termDB
    .map(({ keyword }) => keyword)
    .filter((term) => term.slice(0, text.length) === text);
};

export const requestAutoCompleteTerms = new MockSearchData();
