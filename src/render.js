
import * as Templates from "./templates.js"
import { selectList } from "./data.js";

function renderHeader() {
    const $body = document.querySelector('body')
    const headerContainer = document.createElement('div')
    headerContainer.classList.add('header-container')

    const menu = ['로그인', '회원가입', '고객센터']
    const subMenu = ['즐겨찾기', '가입신청']
    const navMenu = ['로켓배송', '로켓프레시', '쿠팡비즈', '로켓직구', '골드박스', '와우회원할인', '이벤트/쿠폰', '기획전', '여행/티켓']

    const topBar = Templates.createTopBar(menu, subMenu)
    const header = Templates.createHeader(navMenu)

    headerContainer.innerHTML = `${topBar}${header}`
    $body.prepend(headerContainer)
    renderFormSelectList(selectList)
    renderFormSearchContainer()
}

function renderFormSelectList(list) {
    const $formSelect = document.querySelector('.header__form__select')
    const $selectList = Templates.createSelectList(list)

    $formSelect.innerHTML += $selectList
}

function renderFormSearchContainer() {
    const $formSearch = document.querySelector('.header__form__search')
    const $searchList = Templates.createSearchListContainer()

    $formSearch.innerHTML += $searchList

}

function renderFormSearchLists(template) {
    const $formSearchList = document.querySelector('.header__search__list')

    $formSearchList.innerHTML = template
}

export { renderHeader, renderFormSearchContainer, renderFormSearchLists }