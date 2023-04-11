class LRUCache {
    constructor(size) {
        this.size = size || 3;
        this.cache = new Map();
    }

    put(key, value) {
        // check key exists
        const hasKey = this.cache.has(key);
        // if exists, move to the end of the map
        if (hasKey) {
            // we need to move the key to the first position
            this.cache.delete(key);
        }
        // add the key to the end of the map
        this.cache.set(key, value);
        // check if cache is full
        const cacheSize = this.cache.size;
        if (cacheSize > this.size) {
            // remove the key not used recently
            // get all
            const key = this.cache.keys().next().value;
            this.cache.delete(key);
        }
        return true;
    }

    get(key) {
        // check key exists
        const hasKey = this.cache.has(key);
        // if exists, move to the end of the map
        if (hasKey) {
            // get the value
            const value = this.cache.get(key);
            // we need to move the key to the first position
            this.cache.delete(key);
            // add the key to the end of the map
            this.cache.set(key, value);
            return value;
        }
        // if not exists, check if cache is full
        return null;
    }

    items() {
        return this.cache.entries();
    }
}

const cache = new LRUCache(3);
cache.put(1, 1);
cache.put(2, 2);
cache.put(3, 3);
console.log(cache.items());
// [Map Entries] { [ 1, 1 ], [ 2, 2 ], [ 3, 3 ] }
cache.get(1);
console.log(cache.items());
// [Map Entries] { [ 2, 2 ], [ 3, 3 ], [ 1, 1 ] }
cache.put(4, 4);
console.log(cache.items());
// [Map Entries] { [ 3, 3 ], [ 1, 1 ], [ 4, 4 ] }