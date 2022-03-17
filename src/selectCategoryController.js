
function initSelectCategoryEvent() {
    const $selectBtn = document.querySelector('#select-btn')

    $selectBtn.addEventListener('click', (e) => clickSelectBtnHandler(e))
    $selectBtn.addEventListener('focusout', (e) => focusoutSelectBtnHandler(e))
}

function focusoutSelectBtnHandler(e) {
    const $selectBtn = e.target
    const $selectOpenList = document.querySelector('.header__select--open')

    addHidden($selectOpenList)
    changeBtnDownImg($selectBtn)
}

function addHidden(target) {
    target.classList.add('hidden')
}

function changeBtnDownImg(target) {
    target.classList.remove('btn-up')
    target.classList.add('btn-down')
}

function clickSelectBtnHandler(e) {
    const $selectBtn = e.target
    const $selectOpenList = document.querySelector('.header__select--open')

    toggleHidden($selectOpenList)
    toggleBtnImage($selectBtn)
}


function toggleHidden(target) {
    if(target.classList.contains('hidden')) {
        target.classList.remove('hidden')
    }
    else {
        target.classList.add('hidden')
    }
}

function toggleBtnImage(target) {
    if(target.classList.contains('btn-down')) {
        target.classList.remove('btn-down')
        target.classList.add('btn-up')
    }
    else {
        target.classList.remove('btn-up')
        target.classList.add('btn-down')
    }
}

export { initSelectCategoryEvent }