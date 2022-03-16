
function createTopBar(menu, submenu) {
    const menuTemplate = createLists(menu)
    const submenuTemplate = createLists(submenu)
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

function createLists(listArray) {
    return listArray.reduce((acc, cur) => {
        return acc + `<li><a>${cur}</a></li>`
    }, ``)
}

function createHeader(navMenu) {
    const navigationList = createLists(navMenu)
    return `<header id="header">
        <div class="header__category-btn"><p>카테고리</p></div>
        <section>
            <div class="header__inner-container">
                <h1 title="coupang"></h1>
                <div class="form-container">
                    <form class="header__search-form">
                        <div class="header__form__select">
                            <label for="select-btn">전체</label>
                            <button type="button" id="select-btn" class="btn-down"></button>   
                        </div>
                        <div class="header__form__search">
                            <input type="text">
                                <a class="search-btn"></a>
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
    const selectList = createLists(list)
    return `<ul class="header__select--open hidden">
            ${selectList}
            </ul>`
}

export { createLists, createTopBar, createSelectList, createHeader }

