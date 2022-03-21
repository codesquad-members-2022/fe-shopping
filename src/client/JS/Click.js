import { selector } from "./util";

class Click {
  constructor(target, transformer, className) {
    this.target = target;
    this.transformer = transformer;
    this.className = className;
  }

  toggleIcon = ({ classList }) => {
    classList.toggle("fa-chevron-down");
    classList.toggle("fa-chevron-up");
  };

  toggleList = (menuList) => {
    menuList.classList.toggle("hidden");
  };

  handleCenterMenuClick = (centerMenu) => {
    const menuList = selector("ul", centerMenu);
    const menuIcon = selector("i", centerMenu);
    this.toggleIcon(menuIcon);
    this.toggleList(menuList);
  };

  handleClickEvent = ({ target }) => {
    const isCenterMenu = target.closest(this.className);
    const centerMenu = this.target;
    const isCenterMenuListHidden =
      this.transformer.classList.contains("hidden");
    if (isCenterMenu || !isCenterMenuListHidden) {
      this.handleCenterMenuClick(centerMenu);
    }
  };

  init = () => {
    document.addEventListener("click", this.handleClickEvent);
  };
}

export { Click };
