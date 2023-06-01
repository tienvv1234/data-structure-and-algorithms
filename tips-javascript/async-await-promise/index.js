const { default: axios } = require("axios");

const arr = [1, 2, 3, 4, 5];

const getPost = async (id) => {
    return await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
}

const forLoop = async () => {
    console.log('start forLoop');
    for (let i = 0; i < arr.length; i++) {
        const post = await getPost(arr[i]);
        console.log(`data post :::`, post.data);
    }
    console.log('end forLoop');
}

// forLoop();

// polifill its old way to create a function
Array.prototype.myForEach = async function (callback, thisAgr) {
    console.log('thisAgr ::: ', thisAgr);
    console.log('callback ::: ', callback);
    for (let i = 0; i < this.length; i++) {
        console.log('this[i] ::: ', this[i]);
        console.log('i ::: ', i);
        // console.log('this ::: ', this); this :::  [ 1, 2, 3, 4, 5 ]
        // await callback.call(this, this[i], i, this);
        await callback.call(thisAgr, this[i]);
    }
}

const forEachLoop = async () => {
    console.log('start forEachLoop');
    // foreach is high order function and not support async await, 
    // it will run all function in array and wait for all function finish
    // not recommended to use(because of it will block the main thread ==> not sure)
    // khong dong bo chay lung tung
    // polyfill
    arr.myForEach(async (id) => {
        console.log('id ::: ', id);
        const post = await getPost(id);
        // console.log(`data post :::`, post.daZta);
    });
    console.log('end forEachLoop');
}

// forEachLoop();

const forOfLoop = async () => {
    console.log('start forOfLoop');
    for (const _index of arr) {
        const post = await getPost(id);
        console.log(`data post :::`, post.data);
    }
    console.log('end forOfLoop');
}

// forOfLoop();
// object array we use for of

const mapLoop = async () => {
    console.log('start mapLoop');
    const posts = await Promise.all(arr.map(async (id) => {
        const post = await getPost(id);
        return post.data;
    }));
    console.log('posts ::: ', posts);
    console.log('end mapLoop');
}

mapLoop();