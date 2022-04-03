import { async } from "regenerator-runtime";

class ListModel {
  constructor(data) {
    this.data = data;
  }

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  getListFormFromData = (data) => {
    return data.reduce((pre, post) => pre + `<li>${post}</li>`, "");
  };

  findData = async (address, value = "") => {
    const dataAddress = `data/${address}`;
    const data = await fetch(dataAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    });
    const resultData = await data.json();
    const listData = this.getListFormFromData(resultData);
    this.setData(listData);
  };

  deleteData = async (address) => {
    const dataAddress = `data/${address}/delete`;
    const data = await fetch(dataAddress, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    });
  };
}

export default ListModel;
