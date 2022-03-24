export default class CategorySelector {
    constructor($parent, categoryList, categories = []) {
        this.$parent = $parent;
        this.$target = null;
        this.categoryList = categoryList;
        this.defaultCategory = (categories[0].name || '전체');
    }

    init() {
        this.render();
        this.setEvents();
    }

    render() {
        this.$parent.innerHTML += this.createHTML();
    }

    createHTML() {
        return /* html */ `
            <div class="search__category">
                <div class="search__category--contents">
                    <span class="search__category--title">${this.defaultCategory}</span>
                    <img src="resources/image/ic_bottom.png" alt="카테고리 선택">
                </div>
                    ${this.categoryList.createHTML()}
                </div>
            </div>
        `
    }

    setEvents() {
        this.setTarget();
        this.setClickEvent();
    }

    setTarget() {
        this.$target = !this.$target ? document.querySelector('.search__category') : this.$target;
        this.categoryList.setTarget(document.querySelector('.search__category--list'));
    }

    setClickEvent() {
        const listTitle = document.querySelector('.search__category--contents');
        listTitle.addEventListener('click', this.handleClickEvent.bind(this));
    }

    handleClickEvent(event) {
        const target = event.target;

        if (target.className === 'search__category--item') {
            this.selectCategory(target);
            return;
        }

        this.categoryList.toggle();
    }

    selectCategory(target) {
        const titleTag = document.querySelector('.search__category--title');
        titleTag.innerText = target.innerText;
        this.categoryList.toggle();
    }
}