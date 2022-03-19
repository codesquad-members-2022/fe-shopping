
import * as Templates from "./templates.js"
import { selectList, headerNavMenu, topBarMenu, topBarSubMenu } from "./data.js";

const $body = document.body

function renderHeader() {
    renderHeaderContainer()

    const $headerContainer = document.querySelector('.header-container')
    renderTopBar($headerContainer, topBarMenu, topBarSubMenu)
    renderHeaderWithNavBar($headerContainer, headerNavMenu)
    renderFormOfHeader(selectList)
}

function renderHeaderContainer() {
    const headerContainer = document.createElement('div')
    headerContainer.classList.add('header-container')
    $body.prepend(headerContainer)
}

function renderTopBar(elem, menu, subMenu) {
    const topBar = Templates.createTopBar(menu, subMenu)
    elem.innerHTML += topBar
}

function renderHeaderWithNavBar(elem, navMenu) {
    const header = Templates.createHeader(navMenu)
    elem.innerHTML += header
}

function renderFormOfHeader(selectList) {
    const $formSelect = document.querySelector('.header__form__select')
    const $formSearch = document.querySelector('.header__form__search')

    renderSelectList($formSelect, selectList)
    renderSearchContainer($formSearch)
}

function renderSelectList(elem, list) {
    const $selectList = Templates.createSelectList(list)
    elem.innerHTML += $selectList
}

function renderSearchContainer(elem) {
    const $searchList = Templates.createSearchListContainer()
    elem.innerHTML += $searchList

}

function renderSearchList(template) {
    const $formSearchList = document.querySelector('.header__search__list')
    $formSearchList.innerHTML = template
}

export { renderHeader, renderSearchList }