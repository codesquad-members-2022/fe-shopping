
function createTopBar(menu, submenu) {
    const menuTemplate = createList(menu)
    const submenuTemplate = createList(submenu)
    return `<article class="top-bar">
            <section>
                <menu class="top-bar__menu">
                    ${menuTemplate}
                </menu>
                <menu class="top-bar__sub-menu">
                    ${submenuTemplate}
                </menu>
            </section>
        </article>`
}

function createList(listArray) {
    return listArray.reduce((acc, cur) => {
        return acc + `<li><a>${cur}</a></li>`
    }, ``)
}

function createStrongList(listArray) {
    return listArray.reduce((acc, cur, idx) => {
        return acc + `<li data-index="${idx}"><a><strong>${cur[0]}</strong>${cur[1]}</a></li>`}, ``)
}

function createHeader(navMenu) {
    const navigationList = createList(navMenu)
    return `<header id="header">
        <div class="header__category-btn"><p>카테고리</p></div>
        <section>
            <div class="header__inner-container">
                <h1 title="coupang"></h1>
                <div class="form-container">
                    <form class="header__form">
                        <div class="header__form__select">                  
                            <button type="button" id="select-btn" class="btn-down"><span>전체</span></button>   
                        </div>
                        <div class="header__form__search">
                            <input type="text" class="search-input">
                                <button class="search-btn"></button>
                        </div>
                    </form>
                </div>
                <ul class="icon-menus">
                    <li class="menus__mycoupang">
                        <a>
                            <div class="icon-mycoupang"></div>
                            <p>마이쿠팡</p>
                        </a>
                    </li>
                    <li class="menus__mycart">
                        <a>
                            <div class="icon-mycart"></div>
                            <p>장바구니</p>
                        </a>
                    </li>
                </ul>
            </div>
            <ul class="header__nav-bar">
            ${navigationList}
            </ul>
        </section>
    </header>`
}

function createSelectList(list) {
    const selectList = createList(list)
    return `<ul class="header__select__list visibility-hidden">
            ${selectList}
            </ul>`
}

function createPrefixListContainer() {
    return `<ul class="header__search__prefix-container visibility-hidden">
            </ul>`
}

function createSearchHistoryContainer() {
    return `<div class="header__search__history-container visibility-hidden">
                <div class="history-top">
                    <div><p>최근 검색어</p></div>
                    <div class="history-main">
                        <ul class="history-list">                 
                        </ul>
                    </div>
                </div>
                <div class="history-bottom">
                    <button type="button" class="history-deleteAll">전체삭제</button>
                    <button type="button" class="history-switch">최근검색어끄기</button>
                </div>
            </div>`
}

function createHistoryList(listArray) {
    return listArray.reduce((acc, cur) => {
        return acc + `<li>
                        <a>${cur}</a>
                        <button type="button" class="history-delete">삭제</button>
                      </li>`}, ``)
}

function createHistoryOff() {
    return `<div class="history-off">최근검색어 기능이 꺼져있습니다.</div>`
}

export { createList, createTopBar, createSelectList, createHeader,
    createPrefixListContainer, createStrongList, createSearchHistoryContainer,
    createHistoryList, createHistoryOff }

