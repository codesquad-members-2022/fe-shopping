
function addSelectEvent() {
    const $selectBtn = document.querySelector('#select-btn')

    $selectBtn.addEventListener('click', (e) => clickSelectHandler(e))
    $selectBtn.addEventListener('focusout', (e) => focusoutSelectHandler(e))
}

function focusoutSelectHandler(e) {
    const $selectBtn = e.target
    console.log('focus',e.target)
    const $selectOpenList = document.querySelector('.header__select--open')

    addHidden($selectOpenList)
    toggleBtnDown($selectBtn)
}

function addHidden(target) {
    target.classList.add('hidden')
}

function toggleBtnDown(target) {
    target.classList.remove('btn-up')
    target.classList.add('btn-down')
}

function clickSelectHandler(e) {
    const $selectBtn = e.target
    const $selectOpenList = document.querySelector('.header__select--open')
    console.log('click', e.target)
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

export { addSelectEvent }