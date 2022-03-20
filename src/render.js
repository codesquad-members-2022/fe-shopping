
import * as Templates from "./templates.js"
import { selectList, headerNavMenu, topBarMenu, topBarSubMenu } from "./data.js";
import {createHistoryList, createHistoryOff, createStrongList} from "./templates.js";

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

function renderPrefixList(elem, prefixListArray) {
    const prefixListTemplate = createStrongList(prefixListArray)
    elem.innerHTML = prefixListTemplate
}

function renderSearchHistoryContainer(elem) {
    const $searchHistory = Templates.createSearchHistoryContainer()
    elem.innerHTML += $searchHistory
}

function renderHistoryList(elem, historyList) {
    let template;
    template = historyList === 'off'? createHistoryOff() : createHistoryList(historyList)
    elem.innerHTML = template
}

export { renderHeader, renderPrefixList, renderHistoryList }