class Store {

  constructor() {
    this.state = {};
    this.subscribers = {};
  }

  subscribe(key, subscriber) {
    if (!this.subscribers[key]) {
      this.subscribers[key] = [];
      this.observe(key);
    }
    this.subscribers = {
      ...this.subscribers,
      [key]: [...this.subscribers[key], subscriber],
    };
  }

  unsubscribe(key) {
    this.subscribers[key].pop();
  }

  observe(key) {
    let _value = this.state[key];
    Object.defineProperty(this.state, key, {
      get() {
        return _value;
      },
      set: function(value) {
        _value = value;
        this.subscribers[key].forEach(subscriber => {
          console.log(subscriber);
          subscriber.setState({ [key]: this.state[key] })
        })
      }.bind(this)
    });
  }
}

export default Store;
