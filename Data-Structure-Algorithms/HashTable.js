class HashTable {
    constructor(size){
        this.data = new Array(size);
    }

    _hash(key){
        // this is very fast it isn't O(n), it's O(1)
        let hash = 0;
        for (let index = 0; index < key.length; index++) {
            hash = (hash + key.charCodeAt(index) * index) % this.data.length;
        }
        return hash;
    }

    set(key, value){
        let address = this._hash(key);
        if(!this.data[address]){
            this.data[address] = [];
        }
        this.data[address].push([key, value]);
        console.log(1, this.data);
        return this.data;
    } // O (1)

    get(key){
        let address = this._hash(key);
        console.log('address', address)
        const currentBucket = this.data[address];
        console.log('currentBucket', currentBucket);
        if(currentBucket){
            for (let index = 0; index < currentBucket.length; index++) {
                if(currentBucket[index][0] === key){
                    return currentBucket[index][1];
                }
                
            }
        } //O(1) if in the case the size too small it can be O(n)
        return undefined;
    }

    keys(){
        let keysArray = [];
        console.log('this.data', this.data)
        for (let index = 0; index < this.data.length; index++) {
            if(this.data[index]){
                keysArray.push(this.data[index][0][0]);
            }
            // keysArray.push(this.data[index]);
        }
        return keysArray;
    }
}

const myHashTable = new HashTable(10);

myHashTable.set('grapes', 10000);
myHashTable.set('apples', 54);
myHashTable.set('oranges', 2);
console.log('keys', myHashTable.keys());
console.log(myHashTable.get('grapes'));

const map = new Map();
map.set('test1', ['test', 0]);
map.set('test2', 2);
map.set('test3', 2);
console.log('map', map);
console.log(map.get(1));
console.log('keys', map.keys());
const test = map.keys().next();
for (var key of map.keys()) {
    console.log(key);
}