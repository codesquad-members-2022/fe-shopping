const dev = true;
const apiURL = dev ? 'http://localhost:3000/api/autoComplete' : '';

export class AutoComplete {
  constructor() {}

  async requestACKeyword(inputKeyword) {
    try {
      const response = await fetch(`${apiURL}?q=${inputKeyword}`);
      const ACKeywords = await response.json();
      return ACKeywords;
    } catch {
      return false;
    }
  }

  async renderACKeywords(inputKeyword) {
    const ACKeywords = await this.requestACKeyword(inputKeyword);
  }
}
