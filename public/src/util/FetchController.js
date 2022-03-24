export default class FetchController {
    constructor() {
        this.abortController = null;
    }

    setAbortController() {
        if (this.abortController !== null) {
            try {
                this.abortController.abort();
            } catch (error) {
                throw new Error('Fetch aborted!');
            }
            this.abortController = null;
        }
        this.abortController = new AbortController();
    }

    fetchData = async (url) => {
        this.setAbortController();

        const response = await fetch(url, {
            signal: this.abortController.signal
        });

        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Fetch Failed');
        }
    }

    fetchAutoCompletionWord = async (data) => {
        const fullUrl = this.createAmazonApiURL(data);
        const fetchedData = await this.fetchData(fullUrl);
        const completionWords = fetchedData.suggestions.map(v => v.value);
        return completionWords;
    }

    createAmazonApiURL = (data) => {
        return `https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${data}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`
    }
}