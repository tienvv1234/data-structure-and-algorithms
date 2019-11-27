// Give 2 arrays, create a function that let's a user know (true/false) whether these two arrays contain any common items
// For Example:
// const array1 = ['a', 'b', 'c', 'x']
// const array2 = ['z', 'y', 'i']
// Should return false.
//--------------------------
// const array1 = ['a', 'b', 'c', 'x']
// const array2 = ['z', 'y', 'x']
// Should return true

// function
// 2 parameters - arrays - no size limit
// return true or false

// O(n^2), may be using hash table and in js hash table is object

const array1 = ['a', 'b', 'c', 'x', []]
const array2 = ['z', 'y', 'j', []]

// array1 ===> object {
// a: true,
// b: true,
// c: true,
// x: true,
//}
//  array2[index] === object.properties
// can we assume always  2 parameters ?
function containsCommonItem(arr1, arr2){
    // loop to first array and create object where properties === items in the array
    let map = {};
    for(let i = 0; i < arr1.length; i++){
        if(!map[arr1[i]]){
            const item = arr1[i];
            map[item] = true;
        }
    }
    console.log(map)
    // loop through second array and check if item in second array exist on created object.

    for (let j = 0; j < arr2.length; j++) {
        if(map[arr2[j]]){
            return true;
        }
    }
    return false;
}

// in case two array have array inside like [1, []] this is still working because of this is the way javascript work,
// object properties are turned into strings when created { 1: true, '': true }
// O(2n) time complexity
// O(n) space complexity
console.log(containsCommonItem(array1, array2));

// clean code

function containsCommonItem2(arr1, arr2){
    // Phương thức some() kiểm tra xem có ít nhất một phần tử của mảng thoả điều kiện ở hàm được truyền vào hay không. 
    // Kết quả trả về có kiểu Boolean. 
    // Chú ý: Phương thức này sẽ trả về false nếu mảng rỗng.
    return arr1.some(item => arr2.includes(item));
}