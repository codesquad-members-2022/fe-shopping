import { store } from "../../../../Store";
import { delay } from "../../../../utils";
import { handleListMouseOut, handleListMouseOver } from "./category";

const handleCMainMouseOver = (event) => {
  const {
    mainCategory: { clientRect },
    categoryDatas,
  } = store.state;

  const { target } = event;
  const contentName = target.textContent;

  const { subs: subCategoryDatas } = categoryDatas.find(
    ({ name }) => name === contentName
  );

  store.setState({
    subCategoryDatas,
    baseRect: clientRect,
  });

  handleListMouseOver(event);
};

const handleCMainMouseOut = (event) => {
  const MOUSEOVER_DELAY_MS = 100;
  delay(MOUSEOVER_DELAY_MS).then(() => {
    handleListMouseOut(event);
  });
};

export { handleCMainMouseOver, handleCMainMouseOut };
