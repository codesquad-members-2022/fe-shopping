export default class SearchModel {
  async fetchSearchData(state) {
    const res = await fetch(`/search/${state}`);
    const data = await res.json();

    return data.category;
  }
}
