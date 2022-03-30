import { store } from "../../../../Store";
import { delay } from "../../../../utils";
import { handleListMouseOut, handleListMouseOver } from "./category";

const handleCSubMouseOver = (event) => {
  const {
    subCategory: { clientRect },
    subCategoryDatas,
  } = store.state;

  const { target } = event;
  const contentName = target.textContent;

  const { subs: thirdCategoryDatas } = subCategoryDatas.find(
    ({ name }) => name === contentName
  );

  store.setState({
    thirdCategoryDatas,
    baseRect: clientRect,
  });
  handleListMouseOver(event);
};

const handleCSubMouseOut = (event) => {
  const MOUSEOVER_DELAY_MS = 100;
  delay(MOUSEOVER_DELAY_MS).then(() => {
    handleListMouseOut(event);
  });
};

export { handleCSubMouseOver, handleCSubMouseOut };
