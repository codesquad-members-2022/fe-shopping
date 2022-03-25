const DIRECTION_UP = "ArrowUp";
const DIRECTION_DOWN = "ArrowDown";
const ENTER = "Enter";
let timer;

const delay = (time) => {
    return new Promise((resolve) => {
        timer = setTimeout(resolve, time);
    });
};

export { DIRECTION_UP, DIRECTION_DOWN, ENTER, delay, timer };
