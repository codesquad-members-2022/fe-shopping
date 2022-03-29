import { store } from "../../../../Store";
import { delay } from "../../../../utils";

const handleCMainMouseOver = () => {
  store.setState({ isMouseOnMain: true });
};

const handleCMainMouseOut = () => {
  delay(100).then(() => {
    store.setState({ isMouseOnMain: false });
  });
};

export { handleCMainMouseOver, handleCMainMouseOut };
