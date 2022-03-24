import { SearchList } from "./search-list.js";

class RelatedSearchList extends SearchList {
    constructor(searchList, listContainer) {
        super(searchList, listContainer);
    }

    getItemText(itemName, input) {
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

    getSearchListItem(itemName, idx, input) {
        const itemText = this.getItemText(itemName, input);
        return `<li 
                    class="search__list--item" 
                    data-idx="${idx}" 
                    data-name="${itemName}">
                        <p class="search__list--item-text">${itemText}</p>
                </li>`;
    }

    renderSearchList(input = "") {
        const searchList = this.searchItems.reduce(
            (acc, itemName, idx) =>
                acc + this.getSearchListItem(itemName, idx, input),
            ""
        );
        this.listContainer.innerHTML = searchList;
        this.focusItem();
    }
}

export { RelatedSearchList };
