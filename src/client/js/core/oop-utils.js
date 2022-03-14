const createExtendsRelation = (Child, Parent) => {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
};

export { createExtendsRelation };
