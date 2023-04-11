// mergeSortedArrays [0,3,4,31], [4,6,30]
// result is [0, 3, 4, 4, 30, 31]

function mergeSortedArrays(array1, array2){
    const mergedArray = [];
    let array1Item = array1[0];
    let array2Item = array2[0];
    let i = 1;
    let j = 1;

    if(array1.length === 0){
        return array2;
    }

    if(array2.length === 0){
        return array1;
    }

    while (array1Item || array2Item){
        console.log(array1Item, array2Item)
        if(!array2Item || array1Item < array2Item){
            mergedArray.push(array1Item);
            array1Item = array1[i];
            i++;
        }else{
            mergedArray.push(array2Item);
            array2Item = array2[j];
            j++;
        }
        console.log('mergedArray', mergedArray)
        console.log('array1Item', array1Item)
        console.log('array2Item', array2Item)
    }

    return mergedArray;
}

let array1Item = undefined;
    let array2Item = undefined;

console.log(1 || undefined)

console.log(array1Item || array2Item)
while(array1Item || array2Item){
    console.log(1)
}

// console.log(31 < undefined);

mergeSortedArrays([0,3,4,31, 32], [4,6,30])