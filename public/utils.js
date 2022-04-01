const DIRECTION_UP = "ArrowUp";
const DIRECTION_DOWN = "ArrowDown";
const ENTER = "Enter";

const debouncing = (delayTime) => {
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

const initDebouncing = ({ delay }) => {
    return debouncing(delay);
};

const delay = ({ delay }) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

export { DIRECTION_UP, DIRECTION_DOWN, ENTER, initDebouncing, delay };
