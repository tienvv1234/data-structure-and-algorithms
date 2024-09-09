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

// async function processDBdata() {
//     const products = await myDB()
//     const responses = []
//     for (const product of products) {
//         const response = await fetch(`${PRODUCTS_API}/?name=${product}`)
//         const data = await response.json()
//         responses.push(data)
//         const cart = await fetch(CART_API, {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         await cart.text()
//         responses.push(cart)
//     }
//     return responses
// }
// // return a thousand responses once all the data is processed
// console.table(await processDBdata())

async function *processDBdataGen() {
    const products = await myDB()
    // const responses = []
    for (const product of products) {
        const response = await fetch(`${PRODUCTS_API}/?name=${product}`)
        const data = await response.json()
        // responses.push(data)
        const cart = await fetch(CART_API, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const cartRes = await cart.text()
        // console.log('111111111111111111', cartRes)
        // responses.push(cart)
        yield cartRes
    }
}

// return a data one by one as soon as it is processed

for await (const response of processDBdataGen()) {
    // console.log('222222222222222222')
    console.table(response)
}