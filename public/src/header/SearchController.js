export default class SearchController {
    constructor($parent, resultList) {
        this.$parent = $parent;
        this.$target = null;
        this.resultList = resultList;
    }

    render() {
        this.$parent.innerHTML += this.createHTML();
    }

    createHTML() {
        return /* html */ `
        <div class="search__form">
            <form class="search__form--main">
                <input type="text" class="search__form--input" placeholder="찾고 싶은 상품을 검색해보세요!">
                <input type="image" class="search__form--submit" src="resources/image/ic_search.png" alt="검색 아이콘">
            </form>
            ${this.resultList.createHTML()}
        </div>
        `
    }
}