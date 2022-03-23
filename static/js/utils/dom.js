export const dom = {
  select: (selector, where = document) => where.querySelector(selector),

  initEl: (selector) => (dom.select(selector).innerHTML = ''),

  removeEl: (selector) => dom.select(selector).remove(),
};
