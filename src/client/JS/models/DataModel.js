class DataModel {
  constructor(data) {
    this.data = data;
  }

  setData(data) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

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
    this.setData(resultData);
  };
}

export default DataModel;
