import { delay } from "../../../../utils";

const handleListMouseOver = ({ target }) => {
  target.classList.add("list-over");
};

const handleListMouseOut = ({ target }) => {
  const MOUSEOVER_DELAY_MS = 100;
  delay(MOUSEOVER_DELAY_MS).then(() => {
    target.classList.remove("list-over");
  });
};
export { handleListMouseOver, handleListMouseOut };
