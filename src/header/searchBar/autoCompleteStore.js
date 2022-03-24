const dev = true;
const apiURL = dev ? 'http://localhost:3000/api/autoComplete' : '';

export const autoCompleteStore = {
  initialInputKeyword: '',

  async requestACKeywords(inputKeyword) {
    try {
      const response = await fetch(`${apiURL}?q=${inputKeyword}`);
      if (!response.ok) {
        const bodyText = await response.text();
        throw new Error(`${response.status} ${response.statusText} ${bodyText}`);
      }
      const bodyJSON = await response.json();
      const ACKeywords = Object.values(bodyJSON).map(({ keyword }) => keyword);
      return ACKeywords;
    } catch (err) {
      console.error(err);
      return false;
    }
  },

  setInitialInputKeyword(keyword) {
    this.initialInputKeyword = keyword;
  },

  getInitialInputKeyword() {
    return this.initialInputKeyword;
  },
};
