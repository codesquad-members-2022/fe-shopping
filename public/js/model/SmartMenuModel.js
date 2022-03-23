export default class SmartMenuModel {
  async fetchSmartMenuData() {
    const res = await fetch('/menu/data');
    const data = await res.json();
    return data.data;
  }
}
