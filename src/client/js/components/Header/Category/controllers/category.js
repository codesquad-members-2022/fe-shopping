import { store } from "../../../../Store";
import { delay } from "../../../../utils";

const cross = (v1, v2) => {
  const [x1, y1] = v1;
  const [x2, y2] = v2;
  return x1 * y2 - y1 * x2;
};

const isTargetInLayer = (target) => {
  const { clientX, clientY } = target;
  const {
    mouseClientX: prevClientX,
    mouseClientY: prevClientY,
    baseRect: { top, right, bottom },
  } = store.state;

  if (!top || !right || !bottom) return false;
  const vectorToTop = [right - prevClientX, top - prevClientY];
  const vectorToBottom = [right - prevClientX, bottom - prevClientY];
  const vectorToTarget = [clientX - prevClientX, clientY - prevClientY];
  const topTargetCross = cross(vectorToTop, vectorToTarget);
  const targetBottomCross = cross(vectorToTarget, vectorToBottom);
  return topTargetCross * targetBottomCross >= 0;
};

const debounceForSmartLayer = ({ callback, mouseOn }) => {
  const msDiffRange = 10;
  const eventTypes = {};
  return function (event) {
    const { type, clientX, clientY } = event;
    const msTime = isTargetInLayer({ clientX, clientY }) ? 300 : 100;
    eventTypes[type] = new Date();
    delay(msTime).then(() => {
      const delayDate = new Date();
      const diff = delayDate - eventTypes[type];
      const isRangeIn = diff <= msTime + msDiffRange && diff >= msTime;
      const isMouseOn = store.state.mouseOnCategory === mouseOn;
      if (isRangeIn && isMouseOn) {
        callback(event);
      }
    });
  };
};

const handleListMouseOver = (event) => {
  const { target, clientX, clientY } = event;
  target.classList.add("list-over");

  store.setState({
    mouseClientX: clientX,
    mouseClientY: clientY,
  });
};

const handleListMouseOut = ({ target }) => {
  target.classList.remove("list-over");
};
export { handleListMouseOver, handleListMouseOut, debounceForSmartLayer };
