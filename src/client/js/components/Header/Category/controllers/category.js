import { store } from "../../../../Store";
import { delay } from "../../../../utils";

const handleListMouseOver = ({ target }) => {
  target.classList.add("list-over");
  const cName = target.textContent;
  const { categoryDatas } = store.state;
  const { subs: subCategoryDatas } = categoryDatas.find(
    ({ name }) => name === cName
  );
  store.setState({ subCategoryDatas });
};

const handleListMouseOut = ({ target }) => {
  const MOUSEOVER_DELAY_MS = 100;
  delay(MOUSEOVER_DELAY_MS).then(() => {
    target.classList.remove("list-over");
    store.setState({ subCategoryDatas: [] });
  });
};
export { handleListMouseOver, handleListMouseOut };
