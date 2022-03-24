class ObserverPublisher {
  constructor(state) {
    this.state = state;
    this.observers = new Set();
  }

  addSubscribe(subScriber) {
    this.observers.add(subScriber);
  }

  notify(newState) {
    this.state = newState;
    this.observers.forEach((fn) => fn(this.state));
  }
}

export default ObserverPublisher;
