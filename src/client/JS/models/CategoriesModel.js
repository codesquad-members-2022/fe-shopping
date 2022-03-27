class CategoriesModel {
  constructor() {
    this.data = null;
    this.categoryFirst = null;
    this.categorySecond = null;
    this.secondList = null;
    this.thirdList = null;
  }

  setData = (data) => {
    this.data = data;
  };

  getData = () => {
    return this.data;
  };

  enrollCategoryByOrder = (categoryOrder, innerText) => {
    switch (categoryOrder) {
      case "first":
        this.categoryFirst = this.data.find(
          ({ keyword }) => keyword === innerText
        );
        this.categorySecond = null;
        break;
      case "second":
        this.categorySecond = this.categoryFirst.child.find(
          ({ keyword }) => keyword === innerText
        );
        break;
    }
  };

  enrollList = () => {
    this.secondList = this.categoryFirst.child.map(({ keyword }) => keyword);
    if (!this.categorySecond) return (this.thirdList = null);
    this.thirdList = this.categorySecond.child
      ? this.categorySecond.child.map(({ keyword }) => keyword)
      : null;
  };

  getInnerListData = () => {
    return this.categorySecond ? this.thirdList : this.secondList;
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
    this.setData(resultData);
  };
}

export default CategoriesModel;
