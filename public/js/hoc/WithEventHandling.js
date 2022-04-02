const withEventHandling = (wrappedClass, target, ...props) => {

  const wrappedComponent = new wrappedClass(target, ...props);

  wrappedComponent.isCorrectEventTarget = function(target, depth) {
    const container = target.parentNode.parentNode;
    return container.classList.contains(`${depth}-content`);
  }

  wrappedComponent.changeFocusedItem = function(target, depth) {
    const container = target.parentNode.parentNode;
    if (!container.classList.contains(`${depth}-content`)) return;
    [...container.children].forEach((child) => {
      if (child === target.parentNode) child.classList.add('focus');
      else child.classList.remove('focus');
    });
  }

  wrappedComponent.renderNextDepthList = function(focusedCategory, containerClass, Component) {
    const nextDepthCategories = this.$state.categories.find((category => category.name === focusedCategory));
    const $nextDepthContainer = this.$target.querySelector(containerClass);
    $nextDepthContainer.classList.add('open');
    if (this.nextDepthList) this.nextDepthList.destroy();
    this.nextDepthList = withEventHandling(Component, $nextDepthContainer, {
      categories: nextDepthCategories,
    });
  }

  return wrappedComponent;
}

export default withEventHandling;
