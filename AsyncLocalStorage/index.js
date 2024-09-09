const { AsyncLocalStorage } = require('node:async_hooks');
const asyncLocalStorage = new AsyncLocalStorage();
console.log('AsyncLocalStorage');

function logWithId(msg) {
  console.log('msg', msg);
  const store = asyncLocalStorage.getStore();
  console.log('store', store);
  console.log('************');
  console.log(`[${store ? store.id : 'no-id'}] ${msg}`);
  console.log('************');
}

asyncLocalStorage.run({ id: 1 }, () => {
  console.log('async run');
  logWithId('Starting');
  console.log('logWithId');
  setTimeout(() => {
    console.log('timeout');
    logWithId('In the timeout');
    console.log('after timeout logWithId');
  }, 100);
  console.log('after timeout');
});

console.log('end');

