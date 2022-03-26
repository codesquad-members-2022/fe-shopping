import { delay } from "../util";

class IntervalDelay {
  constructor(time) {
    this.delayController = null;
    this.time = time;
  }

  waitDelay = async () => {
    if (this.delayController) this.delayController.abort();
    this.delayController = new AbortController();
    const inputDelaySignal = this.delayController.signal;
    await delay({ time: this.time, signal: inputDelaySignal });
    this.delayController = null;
  };

  abortDelay = () => {
    this.delayController.abort();
    this.delayController = null;
  };
}

export { IntervalDelay };
