
function initSelectCategoryEvent() {
    const $selectBtn = document.querySelector('#select-btn')

    $selectBtn.addEventListener('click', (e) => clickSelectBtnHandler(e))
    $selectBtn.addEventListener('focusout', (e) => focusoutSelectBtnHandler(e))
}

function focusoutSelectBtnHandler(e) {
    const $selectBtn = e.target
    const $selectOpenList = document.querySelector('.header__select__list')

    changeBtnDownImg($selectBtn)
    removeTransition($selectOpenList)
    addVisibilityHidden($selectOpenList)
}

function clickSelectBtnHandler(e) {
    const $selectBtn = e.target
    const $selectOpenList = document.querySelector('.header__select__list')

    toggleBtnImage($selectBtn)
    toggleTransition($selectOpenList)
    toggleVisibilityHidden($selectOpenList)
}

function toggleVisibilityHidden(target) {
    target.classList.toggle('visibility-hidden')
}

function addVisibilityHidden(target) {
    target.classList.add('visibility-hidden')
}

function changeBtnDownImg(target) {
    target.classList.remove('btn-up')
    target.classList.add('btn-down')
}

function removeTransition(target) {
    target.classList.remove('header__select--slide-down')
}

function toggleTransition(target) {
    target.classList.toggle('header__select--slide-down')
}

function toggleBtnImage(target) {
    target.classList.toggle('btn-down')
    target.classList.toggle('btn-up')
}

export { initSelectCategoryEvent }