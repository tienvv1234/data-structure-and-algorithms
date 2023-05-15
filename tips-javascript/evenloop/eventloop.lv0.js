setTimeout(() => {
    console.log('1');
});

console.log('212222');

process.nextTick(() => {
    console.log('3');
})

new Promise((resolve, reject) => {
    console.log('4');
    resolve(5);
}).then(value => {
    console.log(value);
});

console.log('6');