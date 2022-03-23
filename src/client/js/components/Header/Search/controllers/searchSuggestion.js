const highlightWord = (string, word) => {
  const matchedWordRegex = new RegExp(
    `(?<front>.+)?(?<matchedWord>${word})(?<back>.+)?`
  );
  const { groups } = string.match(matchedWordRegex) || { groups: {} };
  const { front, matchedWord, back } = groups;

  return matchedWord
    ? `${front || ""}<span class="matchedWord">${matchedWord}</span>${
        back || ""
      }`
    : string;
};

export { highlightWord };
