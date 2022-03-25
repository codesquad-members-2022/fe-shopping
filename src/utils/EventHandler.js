export default function EventHandler() {
  this.$element;
  this.coreHandler = {};
  this.subLogic = {};
}

EventHandler.prototype.setElement = function ($element) {
  this.$element = $element;
};

EventHandler.prototype.setCoreHandler = function (coreHandlerObj) {
  this.coreHandler = { ...coreHandlerObj };
};

EventHandler.prototype.setSubLogic = function (subLogicObj) {
  this.subLogic = { ...subLogicObj };
};
