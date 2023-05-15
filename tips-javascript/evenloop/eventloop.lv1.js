console.log('0');

setTimeout(() => {
    console.log('1');
})

new Promise((resolve, reject) => {
    console.log('2');
    resolve(3);
}).then(value => {
    console.log(value);
});

new Promise((resolve, reject) => {
    console.log('4');
    resolve(5);
}).then(value => {
    console.log(value);
})

console.log('6');