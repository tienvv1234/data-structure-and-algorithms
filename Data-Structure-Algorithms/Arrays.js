const strings = ['a', 'b', 'c', 'd'];
// 4*4 = 16 bytes of storage, we simply storing a,b,c,d in sequential order in our ram

console.log(strings[2]);

//push
strings.push('e', 'g');
// this will add at the end of the array O(1)
console.log(strings);

//pop
const str  = strings.pop();
// this is the opposite of push , will simply remove the last item from the array O(1)
console.log(strings);
console.log('str', str)


//unShift
strings.unshift('x', 'y');
// this function add item at the beginning of the array O(n)

console.log(strings);

//splice
strings.splice(2, 0, 'alien'); 
// add alien to index 2 O(n)

console.log(strings);