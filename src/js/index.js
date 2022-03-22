import { init } from "./App.js";
init();

class Model {
  _state;

  constructor(initialState) {
    this._state = initialState;
    this.apiURL = "http://localhost:3000/items";
  }

  setState() {
    const filteredData = this.getState();
    this._state = { ...this.getState() };
  }

  async getState() {
    let data = null;
    const fetched = await fetch("http://localhost:3000/fakeDB").then((res) => {
      data = res.formData();
    });
    return data;
  }
}

let a = new Model();
console.log(a.getState());
