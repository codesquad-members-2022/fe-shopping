export const LatelyManager = {
    maxData : 8,
    dataKey : "LateSearchData",

    init() {
        const data = [];
        this.setLocalData(data);
    },

    addNewdata(data,crrData) {
        if(crrData.length === this.maxData) {
            crrData.pop();
        }
        crrData.unshift(data);
        this.setLocalData(crrData);
    },
    
    checkData(data) {
        const crrData = this.getLocalData();
        if(data === crrData[0]) {
            return;
        }
        this.addNewdata(data,crrData);
    },

    getLocalData() {
        const crrData = localStorage.getItem(this.dataKey);
        return this.makeJSONtoArr(crrData);
    },

    setLocalData(data) {
        const crrData = this.makeArrtoJSON(data);
        localStorage.setItem(this.dataKey,crrData);
    },

    makeArrtoJSON(data) {
        return JSON.stringify(data);
    },

    makeJSONtoArr(data) {
        return JSON.parse(data)
    }
}