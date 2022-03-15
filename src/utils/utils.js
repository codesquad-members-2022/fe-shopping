export const selector = (selector, base = document) => {
  return base.querySelector(selector);
};

export const selectorAll = (selector, base = document) => {
  return base.querySelectorAll(selector);
};

export const addClass = (className, element) => {
  element.classList.add(className);
};

export const removeClass = (className, element) => {
  element.classList.remove(className);
};

export const toggleClass = (className, element) => {
  element.classList.toggle(className);
};

export const createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  return element;
};

export const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const hasAscendant = ($ascendant, $element) => {
  if (!$element) throw `Error: Unexpected $element Argument ${$element}`;
  if (!$ascendant) return false;

  let $curElement = $element;

  while ($curElement) {
    if ($curElement === $ascendant) {
      return true;
    }

    $curElement = $curElement.parentNode;
  }
  return false;
};

// export const hasAscendant = (className, $element) => {
//   if (!className) throw `Error: Unexpected className Argument ${className}`;
//   if (!$element) throw `Error: Unexpected $element Argument ${$element}`;

//   let $curElement = $element;

//   while ($curElement !== document) {
//     if ($curElement.classList.contains(className)) {
//       return [true, $curElement];
//     }

//     $curElement = $curElement.parentNode;
//   }
//   return false;
// };

export const webStorage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },

  clear(key) {
    localStorage.removeItem(key);
  },
};
