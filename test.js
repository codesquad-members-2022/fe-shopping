function Name(name) {
	this.name = name;
}

Name.prototype.getName = function() {
  return this.name
}

Name.prototype.setName = function() {
	this.name = newName;
}

const obj = new Name("javascript");
obj.getName();

const obj2 = new Name("c#");
obj2.getName();
obj.__proto__