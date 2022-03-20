export function moveToSearchTermPage(option, term) {
  history.pushState(null, null, `/search?option=${option}&text=${term}`);
  // location.reload();
}
