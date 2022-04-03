import { ListMark } from "./ListMark";
import { IntervalDelay } from "./IntervalDelay";
import { showDelayTime } from "../constant";

class CategoriesPresenter {
  constructor(view) {
    const { target, transformer, relativeList } = view;
    this.view = view;
    this.model = null;
    this.target = target;
    this.transformer = transformer;
    this.relativeList = relativeList;
    this.listMark = new ListMark(view);
    this.showDelay = new IntervalDelay(showDelayTime);
  }

  setModel = (model) => {
    this.model = model;
  };

  getOrderInClassList = (classList) => {
    const orders = ["first", "second"];
    const categoryOrder = orders.find((order) => {
      return classList.find((list) => list.includes(order));
    });
    return categoryOrder;
  };

  showChildList = () => {
    const listChildren = [...this.transformer.children];
    const changedCategoryIndex = this.model.categorySecond ? 2 : 1;
    const changedCategory = listChildren[changedCategoryIndex];
    const innerListData = this.model.getInnerListData();

    this.view.changeWidth(this.transformer, "288%");
    this.view.changeInnerTextList(changedCategory, innerListData);
    this.view.showListsAll();

    if (changedCategoryIndex === 2) return;
    this.view.changeInnerText(listChildren[2], "");
  };

  handleShowListEvent = async (target) => {
    await this.showDelay.waitDelay();

    const {
      innerText,
      parentNode: { classList },
    } = target;
    const categoryOrder = this.getOrderInClassList([...classList]);

    this.model.enrollCategoryByOrder(categoryOrder, innerText);
    this.model.enrollList();
    this.showChildList(target);
  };

  hideChildList = () => {
    const childLists = [...this.transformer.children];
    childLists.forEach((child, index) => {
      if (!index) return;
      this.view.changeOptionNone(child, "add");
      this.view.changeInnerText(child, "");
    });
    this.view.changeWidth(this.transformer, "93%");
  };

  handleHideEvent = () => {
    if (this.showDelay.delayController) this.showDelay.abortDelay();
    this.hideChildList();
    this.view.changeOptionHidden(this.transformer, "add");
  };

  handleShowEvent = ({ target }) => {
    const { tagName } = target;
    if (tagName === "LI") return this.handleShowListEvent(target);
    this.view.changeOptionHidden(this.transformer, "remove");
  };
}

export default CategoriesPresenter;
