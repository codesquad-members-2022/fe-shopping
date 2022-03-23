
export function StorageManager(key) {
    this.storageSet = new Set()
    this.key = key
}

StorageManager.prototype = {

    getStorage: function() {
        const historyStorage = localStorage.getItem(this.key)
        this.storageSet = historyStorage === null ? new Set() : new Set(JSON.parse(historyStorage))
        return this.storageSet
    },

    setStorage: function() {
        localStorage.setItem(this.key, JSON.stringify([...this.storageSet]));
    },

    addItem: function(word) {
        if(word === null) return
        this.storageSet.add(word)
        this.setStorage()
    },

    deleteItem : function(word) {
        this.storageSet.delete(word)
        this.setStorage()
    },

    clearItem : function() {
        this.storageSet.clear()
        this.setStorage()
    }

}