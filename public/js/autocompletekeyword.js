import { searchList, searchInput } from "./util/querySelector.js";

export class Autocompletekeyword {
  constructor() {
    this.bounce = null;
    this.getDebounce();
  }

  getAmazonAPI(data) {
    fetch(
      `https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${data}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`
    )
      .then((response) => response.json())
      .then((data) => this.compareKeyword(data));
  }

  compareKeyword(data) {
    const fatchedData = data.suggestions.map((v) => v.value);
    searchList.innerHTML = this.makeAutoSearchList(fatchedData);
  }

  makeAutoSearchList(data) {
    return data.reduce((acc, cur) => acc + `<div>${cur}</div>`, "");
  }

  getDebounce() {
    let _this = this;
    searchInput.addEventListener("input", function (event) {
      const key = event.target.value;
      if (this.bounce) clearTimeout(this.bounce);
      this.bounce = setTimeout(function () {
        _this.getAmazonAPI(key);
      }, 500);
    });
  }
}
