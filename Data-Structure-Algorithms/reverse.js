// Create a function that reverses a string:

function reverse(str){
    // check input
    if(!str || str.length < 2 || typeof(str) !== 'string'){
        return false;
    }

    const backwards = [];
    const totalItems = str.length - 1;
    for (let index = totalItems; index >= 0; index--) {
        backwards.push(str[index]);
    }
    return backwards.join('');
}

function reverseClean(str){
    // check input
    if(!str || str.length < 2 || typeof(str) !== 'string'){
        return false;
    }

    return str.split('').reverse().join('');
}

const reverseES6 = str => str.split('').reverse().join('');

const reverseSpread = str => [...str].reverse().join('');

console.log(reverseSpread('test 1'));