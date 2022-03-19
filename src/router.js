export function moveToSearchTermPage(term) {
  history.pushState(null, null, `/?searh=${term}`);
  // location.reload();
}
