
function selectCategoryController(initWord) {

    const $selectBtn = document.querySelector('#select-btn')
    const $selectOpenList = document.querySelector('.header__select__list')

    const on = {
        init : initSelectCategoryEvent
    }

    on[initWord]()

    function initSelectCategoryEvent() {
        $selectBtn.addEventListener('click', (e) => clickSelectBtnHandler(e))
        $selectBtn.addEventListener('focusout', (e) => focusoutSelectBtnHandler(e))
        $selectOpenList.addEventListener('click', (e) => clickSelectOpenListHandler(e) )
    }

    function focusoutSelectBtnHandler(e) {
        const $selectBtn = e.target

        changeBtnDownImg($selectBtn)
        removeTransition($selectOpenList)
        addVisibilityHidden($selectOpenList)
    }

    function clickSelectBtnHandler(e) {
        const $selectBtn = e.target

        toggleBtnImage($selectBtn)
        toggleTransition($selectOpenList)
        toggleVisibilityHidden($selectOpenList)
    }

    function clickSelectOpenListHandler(e) {
        const selectedText = e.target.textContent
        changeSelectBtnText(selectedText)
    }

    function changeSelectBtnText(text) {
        $selectBtn.firstElementChild.textContent = text
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

}
export { selectCategoryController }