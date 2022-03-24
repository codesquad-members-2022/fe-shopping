export default function DelayTimer() {
    this.timer = null;
}

DelayTimer.prototype.startTimer = function (millisecond, callback) {
    this.timer = setTimeout(callback, millisecond);
}

DelayTimer.prototype.deleteTimer = function () {
    clearTimeout(this.timer);
    this.timer = null;
}

DelayTimer.prototype.isRun = function () {
    return this.timer !== null;
}

DelayTimer.prototype.debounceTimer = function (millisecond, callback) {
    if (this.isRun()) {
        this.deleteTimer();
    }

    this.startTimer(millisecond, callback);
}