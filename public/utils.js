const DIRECTION_UP = "ArrowUp";
const DIRECTION_DOWN = "ArrowDown";
const ENTER = "Enter";

const debounce = (delayTime) => {
    let timer;

    return () => {
        return new Promise((resolve) => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(resolve, delayTime);
        });
    };
};

export { DIRECTION_UP, DIRECTION_DOWN, ENTER, debounce };
