import { store } from "../../../../Store";
import { delay } from "../../../../utils";

const handleCSubMouseOver = () => {
  store.setState({ isMouseOnSub: true });
};

const handleCSubMouseOut = () => {
  delay(100).then(() => {
    store.setState({ isMouseOnSub: false });
  });
};

export { handleCSubMouseOver, handleCSubMouseOut };
