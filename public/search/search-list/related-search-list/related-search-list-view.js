import SearchListView from "../search-list-view.js";

export default class RelatedSearchListView extends SearchListView {
    constructor(searchList, listContainer) {
        super(searchList, listContainer);
    }

    getItemTemplate(itemName, input) {
        let itemText = itemName;
        const inputRegex = new RegExp(`${input}`);
        const matchWord = inputRegex.exec(itemName);

        if (matchWord) {
            itemText =
                itemName.slice(0, matchWord.index) +
                `<strong class="match-word">${input}</strong>` +
                itemName.slice(matchWord.index + input.length);
        }

        return itemText;
    }

    getSearchListItemTemplate(itemName, idx, input) {
        const itemText = this.getItemTemplate(itemName, input);

        return `<li 
                    class="search__list--item" 
                    data-idx="${idx}" 
                    data-name="${itemName}">
                        <p class="search__list--item-text">${itemText}</p>
                </li>`;
    }

    renderSearchList(input, searchItems) {
        const searchList = searchItems.reduce(
            (acc, itemName, idx) =>
                acc + this.getSearchListItemTemplate(itemName, idx, input),
            ""
        );
        this.listContainer.innerHTML = searchList;
    }
}
