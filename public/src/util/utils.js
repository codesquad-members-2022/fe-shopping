export const fetchData = async (url) => {
    const response = await fetch(url);
    if (response.status === 200) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Fetch Failed');
    }
}

export const fetchAutoCompletionWord = async (data) => {
    const fullUrl = getAmazonApiURL(data);
    const fetchedData = await fetchData(fullUrl);
    const completionWords = fetchedData.suggestions.map(v => v.value);
    return completionWords;
}

const getAmazonApiURL = (data) => {
    return `https://completion.amazon.com/api/2017/suggestions?session-id=133-4736477-7395454&customer-id=&request-id=4YM3EXKRH1QJB16MSJGT&page-type=Gateway&lop=en_US&site-variant=desktop&client-info=amazon-search-ui&mid=ATVPDKIKX0DER&alias=aps&b2b=0&fresh=0&ks=71&prefix=${data}&event=onKeyPress&limit=11&fb=1&suggestion-type=KEYWORD`
}