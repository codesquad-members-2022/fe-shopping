
import * as Templates from "./templates.js"
import { selectList, headerNavMenu, topBarMenu, topBarSubMenu } from "./data.js";

const $body = document.body

function renderHeader() {
    renderHeaderContainer()

    const $headerContainer = document.querySelector('.header-container')
    renderTopBar($headerContainer, topBarMenu, topBarSubMenu)
    renderHeaderWithNavBar($headerContainer, headerNavMenu)
    renderFormInHeader(selectList)
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

function renderFormInHeader(selectList) {
    const $formSelect = document.querySelector('.header__form__select')
    const $formSearch = document.querySelector('.header__form__search')

    renderSelectList($formSelect, selectList)
    renderPrefixListContainer($formSearch)
    renderSearchHistoryContainer($formSearch)
}

function renderSelectList(elem, list) {
    const $selectList = Templates.createSelectList(list)
    elem.innerHTML += $selectList
}

function renderPrefixListContainer(elem) {
    const $prefixList = Templates.createPrefixListContainer()
    elem.innerHTML += $prefixList
}

function renderPrefixList(elem, template) {
    elem.innerHTML = template
}

function renderSearchHistoryContainer(elem) {
    const $searchHistory = Templates.createSearchHistoryContainer()
    elem.innerHTML += $searchHistory
}

function renderHistoryList(elem, template) {
    elem.innerHTML = template
}

export { renderHeader, renderPrefixList, renderHistoryList }