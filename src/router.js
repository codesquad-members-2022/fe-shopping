export function moveToSearchTermPage(scope, term) {
  history.pushState(null, null, `/search?scope=${scope}&text=${term}`);
  // location.reload();
}
