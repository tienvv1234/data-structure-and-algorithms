// 10 --> 5 --> 16

// let myLinkedList = {
//     head: {
//         value: 10,
//         next: {
//             value: 5,
//             next: {
//                 value: 16,
//                 next: null
//             }
//         }
//     }
// }

class NodeLinkedList {
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor(value) {
        this.head = {
            value: value,
            next: null
        }

        // if we have only one item the head is the tail
        this.tail = this.head;
        this.length = 1;
    }

    append(value){
        const newNode = new NodeLinkedList(value);
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
        return this;
    }

    prepend(value){
        const newNode = new NodeLinkedList(value);
        newNode.next = this.head;
        this.head = newNode
        this.length++;
        return this;
    }

    insert(index, value){
        //check params
        if(index >= this.length){
            return this.append(value);
        }

        if(index === 0){
            return this.prepend(value);
        }

        const newNode = new NodeLinkedList(value);

        const leader = this.traverseToIndex(index - 1);
        const holdingPointer = leader.next;
        leader.next = newNode;
        newNode.next = holdingPointer;
        this.length++;
        return this.printList();
    }

    traverseToIndex(index) {
        //check param
        let counter = 0;
        let currentNode = this.head;
        while(counter !== index) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode;
    }

    printList(){
        const array = [];
        let currentNode = this.head;
        while(currentNode !== null ){
            array.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return array;
    }

    remove(index){
        //check param
        const leader = this.traverseToIndex(index - 1);
        const unwantedNode = leader.next;
        leader.next = unwantedNode.next;
        this.length--;
        return this.printList();
    }

    reverse() {
        
    }
}

const myLinkedList = new LinkedList(10);

// console.log('myLinkedList', myLinkedList)
myLinkedList.append(5);
myLinkedList.append(16);
myLinkedList.prepend(1);
myLinkedList.insert(3, 99);
myLinkedList.remove(3, 99);
console.log('myLinkedList1', myLinkedList.printList());
// console.log('myLinkedList2', JSON.stringify(myLinkedList))