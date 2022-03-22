export default class SmartMenuModel {
  async fetchSmartMenuData() {
    const res = await fetch('/menu/data');
    const data = await res.json();

    return data;
  }

  async divisionData() {
    const data = await this.fetchSmartMenuData();
    console.log(data);
    console.log(data.data[0].fashion[0].woman[0]);
    data.data.forEach((e) => console.log(e));
  }
}
