class ObserverPublisher {
  constructor(state) {
    this.state = state;
    this.observers = {};
  }

  addSubscribe(type, subScriber) {
    if (!this.observers[type]) {
      this.observers[type] = new Set();
    }
    this.observers[type].add(subScriber);
  }

  notify(type, newState) {
    this.state = newState;
    this.observers[type].forEach((fn) => fn(this.state));
  }
}

export default ObserverPublisher;
