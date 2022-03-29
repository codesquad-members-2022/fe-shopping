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
    mainCategory: {
      clientRect: { top, right, bottom },
    },
  } = store.state;

  const vectorToTop = [right - prevClientX, top - prevClientY];
  const vectorToBottom = [right - prevClientX, bottom - prevClientY];
  const vectorToTarget = [clientX - prevClientX, clientY - prevClientY];
  const topTargetCross = cross(vectorToTop, vectorToTarget);
  const targetBottomCross = cross(vectorToTarget, vectorToBottom);
  return topTargetCross * targetBottomCross >= 0;
};

const handleListMouseOver = (event) => {
  const {
    mainCategory: { clientRect },
  } = store.state;
  const { target, clientX, clientY } = event;
  const { left, right, top, bottom, width, height } = clientRect;
  if (isTargetInLayer({ clientX, clientY })) {
    console.log("안에 있음");
    store.setState({ isMainLayerIn: true });
    delay(1000).then(() => {
      const { isMouseOnSub } = store.state;
      if (isMouseOnSub) {
        console.log("sub 안에 있음");
      } else {
        console.log("sub 안에 없음");
      }
    });
  } else {
    target.classList.add("list-over");
    const cName = target.textContent;
    const { categoryDatas } = store.state;
    const { subs: subCategoryDatas } = categoryDatas.find(
      ({ name }) => name === cName
    );
    store.setState({
      subCategoryDatas,
      mouseClientX: clientX,
      mouseClientY: clientY,
      isMainLayerIn: false,
    });
  }
  // 만약 대각선 영역에 있다면
  // 딜레이를 주고 저장된 타겟과 다르다면(x,y영역확인?) 바꾼다 (아래 로직을 실행한다)
  // 만약 subCategory 로 옮겼다면 (state 를 통해서 확인?) 바꾸지 않는다. (아래 로직을 실행하지 않는다)
};

const handleListMouseOut = ({ target }) => {
  const MOUSEOVER_DELAY_MS = 101;
  delay(MOUSEOVER_DELAY_MS).then(() => {
    const { isMainLayerIn } = store.state;
    console.log(isMainLayerIn);
    if (isMainLayerIn) return;

    target.classList.remove("list-over");
    store.setState({ subCategoryDatas: [] });
  });
};
export { handleListMouseOver, handleListMouseOut };
