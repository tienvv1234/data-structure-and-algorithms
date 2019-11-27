// Google Question
// Given an Array = [2, 5, 1, 2, 3, 5, 1, 2 ,4]
// It should return 2

// Given an Array = [2, 1, 1, 2, 3, 5, 1, 2, 4]
// It should return 1

// Given an Array = [2, 3, 4, 5]
// It should return undefined

function firstRecurringCharacter(input){
    for (let index = 0; index < input.length; index++) {
        for (let j = index + 1; j < input.length; j++) {
            if(input[index] === input[j]){
                return input[index];
            }
        }
    }
    return undefined;
}// O(n^2)

function secondRecurringCharacter(input){
    const hashTable = {}
    for (let index = 0; index < input.length; index++) {
        console.log('hashTable', hashTable)
        if(hashTable[input[index]]){
            return input[index];
        }else{
            hashTable[input[index]] = true;
        }   
    }
    return undefined;
}// O(n)

console.log(secondRecurringCharacter([2, 5, 5, 2, 3, 5, 1, 2 ,4]));