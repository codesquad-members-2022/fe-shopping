import { MAX_RECENT_SEARCH_SIZE } from './constants';

class LocalStorageController {

  constructor() {
    this.storageData = {};
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
    let _value = this.storageData[key];
    Object.defineProperty(this.storageData, key, {
      get() {
        return _value;
      },
      set: function(value) {
        _value = value;
        this.subscribers[key].forEach(subscriber => subscriber.setState({ [key]: this.storageData[key] }))
      }.bind(this)
    });
  }

  addData(key, value) {
    const values = JSON.parse(localStorage.getItem(key));

    if (values) {
      values.length === MAX_RECENT_SEARCH_SIZE && values.pop();
      localStorage.setItem(key, JSON.stringify([value, ...values]));
      this.storageData[key] = [value, ...values];
    }

    else {
      localStorage.setItem(key, JSON.stringify([value]));
      this.storageData[key] = [value];
    }
  }

  getData(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  clearData(key) {
    localStorage.removeItem(key);
    this.storageData[key] = [];
  }
}

export default new LocalStorageController();
