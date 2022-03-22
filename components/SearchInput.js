
import {store} from "../Core/Store.js";
import {Autocomplete} from "./Autocomplete.js";
import View from "../Core/View";

export class SearchInput extends View {
    static #storageKey = Symbol.for('RECENT').toString()
    initState() {
        return {currentInput:"", recentItems:JSON.parse(localStorage.getItem(SearchInput.#storageKey)) || []}
    }
    template() {
        const {currentInput, recentItems} = store.state;
        return `<form id="searchForm">
            <fieldset>
                <legend>상품검색</legend>
                <div class="searchForm">
                    <div class="select-category">
                        <a class="select-category__button"></a>
                        <a class="select-category__current">전체</a>
                    </div>
                    <select id="searchCategories">
                    </select>
                    <label htmlFor="searchKeyword"><input id="searchKeyword" placeholder="찾고 싶은 상품을 검색해보세요!" autocomplete="off"/></label>
                    <a class="speech-mic"></a>
                </div>
                <a id="searchBtn"></a>
            </fieldset>
        </form>
        <div id="popupWords">
            <div id="autoComplete">
               ${currentInput? new Autocomplete().autocomplete(currentInput).reduce((acc, cur) => {
                const [front, back] = cur.split(currentInput.trim());
                acc += `<a class="auto">${front}<strong>${currentInput}</strong>${back}</a>`
                return acc;
            }, ""):
            `<h3>
                <span>최근 검색어</span>
            </h3>
        <ol>
        ${recentItems
        .map((item,idx) => `<li data-idx=${idx}><a>${item}</a><span class="delete">삭제</span></li>`)
        .join('')}
        </ol>`}
            </div>
        </div>
        <div class="historyBtns">
            <span class="deleteAll"></span>
            <span class="historyonOff"></span>
        </div>`;
    }

    setEvent() {
        const {recentItems, currentInput} = store.state;
        this.addEvent('blur', '#searchKeyword', e => {
            this.select('#popupWords').style.display = 'none';
        }, true)
        this.addEvent('focus', '#searchKeyword', (e) => {
            this.select('#popupWords').style.display = 'block';
        }, true)
        this.addEvent('keydown', '#searchKeyword', async e => {
        })
        this.addEvent('keyup', '#searchKeyword', e => {
            this.throttle(()=>this.setState({currentInput:e.target.value}), 500);
        })
        this.addEvent('submit', '#searchForm', e => {
            e.preventDefault();
            recentItems.unshift(currentInput);
            localStorage.setItem(SearchInput.#storageKey, JSON.stringify(recentItems));
        });
        this.addEvent('click', '.delete', e=>{
            recentItems.splice(parseInt(e.target.dataset.idx), 1);
            localStorage.setItem(SearchInput.#storageKey, JSON.stringify(recentItems));
        })
    }
}
