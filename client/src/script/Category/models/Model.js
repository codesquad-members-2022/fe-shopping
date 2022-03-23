function Model (state) {
  this.state = state;
}
Model.prototype.setState = function (newState) {
  for (const [key, value] in newState.entries()) {
    this.state[key] = value;
  }
}
Model.prototype.getState = function () {
  return this.state;
}

export default Model;