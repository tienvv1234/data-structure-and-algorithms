console.log('Hello World');
const abc = () => {
    console.log('0');
    return new Promise((resolve, reject) => {
        return 1;
        // resolve(1);
      }).then((result) => {
        console.log('1');
        return 1;
      }).catch((error) => {
        console.log('2');
        return 1;
      }).finally(() => {
        console.log('3');
        return 1;
      });
}

abc().then((result) => {
    console.log('2', result);
});