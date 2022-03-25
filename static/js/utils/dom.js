export const dom = {
  select: (selector, where = document) => where.querySelector(selector),

  initEl: (elment) => (elment.innerHTML = ''),

  removeEl: (selector) => dom.select(selector).remove(),
};
