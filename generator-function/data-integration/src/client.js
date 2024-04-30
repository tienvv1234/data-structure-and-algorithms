/*
--> data enrichment - data processing
 1. we read data from a database
 2. go to a API to get more detailed information
 3. we submit data to another API

*/

const myDB = async () => Array.from({
    length: 1000
}, (v, index) => `${index}-laptop`)

const PRODUCTS_API = 'http://localhost:3000/products'
const CART_API = 'http://localhost:4000/cart'

async function processDBdata() {
    
}

console.table(await myDB())